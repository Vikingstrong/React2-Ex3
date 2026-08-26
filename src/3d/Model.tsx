import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Model(props:any){
    const {scene} = useGLTF('/credit_card.glb')
    const ref = useRef<THREE.Group>(null!)

    useFrame((state) => {
    const targetY = state.pointer.x * Math.PI * 0.3 
    const targetX = -state.pointer.y * Math.PI * 0.15 

    
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.00)
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetX, 0.05)
  })

    return <primitive ref={ref} object={scene} {...props} />
}

export default function Viewer() {
  return (
    <div className='w-full h-100'>
        <Canvas camera={{ position: [0, 0, 0], fov: 10 }}>
          <Stage environment="city" intensity={5}>
            <Model scale={1} />
          </Stage>
        </Canvas>
    </div>
  )
}


useGLTF.preload('/credit_card.glb')