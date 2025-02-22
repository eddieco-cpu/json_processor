import Image from "next/image";
import { Suspense } from 'react'
import { Panel } from "./components/panel";
import { JSONValue } from "@/types/jsonProcessor";

import { isValidJson, isValidURL } from "@/lib/tools";
import { fetchData } from "@/lib/api";

//
async function dealWithJsonUrl(url: string): Promise<[JSONValue | null, string | null]> {
	if (url.length > 120000) {
    return [null, `Search params' length is too large, must be less than 120000. (${url.length})`];
  }
	try {
		const decodedJsonUrl = decodeURIComponent(url);
		if (!isValidURL(decodedJsonUrl)) {
			return [null, "Invalid url"]
		}

		const data = await fetchData(url)
		return data

	} catch (error: unknown) {

    let errorMessage = "An error occurred while processing JSON url";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return [null, errorMessage];
  }
}

function dealWithJsonData(str: string): [JSONValue | null, string | null] {
  if (str.length > 120000) {
    return [null, `Search params' length is too large, must be less than 120000. (${str.length})`];
  }
  try {
    const decodedJsonStr = decodeURIComponent(str);
    if (!isValidJson(decodedJsonStr)) {
      return [null, "Cannot parse to JSON"];
    }

    const jsonData = JSON.parse(decodedJsonStr);
    return [jsonData, null];

  } catch (error: unknown) {

    let errorMessage = "An error occurred while processing JSON data";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return [null, errorMessage];
  }
}

//
export default async function page({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	/**
	 * chrome & edge max acceptable searchParams's length is : 147607
	 * we have set our limit to 120000
	 */
	const jsonUrl = searchParams?.json_encode_url || null;
	const jsonData = searchParams?.json_encode_data || null;

	/**
	 * when dealing with search params, params's url > data
	 */
	let [receivedJson, receivedJsonError]: [JSONValue | null, string | null] = [null, null]

	if (jsonUrl) {
		[receivedJson, receivedJsonError] = await dealWithJsonUrl(jsonUrl);
	} else if (jsonData) {
		[receivedJson, receivedJsonError] = dealWithJsonData(jsonData)
	}

	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<Panel insertedJson={receivedJson} insertedJsonError={receivedJsonError} />
			</Suspense>
		</section>
	)
}
