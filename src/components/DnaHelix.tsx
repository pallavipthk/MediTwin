import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

function Helix() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  const spheres: { angle: number; height: number; color: string }[] = []
  const turns = 3
  const count = 60
  const radius = 1.8
  const heightTotal = 5

  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 2 * turns
    const y = t * heightTotal - heightTotal / 2
    spheres.push({ angle, height: y, color: '#4fa880' })
    spheres.push({ angle: angle + Math.PI, height: y, color: '#4a8fd9' })
  }

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4fa880" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#4a8fd9" />

      {spheres.map((s, i) => (
        <mesh
          key={i}
          position={[Math.cos(s.angle) * radius, s.height, Math.sin(s.angle) * radius]}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {Array.from({ length: count - 1 }).map((_, i) => {
        const t1 = i / count
        const t2 = (i + 1) / count
        const a1 = t1 * Math.PI * 2 * turns
        const a2 = t2 * Math.PI * 2 * turns
        const y1 = t1 * heightTotal - heightTotal / 2
        const y2 = t2 * heightTotal - heightTotal / 2

        const p1: [number, number, number] = [
          Math.cos(a1) * radius, y1, Math.sin(a1) * radius,
        ]
        const p2: [number, number, number] = [
          Math.cos(a2) * radius, y2, Math.sin(a2) * radius,
        ]
        const p3: [number, number, number] = [
          Math.cos(a2 + Math.PI) * radius, y2, Math.sin(a2 + Math.PI) * radius,
        ]
        const p4: [number, number, number] = [
          Math.cos(a1 + Math.PI) * radius, y1, Math.sin(a1 + Math.PI) * radius,
        ]

        return (
          <group key={`rung-${i}`}>
            <Rung p1={p1} p2={p4} />
            <Rung p1={p2} p2={p3} />
          </group>
        )
      })}
    </group>
  )
}

function Rung({ p1, p2 }: { p1: [number, number, number]; p2: [number, number, number] }) {
  const v1 = new THREE.Vector3(...p1)
  const v2 = new THREE.Vector3(...p2)
  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5)
  const dir = new THREE.Vector3().subVectors(v2, v1)
  const dist = dir.length()
  dir.normalize()
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0), dir,
  )

  return (
    <mesh position={mid} quaternion={quat} scale={[1, dist, 1]}>
      <cylinderGeometry args={[0.02, 0.02, 1, 4]} />
      <meshStandardMaterial color="#ffffff" opacity={0.2} transparent emissive="#ffffff" emissiveIntensity={0.05} />
    </mesh>
  )
}

export default function DnaHelix() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <Helix />
      </Canvas>
    </div>
  )
}
