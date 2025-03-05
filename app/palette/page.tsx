"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, RefreshCw, Copy, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import PaletteGrid from "@/components/ui/palette-grid"
import { usePalette } from "@/components/ui/palette-context"

export default function PalettePage() {
  const router = useRouter()
  const { currentPalette, generatePalette, savePalette } = usePalette()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Reset saved state when palette changes
    setIsSaved(false)
  }, [])

  const handleGenerateAgain = async () => {
    setIsGenerating(true)
    try {
      await generatePalette()
    } catch (error) {
      console.error("Failed to generate palette:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyPalette = () => {
    if (!currentPalette) return

    const colorCodes = currentPalette.colors.map((color) => color.hex).join(", ")
    navigator.clipboard.writeText(colorCodes)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const handleSavePalette = () => {
    if (!currentPalette) return

    savePalette(currentPalette)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  if (!currentPalette) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="mb-4 text-xl text-gray-400">No palette generated yet</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center"
      >
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md transition-all hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="ml-4 text-2xl font-bold"
        >
          {currentPalette.name || "Your Color Palette"}
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <PaletteGrid palette={currentPalette} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-12 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, brightness: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateAgain}
          disabled={isGenerating}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-500/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></span>
          <span className="relative flex items-center gap-2">
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generate Again
              </>
            )}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyPalette}
          className="relative flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 backdrop-blur-md transition-all hover:bg-white/20"
        >
          <Copy className="h-4 w-4" />
          Copy All Colors
          {showCopied && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-green-500 px-2 py-1 text-xs"
            >
              Copied!
            </motion.span>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/palette/export")}
          className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 backdrop-blur-md transition-all hover:bg-white/20"
        >
          <Download className="h-4 w-4" />
          Export Palette
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSavePalette}
          className="relative flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 backdrop-blur-md transition-all hover:bg-white/20"
        >
          <Save className="h-4 w-4" />
          Save Palette
          {isSaved && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-green-500 px-2 py-1 text-xs"
            >
              Saved!
            </motion.span>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

