import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

function Laptop() {
  const { scene } = useGLTF('/models/laptop.glb')
  const pivotRef = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let screenMesh, keyboardMesh
    scene.traverse((child) => {
      if (child.name.includes('Screen')) screenMesh = child
      if (child.name.includes('Keyboard')) keyboardMesh = child
    })

    if (screenMesh && keyboardMesh) {
      const screenBox = new THREE.Box3().setFromObject(screenMesh)
      const keyboardBox = new THREE.Box3().setFromObject(keyboardMesh)

      const pivot = new THREE.Object3D()
      pivot.position.set(
        screenBox.min.x + (screenBox.max.x - screenBox.min.x) / 2,
        screenBox.min.y,
        Math.min(screenBox.max.z, keyboardBox.max.z)
      )

      scene.add(pivot)
      pivot.attach(screenMesh)
      pivotRef.current = pivot
    }
  }, [scene])

  useEffect(() => {
    if (pivotRef.current) {
      gsap.to(pivotRef.current.rotation, {
        x: isOpen ? -Math.PI / 2.2 : 0,
        duration: 1.2,
        ease: 'power3.inOut',
      })
    }
  }, [isOpen])

  return (
    <>
      <primitive object={scene} />
      <mesh
        position={[0.06, 0.05, -0.15]}
        onClick={() => setIsOpen(v => !v)}
        visible={false}
      >
        <boxGeometry args={[0.05, 0.05, 0.05]} />
      </mesh>
    </>
  )
}

export default function LaptopScene() {
  return (
    <Canvas camera={{ position: [0.6, 0.6, 1.6], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 2]} intensity={2} />
      <directionalLight position={[-2, 1, -1]} intensity={0.4} />
      <Environment preset="city" />
      <Laptop />
      <OrbitControls />
    </Canvas>
  )
}