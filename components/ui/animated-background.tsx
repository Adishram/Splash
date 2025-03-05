"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
    gradient.addColorStop(1, "rgba(23, 21, 35, 1)")

    // Particles
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      alpha: number
    }[] = []

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: getRandomColor(),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(124, 58, 237, alpha)", // Purple
        "rgba(37, 99, 235, alpha)", // Blue
        "rgba(16, 185, 129, alpha)", // Green
        "rgba(244, 114, 182, alpha)", // Pink
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    createParticles()

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw noise overlay
      drawNoise(ctx, canvas.width, canvas.height, 0.03)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", particle.alpha.toString())
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Draw glow effects
      drawGlowSpots(ctx, canvas.width, canvas.height)

      requestAnimationFrame(drawParticles)
    }

    const drawNoise = (ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) => {
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = alpha * 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const drawGlowSpots = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const spots = [
        { x: width * 0.2, y: height * 0.3, radius: width * 0.3, color: "rgba(124, 58, 237, 0.05)" },
        { x: width * 0.8, y: height * 0.7, radius: width * 0.4, color: "rgba(37, 99, 235, 0.05)" },
      ]

      spots.forEach((spot) => {
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)
        gradient.addColorStop(0, spot.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })
    }

    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
    </>
  )
}

