"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls } from "@react-three/drei"

function Loader() {
  const { progress, active } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function Scene() {
  return (
     <Canvas>
      {/* Enable scroll with 1 or more pages */}
      <ScrollControls pages={4} damping={0.1}>
        <Model />
      </ScrollControls>
    </Canvas>
  )
}
 