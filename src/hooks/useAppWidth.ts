"use client";

import { useState, useEffect } from "react";

export const tabletWidth = 1023.5;
export const mobileWidth = 767.5;

export function useWindowAndScreenWidth() {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	const [screenWidth, setScreenWidth] = useState<number>(0);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setScreenWidth(entry.contentRect.width);
				setWindowWidth(window.innerWidth);
			}
		});

		observer.observe(document.documentElement); // 監聽 <html> 大小變化

		return () => observer.disconnect(); // 移除監聽器，避免記憶體洩漏
	}, []);

	return [windowWidth, screenWidth];
}
