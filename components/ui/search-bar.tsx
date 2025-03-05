"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-xl">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-sm"></div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your perfect palette..."
          className="w-full bg-transparent px-5 py-4 text-white placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="group mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Search className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
        </button>
      </form>
    </motion.div>
  )
}

