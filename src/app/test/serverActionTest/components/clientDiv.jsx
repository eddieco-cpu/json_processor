"use client";

import React, { useEffect } from "react";

export function ClientDiv({ data }) {
	//
	useEffect(() => {
		console.log("data: ", data);
	}, []);

	//
	return (
		<div className="m-2 border p-2">
			<p>clientDiv</p>
			<ul>
				{data.map((item, i) => (
					<li key={item.id}>
						{i + 1} -- {item.username}
					</li>
				))}
			</ul>
		</div>
	);
}
