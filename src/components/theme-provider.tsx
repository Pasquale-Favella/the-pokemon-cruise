"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Force light mode only as requested
  return <NextThemesProvider forcedTheme="light" enableSystem={false} disableTransitionOnChange>{children}</NextThemesProvider>;
}
