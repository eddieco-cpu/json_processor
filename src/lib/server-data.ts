import "server-only";

import { type JSONObject } from "@/types/jsonProcessor";

const secretVariable = ["This is secret"];
const jsonStorageObj: JSONObject = {
  "key1": `{"test":"test","test2":"test2","test3":"test3","testArray":["testArray1","testArray2","testArray3"]}`,
  "key2": "[1,2,3,4,5]",
};
export { secretVariable, jsonStorageObj };
