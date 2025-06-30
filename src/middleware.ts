import { NextResponse, type NextRequest } from "next/server";
import { BASE_PREFIX } from "./lib/tools"; //JSONID_

// const allowedOrigin = process.env.ALLOWED_ORIGIN || ""

// const allowedOrigins = new Set([
// 	"http://localhost:5500",
// 	"http://127.0.0.1:5500",
// 	"http://localhost:5501",
// 	"http://127.0.0.1:5501",
// ]);
// if (allowedOrigin) {
//   allowedOrigins.add(allowedOrigin);
// }

export function middleware(request: NextRequest) {
	//console.log("## middleware.ts: ## req.url: ", request.url);

	const response = NextResponse.next();

	// 取得請求方法
	const method = request.method;
	const url = request.url;

	// 針對 GET & POST 請求紀錄日誌
	if (method === "GET") {
		console.log(`[GET Request] URL: ${url}`);
	}
	if (method === "POST") {
		console.log(`[POST Request] URL: ${url}`);
	}

	// 設定 CORS Headers
	const origin = request.headers.get("origin");

	// if (origin && allowedOrigins.has(origin)) {
	// 	response.headers.set("Access-Control-Allow-Origin", origin);
	// }
	//response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5500');
	response.headers.set("Access-Control-Allow-Origin", "*");
	response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
	response.headers.set("Access-Control-Allow-Headers", "Content-Type");

	return response;
}

// 只影響的路徑
export const config = {
	matcher: ["/api/:path*", `/${BASE_PREFIX}:path*`],
};
