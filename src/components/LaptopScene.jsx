import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Laptop() {
  const { scene } = useGLTF('/models/laptop.glb')
  return <primitive object={scene} />
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