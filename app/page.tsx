"use client"
import Scene from "../components/Scene"

export default function HomePage() {
  return (
    <div className="relative w-full h-screen">
      <img
        src="/abc_logo.png"
        alt="Logo"
        className="absolute top-4 left-4 w-64 h-auto z-10"
      />
      <Scene /> {/* Scroll is handled inside Scene now */}
    </div>
  )
}
