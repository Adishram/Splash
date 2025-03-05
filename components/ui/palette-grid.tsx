"use client"

import { motion } from "framer-motion"
import ColorCard from "./color-card"

interface PaletteGridProps {
  palette: {
    id: number
    colors: {
      hex: string
      rgb: string
      hsl: string
    }[]
  }
}

export default function PaletteGrid({ palette }: PaletteGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {palette.colors.map((color, index) => (
        <motion.div
          key={color.hex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <ColorCard color={color} />
        </motion.div>
      ))}
    </div>
  )
}

