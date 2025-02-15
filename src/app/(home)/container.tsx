"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import { Wrapper } from "@/components/ui/wrapper";

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
  const [value, setValue] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    document.documentElement.style.setProperty("--range-view", (e.target.value).toString());
  };

  return (
    <section className="relative m-auto w-[calc(100%-20px)] h-[calc(100vh-var(--header-height))]">
      <div className="max-lg:hidden max-lg:pointer-events-none max-lg:opacity-0">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={handleChange}
          className="range-control"
        />
      </div>
      <section className={`absolute z-[1] top-0 left-0 h-full overflow-auto w-[calc(var(--range-view,50)*1%-4px)] bg-slate-100 max-lg:bg-slate-200 max-lg:static max-lg:w-full`}>
        <Wrapper>
          <Suspense fallback={<div>Loading suspense fallback...</div>}>
            <JsonProcessor />
          </Suspense>
        </Wrapper>
      </section>
      <section className={`absolute z-[1] top-0 right-0 h-full overflow-auto w-[calc((100-var(--range-view,50))*1%-4px)] bg-slate-50 max-lg:hidden`}>
        <Wrapper>
          <Suspense fallback={<div>Loading suspense fallback...</div>}>
            <JsonProcessor />
          </Suspense>
        </Wrapper>
      </section>
    </section>
  );
}
