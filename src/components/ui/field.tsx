import * as React from "react";
import { cn } from "@/lib/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div
      data-slot="field"
      className={cn(
        "group/field flex gap-2 data-[invalid=true]:text-destructive data-[disabled=true]:opacity-60",
        orientation === "vertical"
          ? "flex-col"
          : "flex-row items-center justify-between gap-4",
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-foreground group-data-[invalid=true]/field:text-destructive text-sm font-medium leading-none select-none",
        className
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-foreground text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground group-data-[invalid=true]/field:text-destructive text-xs leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-3 border-0 p-0 m-0", className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      className={cn(
        "text-foreground font-medium",
        variant === "label" ? "text-sm" : "text-base font-display",
        className
      )}
      {...props}
    />
  );
}

export {
  FieldGroup,
  Field,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSet,
  FieldLegend,
};
