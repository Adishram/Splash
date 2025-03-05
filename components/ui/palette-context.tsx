"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface ColorInfo {
  hex: string
  rgb: string
  hsl: string
}

export interface Palette {
  id: string;
  name: string;
  colors: ColorInfo[];
  createdAt: string;
  updatedAt?: string; // Add this
  source?: string;
}


interface PaletteContextType {
  currentPalette: Palette | null
  savedPalettes: Palette[]
  setCurrentPalette: (palette: Palette) => void
  savePalette: (palette: Palette) => void
  deletePalette: (id: string) => void
  generatePalette: (input?: string | File) => Promise<Palette>
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined)

// Sample palettes for demo purposes
const samplePalettes: Palette[] = [
  {
    id: "1",
    name: "Cyberpunk Night",
    colors: [
      { hex: "#0F172A", rgb: "15, 23, 42", hsl: "222, 47%, 11%" },
      { hex: "#7C3AED", rgb: "124, 58, 237", hsl: "263, 85%, 58%" },
      { hex: "#2563EB", rgb: "37, 99, 235", hsl: "217, 91%, 53%" },
      { hex: "#10B981", rgb: "16, 185, 129", hsl: "160, 84%, 39%" },
      { hex: "#F472B6", rgb: "244, 114, 182", hsl: "330, 86%, 70%" },
    ],
    createdAt: new Date().toISOString(),
    source: "text",
  },
  {
    id: "2",
    name: "Neon Dreams",
    colors: [
      { hex: "#18181B", rgb: "24, 24, 27", hsl: "240, 6%, 10%" },
      { hex: "#6D28D9", rgb: "109, 40, 217", hsl: "263, 70%, 50%" },
      { hex: "#4F46E5", rgb: "79, 70, 229", hsl: "244, 76%, 59%" },
      { hex: "#0EA5E9", rgb: "14, 165, 233", hsl: "199, 89%, 48%" },
      { hex: "#EC4899", rgb: "236, 72, 153", hsl: "330, 81%, 60%" },
    ],
    createdAt: new Date().toISOString(),
    source: "text",
  },
  {
    id: "3",
    name: "Midnight Glow",
    colors: [
      { hex: "#0F172A", rgb: "15, 23, 42", hsl: "222, 47%, 11%" },
      { hex: "#4338CA", rgb: "67, 56, 202", hsl: "245, 58%, 51%" },
      { hex: "#1D4ED8", rgb: "29, 78, 216", hsl: "221, 83%, 48%" },
      { hex: "#0369A1", rgb: "3, 105, 161", hsl: "201, 96%, 32%" },
      { hex: "#0D9488", rgb: "13, 148, 136", hsl: "175, 84%, 32%" },
    ],
    createdAt: new Date().toISOString(),
    source: "image",
  },
]

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("splash720-palettes");
    if (saved && saved !== "[]") {
      try {
        setSavedPalettes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved palettes", e);
        setSavedPalettes(samplePalettes);
      }
    } else {
      setSavedPalettes(samplePalettes);
    }
  }, []);
  

  useEffect(() => {
    // Save palettes to localStorage
    if (savedPalettes.length > 0) {
      localStorage.setItem("splash720-palettes", JSON.stringify(savedPalettes))
    }
  }, [savedPalettes])

  const savePalette = (palette: Palette) => {
    // Check if palette with this ID already exists
    const exists = savedPalettes.some((p) => p.id === palette.id)

    if (exists) {
      // Update existing palette
      setSavedPalettes(
        savedPalettes.map((p) => (p.id === palette.id ? { ...palette, updatedAt: new Date().toISOString() } : p)),
      )
    } else {
      // Add new palette
      setSavedPalettes([
        ...savedPalettes,
        {
          ...palette,
          id: palette.id || crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const deletePalette = (id: string) => {
    setSavedPalettes(savedPalettes.filter((p) => p.id !== id))
  }

  // Helper function to generate a random color
const generateRandomColor = (): ColorInfo => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
    hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
    rgb: `${r}, ${g}, ${b}`,
    hsl: `hsl(${Math.round((r + g + b) / 3)}, 50%, 50%)`, // Approximate HSL
  };
};
  // Mock function to generate a palette
  const generatePalette = async (input?: string | File): Promise<Palette> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPalette: Palette = {
          id: crypto.randomUUID(),
          name: typeof input === "string" ? `Generated from "${input}"` : "Generated Palette",
          colors: Array.from({ length: 5 }, generateRandomColor), // Generate 5 random colors
          source: typeof input === "string" ? "text" : input instanceof File ? "image" : undefined,
          createdAt: new Date().toISOString(),
        };
        setCurrentPalette(newPalette);
        resolve(newPalette);
      }, 1500);
    });
  };

  const value = {
    currentPalette,
    savedPalettes,
    setCurrentPalette,
    savePalette,
    deletePalette,
    generatePalette,
  }

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
}

export const usePalette = () => {
  const context = useContext(PaletteContext)
  if (context === undefined) {
    throw new Error("usePalette must be used within a PaletteProvider")
  }
  return context
}

