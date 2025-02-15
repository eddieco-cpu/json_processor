import { cn } from "@/lib/utils";
import { LightModeToggler } from "@/components/behaviors/light-mode-toggler";
import React, { ComponentPropsWithoutRef } from "react";

export const Header = ({
	className,
	...props
}: {
	className?: string;
} & ComponentPropsWithoutRef<"header">) => {
	return (
		<header className={cn("flex justify-between items-center px-4", className)} {...props}>
			<span>JSON Processor</span>
			<LightModeToggler />
		</header>
	);
};
