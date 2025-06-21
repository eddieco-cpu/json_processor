import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "@/styles/doc.css";

const CodeDemo = ({
	codeString,
	className,
}: {
	codeString: string;
	className?: string;
}) => (
	<pre
		className={cn(
			"overflow-x-auto rounded-md bg-gray-900 p-4 pt-0 text-lime-200",
			className
		)}
	>
		<code>{codeString}</code>
	</pre>
);

const formSubmission = `
<body>
  <form action="/api/jsonObj" method="POST"> 
    <label for="jsonObj">JSON:</label> 
    <input type="text" id="jsonObj" name="jsonObj" required> 
    <button type="submit">Submit</button> 
  </form>
</body>
`;

const formWithFetch = `
<body>
  <form id="customForm">
    <label for="jsonObj">JSON：</label>
    <input type="text" id="jsonObj" name="jsonObj" required>
    <br><br>
    <button type="submit">Submit</button>
  </form>
  <script>
    document.getElementById("customForm").addEventListener("submit", async (e) => {
      e.preventDefault()
      const formData = new FormData(customForm)
      const jsonObj = Object.fromEntries(formData)

      const response = await fetch("/api/jsonObj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObj)
      })
      
      if (response.redirected) {
          window.location.href = response.url;
      } else {
          const data = await response.json();
          console.log("data: ", data);
      }
    })
  </script>
</body>
`;

const formWithFetchFormExample = `/**
 * every stringified JSON is valid
 * must be a json string
 */  
jsonObj="{\\"key\\": \\"value\\"}" 
`

const formWithFetchBodyExample = `/**
 * every stringified JSON is valid 
 * JSON.stringify is necessary
*/
{
  "jsonObj": "{\\"key\\": \\"value\\"}"  
}
`;

const jsonDataQueryStringExample = `
//json data
{"name": "John", "age": 30}

//encoded json data
%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D
`;

const jsonUrlStringExample = `
//url of json
https://icanhazdadjoke.com/slack

//encoded url
https%3A%2F%2Ficanhazdadjoke.com%2Fslack
`;

