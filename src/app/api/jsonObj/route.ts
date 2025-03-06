import { NextResponse } from "next/server";
//import { jsonStorageObj } from "@/lib/server-data";
import { type JSONObject } from "@/types/jsonProcessor";
import { generateUUID, BASE_PREFIX } from "@/lib/tools";
import { isValidJson } from "@/lib/tools";

//
//const storage: JSONObject = jsonStorageObj;

//
export async function POST(request: Request) {
	try {
		const contentType = request.headers.get("content-type");
		let data: JSONObject | null = null;

		//application/json
		if (contentType?.includes("application/json")) {
			// 解析 JSON
			const body = await request.json();
			if (!body || typeof body !== "object" || !("jsonObj" in body)) {
				return NextResponse.json(
					{ error: "Missing required key: jsonObj in request body" },
					{ status: 400 }
				);
			}
			if (Object.keys(body).length !== 1) {
				return NextResponse.json(
					{ error: "Request body should only contain a key: jsonObj" },
					{ status: 400 }
				);
			}
			if (!isValidJson(body.jsonObj)) {
				return NextResponse.json(
					{ error: "Invalid JSON format in form data" },
					{ status: 400 }
				);
			}
			data = JSON.parse(body.jsonObj);
		}

		//form-data
		if (contentType?.includes("application/x-www-form-urlencoded")) {
			// 解析 FormData
			const formData = await request.formData();
			const jsonObj = formData.get("jsonObj");
			if (!jsonObj) {
				return NextResponse.json(
					{ error: "Missing required form field: jsonObj" },
					{ status: 400 }
				);
			}
			if (!isValidJson(jsonObj)) {
				return NextResponse.json(
					{ error: "Invalid JSON format in form data" },
					{ status: 400 }
				);
			}
			data = JSON.parse(jsonObj as string);
		}

		//
		if (!data) {
			return NextResponse.json(
				{ error: "Invalid request @@" },
				{ status: 400 }
			);
		}

		// 生成 UUID 並存入 storage
		const key = BASE_PREFIX + generateUUID();
		//storage[key] = data;

		(globalThis as any).jsonStorageObj =
			(globalThis as any).jsonStorageObj || {};
		(globalThis as any).jsonStorageObj[key] = data;

		// 返回 json 資料
		// const response = NextResponse.json({ message: 'Data received', id: key, data }, { status: 200 });

		// 直接進行 redirect
		const response = NextResponse.redirect(new URL(`/${key}`, request.url), {
			status: 302,
		});

		// 改由 middeware 處理
		// response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5500'); // 允許 localhost:5500
		// response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS'); // 允許的方法
		// response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // 允許的標頭
		return response;
	} catch (error) {
		console.error("Error processing request: \n", error);
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

//
export function GET() {
	//return NextResponse.json(jsonStorageObj, { status: 200 });
	return NextResponse.json((globalThis as any).jsonStorageObj, { status: 200 });
}

// 處理 OPTIONS 預檢請求
export function OPTIONS() {
	//
	const response = new NextResponse(null, { status: 204 });
	// 改由 middeware 處理
	// response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5500');
	// response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
	// response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return response;
}
