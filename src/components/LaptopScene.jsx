import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'


function Laptop() {
  const { scene } = useGLTF('/models/laptop.glb')
  const pivotRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  
  const CLOSED_ANGLE = Math.PI / 4   
  const OPEN_ANGLE = -Math.PI / 3 //60 degrees

useEffect(() => {
  let screenMeshes = []
  let keyboardMesh

  scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name.includes('Screen')) screenMeshes.push(child)
      if (child.name.includes('Keyboard')) keyboardMesh = child
    }
  })

  if (screenMeshes.length && keyboardMesh) {
    const screenBox = new THREE.Box3()
    screenMeshes.forEach((mesh) => screenBox.union(new THREE.Box3().setFromObject(mesh)))
    const keyboardBox = new THREE.Box3().setFromObject(keyboardMesh)

    const pivot = new THREE.Object3D()
    pivot.position.set(
      screenBox.min.x + (screenBox.max.x - screenBox.min.x) / 2,
      screenBox.min.y,
      Math.min(screenBox.max.z, keyboardBox.max.z)
    )

    scene.add(pivot)
  screenMeshes.forEach((mesh) => pivot.attach(mesh))
  pivot.rotation.x = CLOSED_ANGLE   //closed on mount
  pivotRef.current = pivot
  }
}, [scene])

useEffect(() => {
  if (pivotRef.current) {
    gsap.to(pivotRef.current.rotation, {
      x: isOpen ? OPEN_ANGLE : CLOSED_ANGLE,
      duration: 2,
      ease: 'power3.inOut',
    })
  }
}, [isOpen])

 return (
  <primitive
    object={scene}
    onClick={(e) => {
      e.stopPropagation()
      setIsOpen(v => !v)
    }}
  />
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