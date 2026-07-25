import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { forwardRef, useImperativeHandle } from 'react'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'


// const Laptop = forwardRef(function Laptop(props, ref) {
//   const { scene } = useGLTF('/models/laptop.glb')
//   const pivotRef = useRef()

//   const CLOSED_ANGLE = Math.PI / 4
//   const OPEN_ANGLE = -Math.PI / 3

//   useImperativeHandle(ref, () => ({
//     setOpenProgress: (progress) => {
//       if (pivotRef.current) {
//         pivotRef.current.rotation.x = gsap.utils.interpolate(CLOSED_ANGLE, OPEN_ANGLE, progress)
//       }
//     },
//   }))

// useEffect(() => {
//   let screenMeshes = []
//   let keyboardMesh

//   scene.traverse((child) => {
//     if (child.isMesh) {
//       if (child.name.includes('Screen')) screenMeshes.push(child)
//       if (child.name.includes('Keyboard')) keyboardMesh = child
//     }
//   })

//   if (screenMeshes.length && keyboardMesh) {
//     const screenBox = new THREE.Box3()
//     screenMeshes.forEach((mesh) => screenBox.union(new THREE.Box3().setFromObject(mesh)))
//     const keyboardBox = new THREE.Box3().setFromObject(keyboardMesh)

//     const pivot = new THREE.Object3D()
//     pivot.position.set(
//       screenBox.min.x + (screenBox.max.x - screenBox.min.x) / 2,
//       screenBox.min.y,
//       Math.min(screenBox.max.z, keyboardBox.max.z)
//     )

//     scene.add(pivot)
//   screenMeshes.forEach((mesh) => pivot.attach(mesh))
//   pivot.rotation.x = CLOSED_ANGLE   //closed on mount
//   pivotRef.current = pivot
//   }
// }, [scene])

//   return <primitive object={scene} />
// })
const Laptop = forwardRef(function Laptop(props, ref) {
  const { scene } = useGLTF('/models/laptop.glb')
  const pivotRef = useRef()
  const groupRef = useRef()

  const CLOSED_ANGLE = Math.PI / 4
  const OPEN_ANGLE = -Math.PI / 3

  const START_TURN = Math.PI / 2.5   // sideways angle
  const END_TURN = 0                 // facing the camera

  useImperativeHandle(ref, () => ({
    setOpenProgress: (progress) => {
      if (pivotRef.current) {
        pivotRef.current.rotation.x = gsap.utils.interpolate(CLOSED_ANGLE, OPEN_ANGLE, progress)
      }
      if (groupRef.current) {
        groupRef.current.rotation.y = gsap.utils.interpolate(START_TURN, END_TURN, progress)
      }
    },
  }))


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


  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
})
const LaptopScene = forwardRef(function LaptopScene(props, ref) {
  return (
    <Canvas camera={{ position: [0.6, 0.6, 1.6], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 2]} intensity={2} />
      <directionalLight position={[-2, 1, -1]} intensity={0.4} />
      <Environment preset="city" />
      <Laptop ref={ref} />
      <OrbitControls enabled={false} />
    </Canvas>
  )
})

export default LaptopScene