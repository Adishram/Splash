"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, FileImage } from "lucide-react"

interface UploadBoxProps {
  onUpload: (file: File) => void
}

export default function UploadBox({ onUpload }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
      onUpload(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-xl">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-sm"></div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-600 bg-white/5"
        } p-6 backdrop-blur-xl transition-all duration-300`}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileInput} accept="image/*" className="hidden" />

        {preview ? (
          <div className="relative flex w-full flex-col items-center">
            <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-lg">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              <FileImage className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
            </div>
            <p className="text-center text-sm text-gray-300">Image selected. Click to change or drop a new image.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-full bg-white/10 p-4">
              <Upload className="h-8 w-8 text-purple-400" />
            </div>
            <p className="mb-2 text-center text-lg font-medium text-white">Drag & drop an image</p>
            <p className="text-center text-sm text-gray-400">or click to browse</p>
            <p className="mt-4 text-center text-xs text-gray-500">Upload an image to extract a color palette</p>
          </>
        )}
      </div>
    </motion.div>
  )
}

