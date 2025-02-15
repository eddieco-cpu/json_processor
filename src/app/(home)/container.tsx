"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

const JsonProcessor = dynamic(
	() =>
		import("@/components/features/jsonProcessor").then(
			(mod) => mod.JsonProcessor
		),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	}
);

export function Container() {
	return (
		<div>
			<Suspense fallback={<div>Loading suspense fallback...</div>}>
				<JsonProcessor />
			</Suspense>
		</div>
	);
}
