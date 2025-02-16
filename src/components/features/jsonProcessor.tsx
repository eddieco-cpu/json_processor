"use client";

import { useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

import { type Mode } from "@/types/jsonProcessor";
import { generateUUID } from "@/lib/tools";

export function JsonProcessor ({
  jsonData,
  setJsonData,
  initMode
}: {
  jsonData: any;
  setJsonData: (data: any) => void;
  initMode?: Mode; 
}) {
  const editorRef = useRef<HTMLDivElement>(null); // 綁定 editor 容器
  const editorInstance = useRef<JSONEditor | null>(null); // 儲存 JSONEditor 實例
  const [mode, setMode] = useState<Mode>(initMode || "tree"); // 編輯模式
  const [error, setError] = useState<string | null>(null); // JSON 格式錯誤
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [id] = useState<string>(generateUUID())

  useEffect(() => {
    if (!editorRef.current) return;

    // 初始化 JSON Editor
    editorInstance.current = new JSONEditor(editorRef.current, {
      mode,
      onChange: () => {
        setIsWorking(true);
        try {
          const updatedJson = editorInstance.current?.get(); // 取得 JSON 內容
          setError(null);
          
          //JSON 內容正確，更新 JsonData
          setJsonData(updatedJson);

        } catch (err: any) {

          //JSON 內容錯誤，設置 error
          setError("❌ JSON 格式錯誤，請檢查格式！");
        }
      },
      onFocus: (event) => {
        setIsWorking(true);
      },
      onBlur: (event) => {
        setIsWorking(false);
      },
      onExpand: (expandParams) => {
        console.log("expandParams: ", expandParams);
      },
      enableSort: false,
      enableTransform: false,
    });

    // 設定初始 JSON
    editorInstance.current.set(jsonData); 

    //TODO: 目標編輯器編輯特定項時，其餘編輯器展開特定項
    // if (mode === "tree") {
    //   setTimeout(() => {
    //     editorInstance.current?.expandAll();
    //   }, 100);
    // }

    return () => {
      editorInstance.current?.destroy(); // 清除 Editor，避免 React 重新渲染時重複初始化
    };
  }, [mode]);

  //
  useEffect(() => {
    if (!jsonData) return
    if (!isWorking) {
      console.log("@@@@ JSON 在我沒工作時，做了更新 @@@@");
      editorInstance.current?.set(jsonData);
      setError(null);

      //TODO: 目標編輯器編輯特定項時，其餘編輯器展開特定項
      // if (mode === "tree") {
      //   setTimeout(() => {
      //     //1. expandAll
      //     //editorInstance.current?.expandAll();
      //     //2. expand
      //     editorInstance.current?.expand({
      //       path: ["skills"], // 目標節點 (物件的 key)
      //       isExpand: true, // 設定為展開
      //       recursive: false, // 只影響這一層
      //     });
      //   }, 100);
      // }
    }
  }, [jsonData])


  // 📂 匯入 JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        //editorInstance.current?.set(json);
        setJsonData(json);
        editorInstance.current?.set(json);

        setError(null);
      } catch (err) {
        setError("❌ 無法解析 JSON 檔案！");
      }
    };
    reader.readAsText(file);
  };

  // 📥 下載 JSON
  const handleDownload = () => {
    const json = editorInstance.current?.get();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  //
  const showError = async () => {
    console.log("showError");
    try {
      const validation = editorInstance.current?.validate();
      console.log("validation:", validation);
    } catch (err) {
      console.log("err:", err);
    }
  }

  return (
    <div className="w-full mx-auto p-2">
      <h2 className="text-xl font-bold mb-4">JSON Editor (進階版)</h2>

      {/* 🔄 模式切換 */}
      {
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${mode === "tree" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("tree")}
        >
          Tree 模式
        </button>
        <button
          className={`px-4 py-2 rounded-md ${mode === "code" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("code")}
        >
          Code 模式
        </button>
      </div>
      }

      {/* 📝 JSON 編輯器 */}
      <section className="flex justify-center items-center *:flex-shrink-0">
        <div className="border border-slate-400 p-2 rounded-md h-[500px] w-full min-w-[400px]" ref={editorRef}></div>
      </section>

      {/* ⚠️ 錯誤提示 */}
      {error && <p className="mt-2 text-red-500" onClick={showError}>{error}</p>}

      {/* 📂 匯入 & 📥 下載 */}
      <div className="flex gap-4 mt-4">
        <input type="file" accept="application/json" onChange={handleFileUpload} />
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleDownload}>
          下載 JSON
        </button>
      </div>
    </div>
  );
}
