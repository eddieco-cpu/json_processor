"use client";

import * as React from "react";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const baseStatusString = ""; //" before:absolute before:w-full before:h-full before:block before:top-0 before:left-0 before:opacity-[0.18] dark:before:opacity-[0.25] before:pointer-events-none "
const baseStatusClassNames = {
	success: cn(baseStatusString, " !border-green-500 !text-green-500 "), //before:bg-green-400
	error: cn(baseStatusString, " !border-red-500 !text-red-500 "), //before:bg-red-400
	warning: cn(baseStatusString, " !border-amber-500 !text-amber-500 "), //before:bg-amber-400 dark:before:opacity-[0.3]
};

const ToastMessenger = ({
	position = "top-center",
	closeButton = true,
	duration = 3600,
	expand = true,
	richColors = true,
	style,
	...props
}: ToasterProps) => {
	//
	const defaultToastOptions = {
		classNames: {
			toast: cn(
				"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
				props?.toastOptions?.classNames?.toast
			),
			description: cn(
				"group-[.toast]:text-muted-foreground",
				props?.toastOptions?.classNames?.description
			),
			actionButton: cn(
				"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
				props?.toastOptions?.classNames?.actionButton
			),
			cancelButton: cn(
				"group-[.toast]:bg-red-500 group-[.toast]:text-muted-foreground",
				props?.toastOptions?.classNames?.cancelButton
			),
			closeButton: cn(
				"!bg-[#fff] !text-extreme-reverse !border-extreme dark:!bg-extreme   ",
				props?.toastOptions?.classNames?.closeButton
			),
			success:
				props?.toastOptions?.classNames?.success ||
				baseStatusClassNames.success,
			error:
				props?.toastOptions?.classNames?.error || baseStatusClassNames.error,
			warning:
				props?.toastOptions?.classNames?.warning ||
				baseStatusClassNames.warning,
		},
	};

	//
	return (
		<Toaster
			position={position}
			closeButton={closeButton}
			duration={duration}
			expand={expand}
			richColors={richColors}
			toastOptions={{
				...props?.toastOptions,
				classNames: defaultToastOptions.classNames,
			}}
			style={
				{
					...{
						"--toast-close-button-end": 0,
						"--toast-close-button-start": "unset",
						"--toast-close-button-transform": "translate(35%, -35%)",
					},
					style,
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { ToastMessenger };

/**
 * "--success-bg": "linear-gradient(90deg, #34d399 0%, #10b981 100%)",
 * "--error-bg": "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
 * "--warning-bg": "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
 */
