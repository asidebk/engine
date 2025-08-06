  import { Environment, OrbitControls, useAnimations, useGLTF, useScroll } from "@react-three/drei"
  import { useFrame } from "@react-three/fiber"
  import { useEffect, useRef } from "react"
  import { Group } from "three"

  useGLTF.preload("/robot_playground.glb")

  export default function Model() {
    const group = useRef<Group>(null)
    const { scene, animations } = useGLTF("/robot_playground.glb")
    const { actions } = useAnimations(animations, scene)
    const scroll = useScroll()

useEffect(() => {
  if (!actions) return

  Object.values(actions).forEach((action) => {
    if (action) {
      action.play()
      action.paused = true
    }
  })
}, [actions])


useFrame(() => {
  if (!actions) return

  Object.values(actions).forEach((action) => {
    if (action) {
      const duration = action.getClip().duration
      action.time = (duration * scroll.offset) / 4
    }
  })
})



    return (
      <>
        {/* Main scene group */}
        <group ref={group}>
          <primitive object={scene} />
        </group>

        {/* Nice camera controls */}
        <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />

        {/* Basic three-point lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />

        {/* Optional: HDR environment lighting */}
        <Environment preset="sunset" />
        {/* other presets: "city", "studio", "warehouse", "night", "dawn" */}
      </>
    )
  }
