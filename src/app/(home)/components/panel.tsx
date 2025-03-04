"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense, CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { Wrapper } from "@/components/ui/wrapper";
import { UploadButton } from "./upload-button";
import { toast } from "sonner"
import { useGlobalContext } from "@/contexts/globalContext";
import { tabletWidth, useWindowAndScreenWidth } from "@/hooks/useAppWidth";
import example from '@/assets/example.json';

import { deleteJsonStorageObjKey } from '@/actions/control-server-data';
import { BASE_PREFIX } from "@/lib/tools";

import { JSONValue } from "@/types/jsonProcessor";

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

export function Panel({ insertedJson, insertedJsonError } : {
  insertedJson: JSONValue;
  insertedJsonError: string | null;
}) {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const jsonId = pathArray[pathArray.length - 1];

  const {jsonData, setJsonData} = useGlobalContext();
  const [viewWidth, setViewWidth] = useState(50);
  const [windowWidth, screenWidth] = useWindowAndScreenWidth();
  const effectExecuted = useRef(false);

  //
  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewWidth(Number(e.target.value));
    document.documentElement.style.setProperty("--range-view", (e.target.value).toString());
  };

  //
  useEffect(() => {
    if (effectExecuted.current) return;
    effectExecuted.current = true;

    if (insertedJsonError) {
      toast.error("Failed. " + insertedJsonError)
    }
    if (insertedJson) {
      toast.success("Got data successfully")
      setJsonData(() => insertedJson)
    } else {
      const jsonExample = example as unknown as JSONValue
      setJsonData(() => jsonExample)
    }

    if (jsonId && jsonId.startsWith(BASE_PREFIX)) {
      deleteJsonStorageObjKey(jsonId);
    }
  }, [])

  return (
    <ul className="" style={{"--panel-top-height": "50px", "--panel-min-width": "400px"} as CSSProperties}>
      {/* top */}
      <li className="h-[var(--panel-top-height)] px-2 flex justify-start items-center border-b border-[hsla(var(--border)/0.4)]">
          <p className=" max-md:text-[13px]">Insert JSON via: paste directly (code mode), upload file <UploadButton />, call api <Link className=" inline-block font-semibold  hover:bg-[hsl(var(--grass-85))] dark:hover:bg-[hsl(var(--lake-35))] px-1 rounded-[3px]" href={"/doc#api_doc"}>read more</Link>, set url <Link className=" inline-block font-semibold hover:bg-[hsl(var(--grass-85))] hover:dark:bg-[hsl(var(--lake-35))] px-1 rounded-[3px]" href={"/doc#url_doc"}>read more</Link> </p>
      </li>

      {/* panel body */}
      <li className="relative m-auto w-full h-[calc(100vh-var(--header-height)-var(--panel-top-height))]">
        <div className="max-lg:hidden max-lg:pointer-events-none max-lg:opacity-0">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={viewWidth}
            onChange={handleViewChange}
            className="range-control"
          />
        </div>
        <section className={`absolute z-[1] top-0 left-0 h-full overflow-auto w-[calc(var(--range-view,50)*1%-4px)] hover:bg-[hsla(var(--border)/0.05)] max-lg:bg-[hsla(var(--border)/0.05)] max-lg:static max-lg:w-full`}>
          <Wrapper className="md:min-w-[calc(var(--panel-min-width)+20px)]">
            <Suspense fallback={<div>Loading suspense fallback...</div>}>
              <JsonProcessor {...{jsonData, setJsonData, initMode: "code"}} />
            </Suspense>
          </Wrapper>
        </section>
        {
        windowWidth > tabletWidth && (
          <section className={`absolute z-[1] top-0 right-0 h-full overflow-auto w-[calc((100-var(--range-view,50))*1%-4px)] hover:bg-[hsla(var(--border)/0.05)] max-lg:hidden`}>
            <Wrapper className="md:min-w-[calc(var(--panel-min-width)+20px)]">
              <Suspense fallback={<div>Loading suspense fallback...</div>}>
                <JsonProcessor {...{jsonData, setJsonData, initMode: "tree"}} />
              </Suspense>
            </Wrapper>
          </section>
        )
        }
      </li>
    </ul>
  );
}
