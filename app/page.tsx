"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import HeroSection from "@/components/ui/hero-section"
import SearchBar from "@/components/ui/search-bar"
import UploadBox from "@/components/ui/upload-box"
import { usePalette } from "@/components/ui/palette-context"

export default function Home() {
  const router = useRouter()
  const { generatePalette } = usePalette()
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async (input?: string | File) => {
    setIsLoading(true)
    try {
      await generatePalette(input)
      router.push("/palette")
    } catch (error) {
      console.error("Failed to generate palette:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="container relative z-10 mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <HeroSection />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 w-full max-w-2xl"
          >
            <SearchBar onSearch={handleGenerate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 w-full max-w-2xl"
          >
            <UploadBox onUpload={handleGenerate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-col items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, brightness: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenerate()}
              disabled={isLoading}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-500/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Palette
                  </>
                )}
              </span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-4 text-sm text-gray-400"
            >
              Or try with a prompt like "sunset over ocean" or "cyberpunk city"
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

