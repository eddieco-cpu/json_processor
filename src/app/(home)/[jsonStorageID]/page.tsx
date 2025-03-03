import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from 'react'
import { Panel } from "../components/panel";
import { JSONValue } from "@/types/jsonProcessor";

import { secretVariable, jsonStorageObj } from "@/lib/server-data";
import { BASE_PREFIX } from "@/lib/tools";

//
export default async function page({ params: { jsonStorageID } }: { params: { jsonStorageID: string } }) {
	//
	if (!jsonStorageID?.startsWith(BASE_PREFIX)) {
		notFound();
	}

	console.log("@@@ jsonStorageObj @@@ \n", jsonStorageObj);

	const insertedJson = jsonStorageObj[jsonStorageID] ?? "";
	const insertedJsonError = insertedJson ? null : "No data found, please try again.";

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
