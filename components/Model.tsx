import { Environment, Html, OrbitControls, useAnimations, useGLTF, useScroll } from "@react-three/drei"
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
      const offset = scroll.offset

      Object.values(actions).forEach((action) => {
        if (action) {
          const duration = action.getClip().duration
        action.time = Math.min(duration, duration * offset)

        }
      })
    })

    const offset = scroll?.offset ?? 0

    return (
      <>
        <group ref={group}>
          <primitive object={scene} />
        </group>

        {/* Scroll offset debug display */}
        <Html>
          <div
            style={{
              position: "fixed",
              bottom: 10,
              left: 10,
              background: "white",
              color: "black",
              padding: "5px 10px",
              zIndex: 9999,
              fontSize: "14px",
              borderRadius: "4px",
            }}
          >
            Scroll offset: {offset.toFixed(2)}
          </div>
        </Html>

        <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        <Environment preset="sunset" />
      </>
    )
  }
