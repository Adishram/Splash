"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 p-3 shadow-lg shadow-purple-500/20"
      >
        <Sparkles className="h-8 w-8 text-white" />
      </motion.div>

      <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mb-4 relative text-5xl sm:text-6xl"
  style={{
    background: "linear-gradient(to right, #fff, #e2e8f0)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 20px rgba(124, 58, 237, 0.2)",
    fontFamily: '"Poppins", sans-serif',  //  Orbitron to Poppins
    letterSpacing: "0.05em",
    fontWeight: "800",
  }}
>
  Splash
  <span
    className="relative inline-block"
    style={{
      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      textShadow: "0 0 25px rgba(124, 58, 237, 0.4)",
      fontFamily: '"Poppins", sans-serif', // 🔄 Also change this
      fontWeight: "900",
    }}
  >
    720
  </span>
</motion.h1>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative mx-auto mb-8 max-w-2xl"
      >
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-lg"></div>
        <div className="relative rounded-lg bg-black/40 p-6 backdrop-blur-xl">
          <p className="text-lg text-gray-300">
            AI-powered color palette generator that creates stunning, harmonious color combinations for your next design
            project.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48"
      >
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl"></div>
        <div className="absolute inset-4 animate-spin-slow-reverse rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-xl"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-500/80 p-1 backdrop-blur-sm sm:h-40 sm:w-40">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-500/80"></div>
                <div className="h-8 w-8 rounded-full bg-blue-500/80"></div>
                <div className="h-8 w-8 rounded-full bg-pink-500/80"></div>
                <div className="h-8 w-8 rounded-full bg-cyan-500/80"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

