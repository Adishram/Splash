"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

