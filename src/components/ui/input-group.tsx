import * as React from "react";
import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "border-border bg-card focus-within:ring-ring relative flex w-full flex-col gap-3 rounded-2xl border p-3 shadow-sm transition-shadow focus-within:ring-2 sm:flex-row sm:items-center",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        "text-foreground placeholder:text-muted-foreground min-h-11 flex-1 bg-transparent px-3 py-2 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-textarea"
      className={cn(
        "text-foreground placeholder:text-muted-foreground min-h-20 w-full flex-1 resize-none bg-transparent px-3 py-2 text-base leading-relaxed outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn("flex shrink-0 items-center justify-end gap-2", className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupAddon,
};
