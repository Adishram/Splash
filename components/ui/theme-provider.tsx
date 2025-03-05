"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "cyberpunk" | "midnight" | "neon"
type GlassmorphismLevel = "low" | "medium" | "high"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultGlassmorphism?: GlassmorphismLevel
}

interface ThemeContextType {
  theme: Theme
  glassmorphismLevel: GlassmorphismLevel
  setTheme: (theme: Theme) => void
  setGlassmorphismLevel: (level: GlassmorphismLevel) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  defaultGlassmorphism = "medium",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [glassmorphismLevel, setGlassmorphismLevel] = useState<GlassmorphismLevel>(defaultGlassmorphism)

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem("splash720-theme") as Theme | null
    const savedGlassmorphism = localStorage.getItem("splash720-glassmorphism") as GlassmorphismLevel | null

    if (savedTheme) setTheme(savedTheme)
    if (savedGlassmorphism) setGlassmorphismLevel(savedGlassmorphism)
  }, [])

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("splash720-theme", theme)
    localStorage.setItem("splash720-glassmorphism", glassmorphismLevel)

    // Apply theme classes to document
    document.documentElement.classList.remove("theme-dark", "theme-cyberpunk", "theme-midnight", "theme-neon")
    document.documentElement.classList.add(`theme-${theme}`)

    // Apply glassmorphism level
    document.documentElement.classList.remove("glass-low", "glass-medium", "glass-high")
    document.documentElement.classList.add(`glass-${glassmorphismLevel}`)
  }, [theme, glassmorphismLevel])

  const value = {
    theme,
    glassmorphismLevel,
    setTheme,
    setGlassmorphismLevel,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