export default function page() {
	return (
		<article className="doc_article mx-auto w-[85%] max-md:w-[95%]">
			{/* --- */}
			<h1 id="url_doc">
				<Link href={`#url_doc`}>URL Usage Documentation</Link>
			</h1>
			<div className="doc_para bg-extreme p-5">
				<section>
					<h2 className="!mt-2">
						<span className="mr-1 rounded-sm bg-pink-500 p-1 px-2 text-[#f8f8f8]">
							QueryString
						</span>{" "}
						<b className="max-md:block max-md:h-2"></b> ?json_encode_data
						<b>&nbsp;</b> or <b className="max-lg:block max-lg:h-2">&nbsp;</b>
						?json_encode_url
					</h2>
					<article>
						<p>
							​This webpage allows you to display JSON data by providing either
							a JSON string or a URL pointing to a JSON resource through URL
							query parameters.​
						</p>
					</article>
				</section>

				<section>
					<h3>Query String Supported :</h3>
					<ul>
						<li>Providing JSON Data Directly (?json_encode_data)</li>
						<li>Providing a URL to JSON Data (?json_encode_url)</li>
					</ul>
				</section>

				<section>
					<h2>1. Providing JSON Data Directly</h2>
					<article>
						Append the{" "}
						<CodeDemo
							codeString={"json_encode_data"}
							className="inline p-1 px-2"
						/>{" "}
						query parameter to the URL, with your JSON data URI-encoded as its
						value.
					</article>
					<h3>For example :</h3>
					<p className="mb-2">This is a json data. </p>
					<CodeDemo codeString={jsonDataQueryStringExample} />

					<p>&nbsp; </p>
					<p>
						click{" "}
						<Link
							className="link"
							href={`/?json_encode_data={"name":"John","age":30}`}
						>{`/?json_encode_data={"name":"John","age":30}`}</Link>{" "}
						to check, or
					</p>
					<p>
						click{" "}
						<Link
							className="link"
							href={`/?json_encode_data=%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D`}
						>{`/?json_encode_data=%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D`}</Link>{" "}
						to check
					</p>
				</section>

				<section>
					<p>&nbsp; </p>
					<h2>2. Providing a URL to JSON Data</h2>
					<article>
						Append the{" "}
						<CodeDemo
							codeString={"json_encode_url"}
							className="inline p-1 px-2"
						/>{" "}
						query parameter to the URL, with the URI-encoded link to your JSON
						resource as its value.
					</article>
					<h3>For example :</h3>
					<p className="mb-2">This is a json data url address. </p>
					<CodeDemo codeString={jsonUrlStringExample} />

					<p>&nbsp; </p>
					<p>
						click{" "}
						<Link
							className="link"
							href={`/?json_encode_url=https://icanhazdadjoke.com/slack`}
						>{`/?json_encode_url=https://icanhazdadjoke.com/slack`}</Link>{" "}
						to check, or
					</p>
					<p>
						click{" "}
						<Link
							className="link"
							href={`/?json_encode_url=https%3A%2F%2Ficanhazdadjoke.com%2Fslack`}
						>{`/?json_encode_url=https%3A%2F%2Ficanhazdadjoke.com%2Fslack`}</Link>{" "}
						to check
					</p>
				</section>
			</div>

			{/* --- */}
			<h1 id="api_doc">
				<Link href={`#api_doc`}>API Documentation</Link>
			</h1>
			<div className="doc_para bg-extreme p-5">
				<section>
					<h2 className="!mt-2">
						<span className="mr-1 rounded-sm bg-blue-400 p-1 px-2 text-[#f8f8f8]">
							POST
						</span>{" "}
						/api/jsonObj
					</h2>
					<article>
						<p>This API endpoint accepts JSON data via a POST request.</p>
						<p>
							The data can be submitted using either a{" "}
							<b>traditional HTML form</b> or a <b>JavaScript fetch request</b>.
						</p>
						<p>
							​This POST API at <b>http://localhost:5500, 5501</b> has been
							configured to allow Cross-Origin Resource Sharing (CORS), enabling
							it to accept requests from different origins.
						</p>
					</article>
				</section>

				<section>
					<h3>Request Methods :</h3>
					<ul>
						<li>POST</li>
					</ul>
				</section>

				<section>
					<h3>Content-Type Supported :</h3>
					<ul>
						<li>application/x-www-form-urlencoded (Form submission method)</li>
						<li>application/json (Fetch API method)</li>
					</ul>
				</section>

				<section>
					<h2>1. Using HTML Form Submission</h2>
					<h3>Example Form Submission :</h3>
					<CodeDemo codeString={formSubmission} />
				</section>

				<section>
					<h3>Request Headers :</h3>
					<CodeDemo
						codeString="Content-Type: application/x-www-form-urlencoded"
						className="pt-4"
					/>
				</section>

				<section>
					<h3>Request Body Example :</h3>
					<CodeDemo
						codeString={formWithFetchFormExample}
						className="pt-4"
					/>
				</section>

				<section>
					<h3>Response :</h3>
					<p>will direct to spec page to render the sended JSON data</p>
				</section>

				<section>
					<h2>2. Using JavaScript Fetch API</h2>
					<h3>Example JavaScript Form Submission :</h3>
					<CodeDemo codeString={formWithFetch} />
				</section>

				<section>
					<h3>Request Headers :</h3>
					<CodeDemo
						codeString="Content-Type: application/json"
						className="pt-4"
					/>
				</section>

				<section>
					<h3>Request Body Example :</h3>
					<CodeDemo codeString={formWithFetchBodyExample} className="pt-4" />
				</section>

				<section>
					<h2>Notes :</h2>
					<ul>
						<li>
							The API handles both{" "}
							<CodeDemo
								codeString="application/x-www-form-urlencoded"
								className="inline p-1 px-2"
							/>{" "}
							and{" "}
							<CodeDemo
								codeString="application/json"
								className="inline p-1 px-2"
							/>{" "}
							requests.
						</li>
						<li>
							Ensure the JSON input is properly formatted before submission.
						</li>
						<li>
							If using the form method, the input field should contain valid
							JSON.
						</li>
						<li>
							​This POST API at <b>http://localhost:5500, 5501</b> has been
							configured to allow Cross-Origin Resource Sharing (CORS), enabling
							it to accept requests from different origins.
						</li>
					</ul>
				</section>
			</div>
		</article>
	);
}
