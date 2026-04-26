'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/sam_black_polo.glb');
useGLTF.preload('/sam_white_polo.glb');

function Model({ url, mouse }: { url: string; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const { scene } = useGLTF(url, true);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    const baseRotationY = Math.PI / 2;
    const targetY = baseRotationY + mouse.current.x * 1.2;
    const targetX = -mouse.current.y * 0.5;
    
    // Increased speed factor from 0.06 to 0.15 for more reactivity
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.15;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.15;
    
    // Adjusted y position slightly to center the bust more and move it higher
    groupRef.current.position.y = -0.1 + Math.sin(Date.now() * 0.001) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={[-1.8, 1.8, 1.8]} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function SceneContent({ isDark, mouse }: { isDark: boolean; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  return (
    <>
      {/* Lowered exposure/intensities further */}
      <ambientLight intensity={isDark ? 0.3 : 0.4} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.5 : 0.6} castShadow />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color={isDark ? '#00ff87' : '#00c060'} />
      <directionalLight position={[0, -2, 5]} intensity={0.2} />
      <pointLight position={[0, 3, 2]} intensity={0.3} color={isDark ? '#00ff87' : '#00c060'} />
      <Suspense fallback={null}>
        {/* Use gray polo in light theme */}
        <Model url={isDark ? '/sam_black_polo.glb' : '/sam_gray_polo.glb'} mouse={mouse} />
        {isDark && <ContactShadows position={[0, -1.4, 0]} opacity={0.3} scale={3} blur={2} far={2} />}
        <Environment preset="studio" environmentIntensity={0.2} />
      </Suspense>
    </>
  );
}

export default function AvatarScene({ isDark }: { isDark: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0.2, 3.0], fov: 45 }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <SceneContent isDark={isDark} mouse={mouse} />
      </Canvas>
    </div>
  );
}