"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Code, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePalette } from "@/components/ui/palette-context"
import AccessibilityCheck from "@/components/ui/accessibility-check"

export default function ExportPage() {
  const router = useRouter()
  const { currentPalette } = usePalette()
  const [activeTab, setActiveTab] = useState("preview")
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  if (!currentPalette) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="mb-4 text-xl text-gray-400">No palette to export</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    )
  }

  const getTailwindConfig = () => {
    let config = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n`

    currentPalette.colors.forEach((color, index) => {
      const name =
        index === 0
          ? "primary"
          : index === 1
            ? "secondary"
            : index === 2
              ? "accent"
              : index === 3
                ? "highlight"
                : `color${index + 1}`

      config += `        '${name}': '${color.hex}',\n`
    })

    config += `      },\n    },\n  },\n}`
    return config
  }

  const getMaterialUITheme = () => {
    let config = `// theme.js\nimport { createTheme } from '@mui/material/styles';\n\nconst theme = createTheme({\n  palette: {\n`

    currentPalette.colors.forEach((color, index) => {
      const name =
        index === 0 ? "primary" : index === 1 ? "secondary" : index === 2 ? "info" : index === 3 ? "success" : "warning"

      config += `    ${name}: {\n      main: '${color.hex}',\n    },\n`
    })

    config += `  },\n});\n\nexport default theme;`
    return config
  }

  const getCSSVariables = () => {
    let css = `:root {\n`

    currentPalette.colors.forEach((color, index) => {
      const name =
        index === 0
          ? "primary"
          : index === 1
            ? "secondary"
            : index === 2
              ? "accent"
              : index === 3
                ? "highlight"
                : `color-${index + 1}`

      css += `  --color-${name}: ${color.hex};\n`
    })

    css += `}`
    return css
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const downloadPaletteAsImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 400

    // Draw background
    ctx.fillStyle = "#0F172A"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 24px Arial"
    ctx.fillText(currentPalette.name || "Color Palette", 40, 50)

    // Draw colors
    const colorWidth = (canvas.width - 80) / currentPalette.colors.length

    currentPalette.colors.forEach((color, index) => {
      const x = 40 + index * colorWidth
      const y = 100
      const height = 200

      // Draw color rectangle
      ctx.fillStyle = color.hex
      ctx.fillRect(x, y, colorWidth, height)

      // Draw color code
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "16px monospace"
      ctx.fillText(color.hex, x + 10, y + height + 30)

      // Draw RGB value
      ctx.font = "12px Arial"
      ctx.fillText(`RGB: ${color.rgb}`, x + 10, y + height + 50)
    })

    // Draw footer
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "14px Arial"
    ctx.fillText("Generated with Splash720", 40, canvas.height - 20)

    // Create download link
    const link = document.createElement("a")
    link.download = `${currentPalette.name || "palette"}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadPaletteAsJSON = () => {
    const dataStr = JSON.stringify(currentPalette, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const link = document.createElement("a")
    link.download = `${currentPalette.name || "palette"}.json`
    link.href = dataUri
    link.click()
  }

  // Helper function to determine if a color is light or dark
  const isLightColor = (hexColor: string) => {
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5
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
          onClick={() => router.push("/palette")}
          className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md transition-all hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Palette</span>
        </button>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="ml-4 text-2xl font-bold"
        >
          Export & Preview
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-black/20 p-6 backdrop-blur-lg"
      >
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-4 bg-black/30">
            <TabsTrigger value="preview">UI Preview</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
            <TabsTrigger value="mui">Material UI</TabsTrigger>
            <TabsTrigger value="css">CSS Variables</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  {currentPalette.colors.map((color, index) => (
                    <Button
                      key={`btn-${index}`}
                      style={{ backgroundColor: color.hex }}
                      className="transition-transform hover:scale-105"
                    >
                      Button
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Cards</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentPalette.colors.slice(0, 2).map((color, index) => (
                    <Card
                      key={`card-${index}`}
                      style={{
                        backgroundColor: color.hex,
                        color: isLightColor(color.hex) ? "#000" : "#fff",
                      }}
                      className="p-4 transition-transform hover:scale-105"
                    >
                      <h4 className="font-medium">Card Title</h4>
                      <p className="text-sm opacity-80">Card content goes here</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Text Colors</h3>
                <div className="space-y-2">
                  {currentPalette.colors.map((color, index) => (
                    <p key={`text-${index}`} style={{ color: color.hex }} className="font-medium">
                      This text is colored with {color.hex}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Backgrounds</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentPalette.colors.map((color, index) => (
                    <div
                      key={`bg-${index}`}
                      style={{
                        backgroundColor: color.hex,
                        color: isLightColor(color.hex) ? "#000" : "#fff",
                      }}
                      className="flex h-16 items-center justify-center rounded-lg"
                    >
                      Background {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tailwind">
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="overflow-x-auto text-sm text-gray-300">
                <code>{getTailwindConfig()}</code>
              </pre>
            </div>
            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleCopy(getTailwindConfig(), "tailwind")}
            >
              {copied === "tailwind" ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Tailwind Config
                </span>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="mui">
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="overflow-x-auto text-sm text-gray-300">
                <code>{getMaterialUITheme()}</code>
              </pre>
            </div>
            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleCopy(getMaterialUITheme(), "mui")}
            >
              {copied === "mui" ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Material UI Theme
                </span>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="css">
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="overflow-x-auto text-sm text-gray-300">
                <code>{getCSSVariables()}</code>
              </pre>
            </div>
            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleCopy(getCSSVariables(), "css")}
            >
              {copied === "css" ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy CSS Variables
                </span>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 rounded-xl bg-black/20 p-6 backdrop-blur-lg"
      >
        <h2 className="mb-4 text-xl font-bold text-white">Download Options</h2>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={downloadPaletteAsImage}>
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download as Image
            </span>
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700" onClick={downloadPaletteAsJSON}>
            <span className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Download as JSON
            </span>
          </Button>
        </div>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 rounded-xl bg-black/20 p-6 backdrop-blur-lg"
      >
        <AccessibilityCheck palette={currentPalette.colors} />
      </motion.div>
    </div>
  )
}

