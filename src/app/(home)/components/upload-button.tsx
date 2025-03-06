"use client";

import React from "react";
import { toast } from "sonner";
import { useGlobalContext } from "@/contexts/globalContext";

function UploadButton() {
	//
	const { setJsonData } = useGlobalContext();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.name.endsWith(".json")) {
			toast.error("❌ 檔案格式錯誤！");
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result;
			if (!result) {
				toast.error("❌ 無法讀取檔案！");
				return;
			}

			try {
				const json = JSON.parse(result as string);
				setJsonData(json);
				toast.success("🎉 成功上傳 JSON 檔案！");
			} catch (err) {
				toast.error("❌ JSON 格式錯誤！");
			}
		};
		reader.readAsText(file);
	};

	//
	return (
		<span className="inline-flex items-center">
			<label className="cursor-pointer font-semibold underline">
				click here
				<input
					type="file"
					accept=".json"
					className="hidden"
					onChange={handleFileUpload}
				/>
			</label>
		</span>
	);
}

export { UploadButton };
