import Image from "next/image";
import { Suspense } from 'react'
import { Panel } from "./components/panel";

export default function page() {
	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<Panel />
			</Suspense>
		</section>
	)
}
