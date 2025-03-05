"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Sparkles, Settings, Home, Palette, Download } from "lucide-react"
import { useTheme } from "../theme-provider"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Palette", path: "/palette", icon: <Palette className="h-5 w-5" /> },
    { name: "Export", path: "/palette/export", icon: <Download className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-black/20 px-4 py-3 backdrop-blur-lg sm:px-6"
    >
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ rotate: 15 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 p-2 shadow-lg shadow-purple-500/20"
        >
          <Sparkles className="h-5 w-5 text-white" />
        </motion.div>
        <span className="text-xl font-bold text-white">
          Splash<span className="text-purple-500">720</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-lg bg-black/90 p-2 backdrop-blur-xl"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ x: 5 }}
                onClick={() => {
                  router.push(item.path)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive(item.path) ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

