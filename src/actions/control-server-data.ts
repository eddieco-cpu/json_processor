'use server';

//import { jsonStorageObj } from "@/lib/server-data"

export async function readJsonStorageObj() {
  //
  console.log((globalThis as any).myGlobalVar);
  console.log("(globalThis as any).jsonStorageObj", (globalThis as any).jsonStorageObj);
}

export async function deleteJsonStorageObjKey(key: string) {
  //
  (globalThis as any).jsonStorageObj = (globalThis as any).jsonStorageObj || {}
  if ((globalThis as any).jsonStorageObj[key]) {
    delete (globalThis as any).jsonStorageObj[key];
  }
}