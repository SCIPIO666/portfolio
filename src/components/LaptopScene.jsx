import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

function Laptop() {
  const { scene } = useGLTF('/models/laptop.glb')
  return <primitive object={scene} />
}

export default function LaptopScene() {
  return (
<Canvas camera={{ position: [0.6, 0.6, 1.6], fov: 45 }}>
      <ambientLight intensity={1} />
      <Laptop />
      <OrbitControls />
    </Canvas>
  )
}