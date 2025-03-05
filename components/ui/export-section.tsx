"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ExportSectionProps {
  palette: {
    id: number
    colors: {
      hex: string
      rgb: string
      hsl: string
    }[]
  }
}

export default function ExportSection({ palette }: ExportSectionProps) {
  const [activeTab, setActiveTab] = useState("preview")

  const getTailwindConfig = () => {
    let config = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n`

    palette.colors.forEach((color, index) => {
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

    palette.colors.forEach((color, index) => {
      const name =
        index === 0 ? "primary" : index === 1 ? "secondary" : index === 2 ? "info" : index === 3 ? "success" : "warning"

      config += `    ${name}: {\n      main: '${color.hex}',\n    },\n`
    })

    config += `  },\n});\n\nexport default theme;`
    return config
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-black/20 p-6 backdrop-blur-lg"
    >
      <h2 className="mb-4 text-xl font-bold text-white">Preview & Export</h2>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-black/30">
          <TabsTrigger value="preview">UI Preview</TabsTrigger>
          <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
          <TabsTrigger value="mui">Material UI</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                {palette.colors.map((color, index) => (
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
                {palette.colors.slice(0, 2).map((color, index) => (
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
                {palette.colors.map((color, index) => (
                  <p key={`text-${index}`} style={{ color: color.hex }} className="font-medium">
                    This text is colored with {color.hex}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Backgrounds</h3>
              <div className="grid grid-cols-2 gap-3">
                {palette.colors.map((color, index) => (
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
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Copy Tailwind Config</Button>
        </TabsContent>

        <TabsContent value="mui">
          <div className="rounded-lg bg-gray-900 p-4">
            <pre className="overflow-x-auto text-sm text-gray-300">
              <code>{getMaterialUITheme()}</code>
            </pre>
          </div>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Copy Material UI Theme</Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

// Helper function to determine if a color is light or dark
function isLightColor(hexColor: string) {
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5
}

