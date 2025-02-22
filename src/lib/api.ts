import { JSONValue } from "@/types/jsonProcessor";

export async function fetchData(
  url: string
): Promise<[JSONValue | null, string | null]> {
  try {
    const res = await fetch(url, {
      next: { 
        revalidate: 30 //0.5 min
      }
    });
    if (!res.ok) {
      return [null, `HTTP error! Status: ${res.status}`];
    }
    
    const textData = await res.text();

    try {
      const data = JSON.parse(textData);
      return [data, null];
    } catch {
      return [null, "Response is not valid JSON!"];
    }
  } catch (error: unknown) {
    console.error("Fetch error:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return [null, errorMessage];
  }
}