import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

export function Footer({
	className,
	...props
}: { className?: string } & ComponentPropsWithoutRef<"footer">) {
	return (
		<footer
			className={cn(
				"w-full bg-gray-100 p-4 text-center text-sm text-gray-600",
				className
			)}
			{...props}
			style={{"--footer-height": "0px", padding: 0} as CSSProperties }
		>
		</footer>
	);
}

// export function Footer({
// 	className,
// 	...props
// }: { className?: string } & ComponentPropsWithoutRef<"footer">) {
// 	return (
// 		<footer
// 			className={cn(
// 				"w-full bg-gray-100 p-4 text-center text-sm text-gray-600",
// 				className
// 			)}
// 			{...props}
// 		>
// 			<article className="*:mb-2">
// 				<p>
// 					<strong>JSON Processor</strong>
// 				</p>
// 				<p>簡單易用的 JSON 編輯工具，讓您輕鬆查看與編輯 JSON 數據。</p>
// 				<p>
// 					A simple and user-friendly JSON editing tool that makes it easy to
// 					view and edit JSON data.
// 				</p>
// 			</article>
// 			<p className="mt-1">© 2025 Eddie. All rights reserved.</p>
// 		</footer>
// 	);
// }
