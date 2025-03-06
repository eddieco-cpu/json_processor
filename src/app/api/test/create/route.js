import { secretVariable } from "@/lib/server-data";

export function POST() {
	//
	globalThis.myGlobalVar = globalThis.myGlobalVar || { count: 0 };
	globalThis.myGlobalVar.count += 1;
	secretVariable.push("This is secret " + Math.random());
	return Response.json([secretVariable, globalThis.myGlobalVar]);
}
