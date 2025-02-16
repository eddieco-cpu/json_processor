"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense, CSSProperties } from "react";
import { Wrapper } from "@/components/ui/wrapper";
import { tabletWidth, useWindowAndScreenWidth } from "@/hooks/useAppWidth";


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

export function Panel() {
  const [viewWidth, setViewWidth] = useState(50);
  const [jsonData, setJsonData] = useState({
    name: "Eddie",
    age: 25,
    skills: ["React", "Vue", "TypeScript"],
    isDeveloper: true,
    nested: { key: "value", number: 123, flag: false, empty: null },
  });
  const [windowWidth, screenWidth] = useWindowAndScreenWidth();


  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewWidth(Number(e.target.value));
    document.documentElement.style.setProperty("--range-view", (e.target.value).toString());
  };

  return (
    <ul className="" style={{"--panel-top-height": "50px"} as CSSProperties}>
      <li className="h-[var(--panel-top-height)] px-2 flex justify-start items-center">
          <p>Insert JSON data via: paste directly, upload file, called api</p>
      </li>
      <li className="relative m-auto w-[calc(100%-20px)] h-[calc(100vh-var(--header-height)-var(--panel-top-height))]">
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
        <section className={`absolute z-[1] top-0 left-0 h-full overflow-auto w-[calc(var(--range-view,50)*1%-4px)] bg-slate-100 max-lg:bg-slate-200 max-lg:static max-lg:w-full`}>
          <Wrapper>
            <Suspense fallback={<div>Loading suspense fallback...</div>}>
              <JsonProcessor {...{jsonData, setJsonData, initMode: "code"}} />
            </Suspense>
          </Wrapper>
        </section>
        {
        windowWidth > tabletWidth && (
          <section className={`absolute z-[1] top-0 right-0 h-full overflow-auto w-[calc((100-var(--range-view,50))*1%-4px)] bg-slate-50 max-lg:hidden`}>
            <Wrapper>
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
