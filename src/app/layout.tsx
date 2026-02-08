"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { TamboProvider } from "@tambo-ai/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { debugComponents, DEBUG_SYSTEM_PROMPT } from "@/lib/tambo-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <title>FixFlow - AI Debugging Copilot</title>
        <meta
          name="description"
          content="Visual debugging assistant powered by Tambo AI. Transform error messages into interactive debugging experiences."
        />
      </head>
      <body>
        <ThemeProvider>
          <TamboProvider
            apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY || ""}
            components={debugComponents}
          >
            {children}
          </TamboProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
