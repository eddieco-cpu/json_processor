import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

export const Wrapper = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "wrapper w-full p-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};