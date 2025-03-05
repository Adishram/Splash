"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

interface ColorCardProps {
  color: {
    hex: string
    rgb: string
    hsl: string
  }
}

export default function ColorCard({ color }: ColorCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div whileHover={{ y: -5, scale: 1.03 }} className="group relative overflow-hidden rounded-xl">
      <div className="absolute -inset-0.5 bg-white/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="relative flex flex-col overflow-hidden rounded-xl bg-black/20 backdrop-blur-lg">
        <div
          className="h-32 w-full transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: color.hex }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-white">{color.hex}</span>
            <button
              onClick={() => handleCopy(color.hex)}
              className="rounded-full bg-white/10 p-1.5 transition-colors hover:bg-white/20"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-white" />}
            </button>
          </div>

          <div className="space-y-1 text-xs text-gray-400">
            <p>RGB: {color.rgb}</p>
            <p>HSL: {color.hsl}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

