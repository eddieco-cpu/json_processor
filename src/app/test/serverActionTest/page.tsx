import Image from "next/image";
import FetchInServerComponent from "./components/actions/FetchInServerComponent";
import FetchInServerDiv from "./components/actions/FetchInServerDiv";

export default function page() {
	return (
		<section>
			<p>### server action testing page ###</p>
			<hr />
			{/* Next sample */}
			{/* <FetchInServerComponent /> */}

			{/* server component fetched & send to client component */}
			<div className="m-4 border bg-slate-100 p-2">
				<FetchInServerDiv />
			</div>

			{/* client component & ask server component to call api */}
			<div className="m-4 border bg-slate-100 p-2">{/* <ClientArea /> */}</div>
		</section>
	);
}
