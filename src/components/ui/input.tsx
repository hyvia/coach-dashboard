import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-sm border border-border bg-surface px-4 text-base text-foreground transition-colors outline-none hover:border-muted focus-visible:border-ring focus-visible:ring-0 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-lighter disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
