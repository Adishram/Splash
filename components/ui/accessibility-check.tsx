"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Check, Info } from "lucide-react"
import type { ColorInfo } from "./palette-context"

interface AccessibilityCheckProps {
  palette: ColorInfo[]
}

interface ContrastResult {
  color1: string
  color2: string
  ratio: number
  passes: {
    AA: boolean
    AAA: boolean
  }
  recommendation?: string
}

export default function AccessibilityCheck({ palette }: AccessibilityCheckProps) {
  const [results, setResults] = useState<ContrastResult[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const checkContrast = () => {
    setIsChecking(true)

    // Calculate contrast ratios between all color pairs
    const contrastResults: ContrastResult[] = []

    for (let i = 0; i < palette.length; i++) {
      for (let j = i + 1; j < palette.length; j++) {
        const color1 = palette[i].hex
        const color2 = palette[j].hex

        const ratio = calculateContrastRatio(color1, color2)
        const passes = {
          AA: ratio >= 4.5,
          AAA: ratio >= 7,
        }

        let recommendation
        if (!passes.AA) {
          recommendation = "Consider adjusting for better contrast (ratio should be at least 4.5:1)"
        }

        contrastResults.push({
          color1,
          color2,
          ratio,
          passes,
          recommendation,
        })
      }
    }

    setTimeout(() => {
      setResults(contrastResults)
      setIsChecking(false)
    }, 800)
  }

  // Calculate contrast ratio between two colors
  const calculateContrastRatio = (color1: string, color2: string): number => {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)

    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)

    return (brightest + 0.05) / (darkest + 0.05)
  }

  // Calculate relative luminance of a color
  const getLuminance = (hexColor: string): number => {
    const rgb = hexToRgb(hexColor)
    if (!rgb) return 0

    const { r, g, b } = rgb

    const [R, G, B] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Accessibility Check</h3>
        <button
          onClick={checkContrast}
          disabled={isChecking}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
        >
          {isChecking ? "Checking..." : "Check Contrast"}
        </button>
      </div>

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg bg-black/30 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full" style={{ backgroundColor: result.color1 }}></div>
                  <span className="font-mono text-sm">{result.color1}</span>
                </div>
                <span>+</span>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full" style={{ backgroundColor: result.color2 }}></div>
                  <span className="font-mono text-sm">{result.color2}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="font-mono text-sm">Ratio: {result.ratio.toFixed(2)}:1</span>
                  {result.passes.AAA ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : result.passes.AA ? (
                    <Info className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>

              {result.recommendation && <div className="mt-2 text-sm text-red-400">{result.recommendation}</div>}

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className={result.passes.AA ? "text-green-400" : "text-gray-400"}>
                  WCAG AA {result.passes.AA ? "✓" : "✗"}
                </span>
                <span className={result.passes.AAA ? "text-green-400" : "text-gray-400"}>
                  WCAG AAA {result.passes.AAA ? "✓" : "✗"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

