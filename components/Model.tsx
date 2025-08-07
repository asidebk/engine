import { Environment, Html, OrbitControls, useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/robot_playground.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF("/robot_playground.glb")
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (!actions) return

    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().play() // play from start
        action.paused = false // not controlled by scroll
      }
    })
  }, [actions])

  return (
    <>
      <group ref={group}>
        <primitive object={scene} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.3} />
      <Environment preset="sunset" />
    </>
  )
}
