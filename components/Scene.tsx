"use client"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import Model from "./Model"

export default function Scene() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      {/* pages=4 makes the scroll area 4x viewport height */}
      <ScrollControls pages={4} damping={0.1}>
        {/* 3D content */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* HTML overlay content */}
        <Scroll html>
          <section style={{ height: "100vh" }} />
          <section style={{ height: "100vh" }} />
          <section style={{ height: "100vh" }} />
          <section style={{ height: "100vh" }} />
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}
