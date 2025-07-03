import * as React from "react"
import {cn} from "../../lib/utils.ts";

interface InputProps extends React.ComponentProps<"input"> {
    error?: string;
}

function Input({ className, type, error, ...props }: InputProps) {
    return (
        <div className="w-full">
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
                    error && "border-destructive ring-destructive/20",
                    className
                )}
                aria-invalid={error ? "true" : "false"}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

export { Input }