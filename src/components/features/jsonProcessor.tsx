"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { type Mode } from "@/types/jsonProcessor";
import { tabletWidth, useWindowAndScreenWidth } from "@/hooks/useAppWidth";

import { cn } from "@/lib/utils";
import { generateUUID } from "@/lib/tools";

import "jsoneditor/dist/jsoneditor.min.css";
import "@/styles/customJsoneditor.css";

export function JsonProcessor({
	jsonData,
	setJsonData,
	initMode,
}: {
	jsonData: any;
	setJsonData: (data: any) => void;
	initMode?: Mode;
}) {
	const editorRef = useRef<HTMLDivElement>(null); // 綁定 editor 容器
	const editorInstance = useRef<JSONEditor | null>(null); // 儲存 JSONEditor 實例
	const [mode, setMode] = useState<Mode>(initMode || "tree");
	const [error, setError] = useState<string | null>(null);
	const [errorDetails, setErrorDetails] = useState<Record<string, string>[]>(
		[]
	);
	const [isWorking, setIsWorking] = useState<boolean>(false);

	const [id] = useState<string>(generateUUID());
	const [windowWidth, screenWidth] = useWindowAndScreenWidth();

	useEffect(() => {
		if (!editorRef.current) return;

		// 初始化 JSON Editor
		editorInstance.current = new JSONEditor(editorRef.current, {
			mode,
			onChange: () => {
				setIsWorking(true);
				try {
					// 取得 JSON 內容
					const updatedJson = editorInstance.current?.get();
					setError(null);

					//JSON 內容正確，更新 JsonData
					setJsonData(updatedJson);
				} catch (err: any) {
					//JSON 內容錯誤，設置 error
					setError("❌ JSON 格式錯誤。");
				}
			},
			onFocus: (event) => {
				setIsWorking(true);
			},
			onBlur: (event) => {
				setIsWorking(false);
			},
			// onExpand: (expandParams) => {
			//   console.log("expandParams: ", expandParams);
			// },
			enableSort: false,
			enableTransform: false,
		});

		// 設定初始 JSON
		editorInstance.current.set(jsonData);

		//TODO: 目標編輯器編輯特定項時，其餘編輯器展開特定項
		// if (mode === "tree") {
		//   setTimeout(() => {
		//     editorInstance.current?.expandAll();
		//   }, 100);
		// }

		return () => {
			editorInstance.current?.destroy(); // 清除 Editor，避免 React 重新渲染時重複初始化
		};
	}, [mode]);

	//
	useEffect(() => {
		if (!jsonData) return;
		if (!isWorking) {
			// console.log("@@@@ JSON 在我沒工作時，做了更新 @@@@");
			editorInstance.current?.set(jsonData);
			setError(null);

			//TODO: 目標編輯器編輯特定項時，其餘編輯器展開特定項
			// if (mode === "tree") {
			//   setTimeout(() => {
			//     //1. expandAll
			//     //editorInstance.current?.expandAll();
			//     //2. expand
			//     editorInstance.current?.expand({
			//       path: ["skills"], // 目標節點 (物件的 key)
			//       isExpand: true, // 設定為展開
			//       recursive: false, // 只影響這一層
			//     });
			//   }, 100);
			// }
		}
	}, [jsonData]);

	//
	const handleDownload = () => {
		const json = editorInstance.current?.get();
		const blob = new Blob([JSON.stringify(json, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "data.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleCopy = async () => {
		try {
			const jsonDataStr = JSON.stringify(jsonData);
			await navigator.clipboard.writeText(jsonDataStr);
			toast.success("JSON 已複製到剪貼簿!");
		} catch (err) {
			toast.error("複製失敗: " + err);
		}
	};

	const handleMode = () => {
		setMode((v) => (v === "tree" ? "code" : "tree"));
		setError(null);
	};

	const showError = async () => {
		try {
			const validation = editorInstance.current?.validate();
			const errors = (await validation) as unknown as Record<string, string>[];

			setErrorDetails(errors);
		} catch (err) {
			console.log("err:", err);
		}
	};

	return (
		<div className="relative mx-auto w-full p-1 pt-2">
			{/* 模式切換 */}
			{
				<div className="absolute left-0 top-[3px] z-10 flex h-8 w-16 items-center justify-center max-lg:rounded-[50px] max-lg:bg-[hsla(var(--border)/0.5)] max-lg:ring-1 max-lg:ring-border max-lg:dark:bg-background">
					{(windowWidth < tabletWidth || mode === "tree") && (
						<button
							className={`absolute left-0 top-0 aspect-square w-8 rounded-[50px] border border-border text-xs text-accent-foreground transition-all ease-linear ${mode === "tree" ? "bg-extreme max-lg:translate-x-[100%]" : "border-transparent opacity-40"}`}
							onClick={handleMode}
						>
							Tree
						</button>
					)}
					{(windowWidth < tabletWidth || mode === "code") && (
						<button
							className={`absolute left-0 top-0 aspect-square w-8 rounded-[50px] border border-border text-xs text-accent-foreground transition-all ease-linear ${mode === "code" ? "bg-extreme max-lg:translate-x-[100%]" : "border-transparent opacity-40"}`}
							onClick={handleMode}
						>
							Code
						</button>
					)}
				</div>
			}

			{/* JSON 編輯器 */}
			<section className="flex items-center justify-center *:flex-shrink-0">
				<div
					className={cn(
						"jsonprocessor h-[calc(100vh-var(--header-height)-var(--panel-top-height)-var(--adjust-height))] w-full md:min-w-[var(--panel-min-width)]",
						error && "jsonprocessor--active-repair"
					)}
					style={{ "--adjust-height": "70px" } as CSSProperties}
					ref={editorRef}
				></div>
			</section>

			{/* 錯誤提示 || 成功訊息 (下載) */}
			{error ? (
				<p className="mt-2 text-red-500">
					{error} &nbsp;
					<AlertDialog>
						<AlertDialogTrigger>
							<b
								className="flex h-8 items-center justify-start rounded-[50px] bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 active:bg-red-700"
								onClick={showError}
							>
								Show details
							</b>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>JSON Format Error</AlertDialogTitle>
								<AlertDialogDescription>
									<span>
										{errorDetails.map((detail, i) => (
											<span key={i}>
												{Object.keys(detail).map((key, k) => (
													<span
														key={k}
														className="flex items-start justify-start gap-1"
													>
														<b className="flex items-start justify-start text-start font-normal text-red-500">
															{key}:{" "}
														</b>
														<b
															className="flex items-start justify-start text-start font-light text-red-500"
															dangerouslySetInnerHTML={{ __html: detail[key] }}
														></b>
													</span>
												))}
											</span>
										))}
									</span>
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									onClick={() => setTimeout(() => setErrorDetails([]), 300)}
								>
									close
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</p>
			) : (
				<p className="mt-2 flex items-center justify-start gap-2">
					No problem ! &nbsp;
					<button
						className="inline-flex h-8 items-center justify-center gap-0.5 rounded-[50px] bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600 active:bg-green-700"
						onClick={handleDownload}
					>
						<span className="material-symbols-outlined scale-90 text-white">
							download
						</span>
						<span>JSON</span>
					</button>
					<button
						className="inline-flex h-8 items-center justify-center gap-0.5 rounded-[50px] bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600 active:bg-green-700"
						onClick={handleCopy}
					>
						<span className="material-symbols-outlined scale-90 text-white">
							content_copy
						</span>
						<span>JSON</span>
					</button>
				</p>
			)}
		</div>
	);
}
