"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import { toast } from "sonner";

import { type Mode } from "@/types/jsonProcessor";
import { tabletWidth, useWindowAndScreenWidth } from "@/hooks/useAppWidth";

import { cn } from "@/lib/utils";
import { generateUUID } from "@/lib/tools";

import "jsoneditor/dist/jsoneditor.min.css";
import "@/styles/customJsoneditor.css";

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
  const [mode, setMode] = useState<Mode>(initMode || "tree");
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  
  const [id] = useState<string>(generateUUID())
  const [windowWidth, screenWidth] = useWindowAndScreenWidth()

  useEffect(() => {
    if (!editorRef.current) return;

    // 初始化 JSON Editor
    editorInstance.current = new JSONEditor(editorRef.current, {
      mode,
      onChange: () => {
        setIsWorking(true);
        try {
          // 取得 JSON 內容
          const updatedJson = editorInstance.current?.get(); 
          setError(null);
          
          //JSON 內容正確，更新 JsonData
          setJsonData(updatedJson);

        } catch (err: any) {

          //JSON 內容錯誤，設置 error
          setError("❌ JSON 格式錯誤。");
        }
      },
      onFocus: (event) => {
        setIsWorking(true);
      },
      onBlur: (event) => {
        setIsWorking(false);
      },
      // onExpand: (expandParams) => {
      //   console.log("expandParams: ", expandParams);
      // },
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

  const handleCopy = async () => {
    try {
      const jsonDataStr = JSON.stringify(jsonData);
      await navigator.clipboard.writeText(jsonDataStr);
      toast.success("JSON 已複製到剪貼簿!");
    } catch (err) {
      toast.error("複製失敗: " + err);
    }
  }

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
    <div className=" relative w-full mx-auto p-1 pt-2">
      {/* 模式切換 */}
      {
      <div className="w-16 h-8 flex justify-center items-center absolute top-[3px] left-0 z-10 max-lg:rounded-[50px] max-lg:bg-[hsla(var(--border)/0.5)] max-lg:dark:bg-background max-lg:ring-1 max-lg:ring-border">
        {
          (windowWidth < tabletWidth || mode === "tree") && (
            <button
              className={` absolute top-0 left-0 text-xs aspect-square rounded-[50px] w-8 text-accent-foreground border border-border transition-all ease-linear ${mode === "tree" ? "bg-extreme max-lg:translate-x-[100%] " : " opacity-40 border-transparent"}`}
              onClick={() => setMode(v => v === "tree" ? "code" : "tree")}
            >
              Tree
            </button>
          )
        }
        {
          (windowWidth < tabletWidth || mode === "code") && (
            <button
              className={` absolute top-0 left-0 text-xs aspect-square rounded-[50px] w-8 text-accent-foreground border border-border transition-all ease-linear ${mode === "code" ? "bg-extreme max-lg:translate-x-[100%] " : " opacity-40 border-transparent"}`}
              onClick={() => setMode(v => v === "code" ? "tree" : "code")}
            >
              Code
            </button>
          )
        }
      </div>
      }

      {/* JSON 編輯器 */}
      <section className="flex justify-center items-center *:flex-shrink-0">
        <div 
          className={cn("jsonprocessor h-[calc(100vh-var(--header-height)-var(--panel-top-height)-var(--adjust-height))] w-full md:min-w-[var(--panel-min-width)]", (error && "jsonprocessor--active-repair" ))} 
          style={{"--adjust-height": "70px"} as CSSProperties}
          ref={editorRef}
        ></div>
      </section>

      {/* 錯誤提示 || 成功訊息 (下載) */}
      {error ? (
        <p className="mt-2 text-red-500">
          {error} &nbsp;
          <button className="px-3 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-[50px] h-8 text-sm" onClick={showError}>
            Show details
          </button>
        </p>
      ) : (
        <p className="mt-2 flex justify-start items-center gap-2">
          No problem ! &nbsp;
          <button className="px-3 py-1 inline-flex justify-center items-center gap-0.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-[50px] h-8 text-sm" onClick={handleDownload}>
            <span className="material-symbols-outlined text-white scale-90 ">
              download
            </span>
            <span>
              JSON
            </span>
          </button>
          <button className="px-3 py-1 inline-flex justify-center items-center gap-0.5 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-[50px] text-white h-8 text-sm" onClick={handleCopy}>
            <span className="material-symbols-outlined text-white scale-90 ">
              content_copy
            </span>
            <span>
              JSON
            </span>
          </button>
        </p>
      )}
    </div>
  );
}
