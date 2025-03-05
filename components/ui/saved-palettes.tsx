"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Edit, Clock } from "lucide-react"
import { type Palette, usePalette } from "./palette-context"
import { useRouter } from "next/navigation"

export default function SavedPalettes() {
  const { savedPalettes, deletePalette, setCurrentPalette } = usePalette()
  const [expandedPalette, setExpandedPalette] = useState<string | null>(null)
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handlePaletteClick = (palette: Palette) => {
    setCurrentPalette(palette)
    router.push("/palette")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Saved Palettes</h3>

      {savedPalettes.length === 0 ? (
        <div className="rounded-lg bg-black/30 p-6 text-center backdrop-blur-sm">
          <p className="text-gray-400">No saved palettes yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedPalettes.map((palette) => (
            <motion.div
              key={palette.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm"
            >
              <div
                className="cursor-pointer p-4"
                onClick={() => setExpandedPalette(expandedPalette === palette.id ? null : palette.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{palette.name}</h4>
                    {palette.source && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                        {palette.source === "text" ? "Text" : "Image"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(palette.createdAt)}
                  </div>
                </div>

                <div className="mt-3 flex h-8 w-full overflow-hidden rounded-md">
                  {palette.colors.map((color) => (
                    <div
                      key={color.hex}
                      className="flex-1 transition-transform hover:scale-y-110"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  ))}
                </div>
              </div>

              {expandedPalette === palette.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 p-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color) => (
                      <div key={color.hex} className="flex items-center gap-1.5">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color.hex }}></div>
                        <span className="font-mono text-xs">{color.hex}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handlePaletteClick(palette)}
                      className="flex items-center gap-1.5 rounded-full bg-purple-600/80 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-600"
                    >
                      <Edit className="h-3 w-3" />
                      Use Palette
                    </button>
                    <button
                      onClick={() => deletePalette(palette.id)}
                      className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

