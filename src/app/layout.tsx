import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/behaviors/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body 
					style={{ "--header-height": "50px", "--footer-height": "150px" } as React.CSSProperties}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Header 
							className="h-[var(--header-height)] border-b border-gray-200"
						/>
						<main className="min-h-[calc(100vh-60px-150px)]">
						{children}
						</main>
						<Footer 
							className="h-[var(--footer-height)]"
						/>
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
