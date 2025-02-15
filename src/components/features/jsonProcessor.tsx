"use client";

import { useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

export function JsonProcessor () {
  const editorRef = useRef<HTMLDivElement>(null); // 綁定 editor 容器
  const editorInstance = useRef<JSONEditor | null>(null); // 儲存 JSONEditor 實例
  const [mode, setMode] = useState<"tree" | "code">("tree"); // 編輯模式
  const [error, setError] = useState<string | null>(null); // JSON 格式錯誤
  const [jsonData, setJsonData] = useState({
    name: "Eddie",
    age: 25,
    skills: ["React", "Vue", "TypeScript"],
    isDeveloper: true,
    nested: { key: "value", number: 123, flag: false, empty: null },
  });

  useEffect(() => {
    if (!editorRef.current) return;

    // 初始化 JSON Editor
    editorInstance.current = new JSONEditor(editorRef.current, {
      mode,
      onChange: () => {
        try {
          const updatedJson = editorInstance.current?.get(); // 取得 JSON 內容
          setError(null); // 清除錯誤
          console.log("JSON 已更新:", updatedJson);
          setJsonData(updatedJson);
        } catch (err: any) {
          setError("❌ JSON 格式錯誤，請檢查格式！");
        }
      },
      enableSort: false,
      enableTransform: false,
    });

    editorInstance.current.set(jsonData); // 設定初始 JSON

    return () => {
      editorInstance.current?.destroy(); // 清除 Editor，避免 React 重新渲染時重複初始化
    };
  }, [mode]);

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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">JSON Editor (進階版) 2</h2>

      {/* 🔄 模式切換 */}
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

      {/* 📝 JSON 編輯器 */}
      <section className="flex justify-center items-center *:flex-shrink-0">
      <div className="border p-2 rounded-md" ref={editorRef} style={{ height: "400px", width: "800px" }}></div>
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
