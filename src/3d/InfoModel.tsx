import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

interface ModelProps {
  modelPath?: string;
  [key: string]: any;
}

function ModelMesh({ modelPath = '/low_poly_safe.glb', ...props }: ModelProps) {
  const { scene } = useGLTF(modelPath)
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ref.current) {
      const targetY = state.pointer.x * Math.PI * 0.4
      const targetX = -state.pointer.y * Math.PI * 0.15

      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05)
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.05)
    }
  })

  return (
    <group ref={ref} {...props}>
      <primitive object={scene} />
    </group>
  )
}

export default function InfoModelViewer({ modelPath = '/low_poly_safe.glb' }: { modelPath?: string }) {
  return (
    <div className='w-full h-80 sm:h-96 relative flex items-center justify-center'>
      <Suspense fallback={
        <div className="flex items-center justify-center text-slate-500 text-sm animate-pulse">
          Загрузка 3D модели...
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Stage environment="city" intensity={0.9} adjustCamera={1.3}>
            <ModelMesh modelPath={modelPath} />
          </Stage>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            makeDefault
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

try {
  useGLTF.preload('/low_poly_safe.glb')
} catch {
}