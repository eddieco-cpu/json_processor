import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/behaviors/theme-provider";
import { ToastMessenger } from "@/components/behaviors/toast-messenger";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import GlobalProvider from "@/contexts/globalContext";

import "@/styles/globals.css";
import "@/styles/customScrollbar.css";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head>
					<link rel="icon" type="image/svg+xml" href="/svg/logo.svg" />
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
						rel="stylesheet"
					/>
				</head>
				<body
					style={
						{
							"--header-height": "50px",
							"--footer-height": "150px",
						} as React.CSSProperties
					}
				>
					<GlobalProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Header className="h-[var(--header-height)] border-b border-[hsla(var(--border)/0.4)]" />
							<main className="min-h-[calc(100vh-60px-150px)]">{children}</main>
							<Footer className="h-[var(--footer-height)]" />
							<ToastMessenger />
						</ThemeProvider>
					</GlobalProvider>
				</body>
			</html>
		</>
	);
}
