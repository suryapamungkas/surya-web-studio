import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof Loader2Icon>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Memuat"
      className={cn("animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
