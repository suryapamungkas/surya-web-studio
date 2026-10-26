"use client";

import * as React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import confetti from "canvas-confetti";
import NumberFlow, { type Format } from "@number-flow/react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  prefix?: string;
  suffix?: string;
  locales?: Intl.LocalesArgument;
  format?: Format;
  popularLabel?: string;
  monthlyBillingNote?: string;
  yearlyBillingNote?: string;
  onSelect?: (billingMode: "monthly" | "yearly") => void;
}

export interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  toggleLabel?: string;
  toggleHighlight?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
  toggleLabel = "Annual billing",
  toggleHighlight = "(Save 20%)",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      void confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#10b981", "#38bdf8", "#a855f7", "#f59e0b"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container mx-auto py-12 sm:py-16">
      <div className="text-center space-y-4 mb-10">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-12">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label className="cursor-pointer">
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              aria-label={toggleLabel}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-3 font-semibold text-sm sm:text-base text-foreground">
          {toggleLabel}{" "}
          <span className="text-status-emerald font-bold">{toggleHighlight}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, index) => {
          const hasCustomAffix = Boolean(plan.prefix || plan.suffix);
          const numberFormat: Format =
            plan.format ??
            (hasCustomAffix
              ? {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 1,
                }
              : {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                });

          return (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : {}
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.2,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "rounded-2xl border p-6 sm:p-7 bg-background text-center lg:flex lg:flex-col lg:justify-between relative shadow-xs",
                plan.isPopular
                  ? "border-status-emerald border-2 shadow-lg"
                  : "border-border",
                "flex flex-col",
                !plan.isPopular && "md:mt-5",
                index === 0 || index === 2
                  ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-status-emerald py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center gap-1">
                  <Star className="text-white h-3.5 w-3.5 fill-current" />
                  <span className="text-white text-xs font-sans font-semibold">
                    {plan.popularLabel ?? "Popular"}
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground tabular-nums">
                    <NumberFlow
                      value={
                        isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                      }
                      locales={plan.locales ?? "id-ID"}
                      prefix={plan.prefix}
                      suffix={plan.suffix}
                      format={numberFormat}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="tabular-nums"
                    />
                  </span>
                  {plan.period !== "Next 3 months" && (
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                      / {plan.period}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs leading-5 text-muted-foreground font-mono">
                  {isMonthly
                    ? (plan.monthlyBillingNote ?? "billed monthly")
                    : (plan.yearlyBillingNote ?? "billed annually")}
                </p>

                <ul className="mt-6 gap-2.5 flex flex-col flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-status-emerald mt-1 flex-shrink-0" />
                      <span className="text-left text-foreground/90 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-6 border-border" />

                {plan.onSelect ? (
                  <button
                    type="button"
                    onClick={() =>
                      plan.onSelect?.(isMonthly ? "monthly" : "yearly")
                    }
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight cursor-pointer",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                      plan.isPopular
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground"
                    )}
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                      plan.isPopular
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground"
                    )}
                  >
                    {plan.buttonText}
                  </Link>
                )}
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
