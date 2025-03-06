//
export type Mode = "tree" | "code";

//
export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONArray
	| JSONObject;

export type JSONArray = JSONValue[];

export type JSONObject = { [key: string]: JSONValue };
