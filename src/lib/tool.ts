//
import React from "react";

//
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Record<string, unknown> 代表鍵是 string，值可以是任何類型，但 TypeScript 需要你在使用時進行型別檢查。
 */
export const handleDownload = (json: Record<string, unknown>) => {
  //
  //const json = editorInstance.current?.get();
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export async function uploadJsonFile(event: Event): Promise<Record<string, unknown> | null> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !file.name.endsWith('.json')) return null;
  
  try {
    const reader = new FileReader();
    const fileContent = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsText(file);
    });
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
}