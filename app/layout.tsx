import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { PaletteProvider } from "@/components/ui/palette-context"
import Navbar from "@/components/ui/layout/navbar"
import PageTransition from "@/components/ui/layout/page-transition"
import AnimatedBackground from "@/components/ui/animated-background"

export const metadata = {
  title: "Splash720 - AI Color Palette Generator",
  description: "Generate beautiful color palettes with AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
       <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    rel="stylesheet"
        />
      </head>

      <body className="bg-black">
        <ThemeProvider>
          <PaletteProvider>
            <div className="relative min-h-screen overflow-hidden">
              <AnimatedBackground />
              <Navbar />
              <div className="relative z-10 pt-16">
                <PageTransition>{children}</PageTransition>
              </div>
            </div>
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

