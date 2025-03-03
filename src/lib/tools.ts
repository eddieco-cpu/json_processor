//
import React from "react";

export const BASE_PREFIX = "JSONID_"; // has to be the same as in the middleware.ts

export function generateUUID(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array); // 使用安全隨機數

  return Array.from(array, byte => chars[byte % chars.length]).join('');
}

export function isValidJson(input: unknown): boolean {
  if (typeof input !== "string") return false;
  try {
      JSON.parse(input);
      return true;
  } catch (error) {
      return false;
  }
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
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