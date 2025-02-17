import Image from "next/image";
import FetchInServerComponent from "./components/actions/FetchInServerComponent"

export default function page() {
	return (
		<section>
			<p>### server action testing page ###</p>
			<FetchInServerComponent />
		</section>
	)
}
