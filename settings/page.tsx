"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Moon, Sparkles, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/ui/theme-provider"
import { usePalette } from "@/components/ui/palette-context"
import SavedPalettes from "@/components/ui/saved-palettes"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, glassmorphismLevel, setTheme, setGlassmorphismLevel } = useTheme()
  const { savedPalettes } = usePalette()
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  const themes = [
    { id: "dark", name: "Dark", icon: <Moon className="h-5 w-5" /> },
    { id: "cyberpunk", name: "Cyberpunk", icon: <Sparkles className="h-5 w-5" /> },
    { id: "midnight", name: "Midnight", icon: <Moon className="h-5 w-5" /> },
    { id: "neon", name: "Neon", icon: <Sparkles className="h-5 w-5" /> },
  ]

  const glassmorphismLevels = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ]

  const clearLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
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
          Settings
        </motion.h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-black/20 p-6 backdrop-blur-lg"
        >
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Theme Settings</h2>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-400">Theme</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`flex items-center justify-center gap-2 rounded-lg p-3 transition-all ${
                    theme === t.id ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {t.icon}
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-400">Glassmorphism Level</h3>
            <div className="grid grid-cols-3 gap-3">
              {glassmorphismLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setGlassmorphismLevel(level.id as any)}
                  className={`rounded-lg p-3 transition-all ${
                    glassmorphismLevel === level.id
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-400">Reset Settings</h3>
            {showConfirmClear ? (
              <div className="rounded-lg bg-red-900/20 p-4">
                <p className="mb-3 text-sm text-white">
                  Are you sure? This will clear all saved palettes and settings.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={clearLocalStorage}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                  >
                    Yes, Clear All
                  </button>
                  <button
                    onClick={() => setShowConfirmClear(false)}
                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600/70"
              >
                <Trash2 className="h-4 w-4" />
                Clear All Data
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-black/20 p-6 backdrop-blur-lg"
        >
          <SavedPalettes />
        </motion.div>
      </div>
    </div>
  )
}

