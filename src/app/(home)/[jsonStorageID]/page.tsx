import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from 'react'
import { Panel } from "../components/panel";
import { JSONValue } from "@/types/jsonProcessor";

import { BASE_PREFIX } from "@/lib/tools";

//
export default async function page({ params: { jsonStorageID } }: { params: { jsonStorageID: string } }) {
	//
	if (!jsonStorageID?.startsWith(BASE_PREFIX)) {
		notFound();
	}

	//const receivedJson = jsonStorageObj[jsonStorageID] ?? "";

	//
	(globalThis as any).jsonStorageObj = (globalThis as any).jsonStorageObj || {};
	const receivedJson = (globalThis as any).jsonStorageObj[jsonStorageID];

	//
	const insertedJson = receivedJson ? JSON.parse(JSON.stringify(receivedJson)) : null;
	const insertedJsonError = insertedJson ? null : "No data found, please try again.";

	//console.log("## receivedJson ## \n", receivedJson);

	//
	// if (insertedJson) {
	// 	delete jsonStorageObj[jsonStorageID];
	// }

	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<Panel insertedJson={insertedJson} insertedJsonError={insertedJsonError} />
			</Suspense>
		</section>
	)
}
