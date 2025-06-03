"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
}

export function Steps({ currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn("flex items-center", className)} {...props} />
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  completed?: boolean;
}

export function Step({ title, completed, className, ...props }: StepProps) {
  return (
    <div className={cn("flex-1 relative", className)} {...props}>
      <div className="flex items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2 z-10",
            completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground text-muted-foreground"
          )}
        >
          {completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : null}
        </div>
        <div
          className={cn(
            "h-[2px] flex-1",
            completed ? "bg-primary" : "bg-muted-foreground/30"
          )}
        />
      </div>
      <div className="mt-2 text-center text-sm font-medium">{title}</div>
    </div>
  );
}
