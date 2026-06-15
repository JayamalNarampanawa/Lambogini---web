import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import ModelLoader from './ModelLoader';
import * as THREE from 'three';
import { useScroll } from '@/lib/ScrollContext';

const ProceduralCar = ({ rotationTarget }) => {
    const ref = useRef();
    useFrame((state, delta) => {
        if (ref.current) {
            // smooth follow pointer target rotation
            ref.current.rotation.y += (rotationTarget.current - ref.current.rotation.y) * 0.05;
        }
    });

    return (
        <group ref={ref} position={[0, 0.6, 0]}>
            {/* Main body */}
            <mesh castShadow>
                <boxGeometry args={[4.2, 0.9, 1.9]} />
                <meshPhysicalMaterial color="#0b0b0b" metalness={0.95} roughness={0.12} clearcoat={1} />
            </mesh>

            {/* Roof/Canopy */}
            <mesh position={[0, 0.9, 0]} castShadow>
                <boxGeometry args={[2.1, 0.5, 1.4]} />
                <meshPhysicalMaterial color="#111111" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
            </mesh>

            {/* Spoiler */}
            <mesh position={[-2.1, 1.05, 0]} castShadow>
                <boxGeometry args={[0.35, 0.12, 1.9]} />
                <meshPhysicalMaterial color="#0b0b0b" metalness={0.95} roughness={0.12} />
            </mesh>

            {/* Wheels */}
            {[-1.4, 1.4].map((x, i) => (
                <group key={i} position={[x, 0, 0.95]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.45, 0.45, 0.36, 32]} />
                        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
                    </mesh>
                </group>
            ))}
            {[-1.4, 1.4].map((x, i) => (
                <group key={`r${i}`} position={[x, 0, -0.95]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.45, 0.45, 0.36, 32]} />
                        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const Hotspot = ({ position, label, onClick }) => {
    return (
        <mesh position={position} onClick={() => onClick(label)}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#E4FF1A" emissive="#E4FF1A" emissiveIntensity={0.6} metalness={1} roughness={0.2} transparent opacity={0.9} />
        </mesh>
    );
};

const Scene = ({ onHotspot }) => {
    const rotationTarget = useRef(0);
    const { scene, camera } = useThree();
    const { progress } = useScroll();
    const scrollRef = useRef(0);

    // camera positions for sections: hero -> exterior -> performance -> interior
    const cameraPositions = useRef([
        new THREE.Vector3(6, 2.2, 6),
        new THREE.Vector3(8, 2.0, 3.5),
        new THREE.Vector3(5, 1.6, 5),
        new THREE.Vector3(6, 1.2, 9)
    ]).current;

    useEffect(() => {
        scene.fog = new THREE.Fog('#000000', 6, 22);
    }, [scene]);

    // mouse rotation handler
    useEffect(() => {
        const handleMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            rotationTarget.current = -x * 0.6;
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // use ScrollContext progress instead of direct window scroll
    useEffect(() => {
        scrollRef.current = progress;
    }, [progress]);

    // simple floating particles
    const particles = useRef();
    useFrame((state, delta) => {
        if (particles.current) {
            particles.current.rotation.y += delta * 0.02;
        }
        // scroll-driven camera interpolation (from ScrollContext)
        const t = scrollRef.current;
        const segments = cameraPositions.length - 1;
        const pct = Math.min(Math.max(t * segments, 0), segments);
        const i = Math.floor(pct);
        const alpha = pct - i;
        const from = cameraPositions[i] || cameraPositions[cameraPositions.length - 1];
        const to = cameraPositions[i + 1] || from;
        const target = new THREE.Vector3().copy(from).lerp(to, alpha);
        camera.position.lerp(target, 0.06);
        camera.lookAt(0, 0.6, 0);
    });

    return (
        <>
            <ambientLight intensity={0.25} />
            <spotLight position={[8, 10, 6]} angle={0.25} intensity={2.2} penumbra={1} castShadow />
            <spotLight position={[-8, 10, -6]} angle={0.25} intensity={1.6} penumbra={1} />

            {/* Try to load a GLTF model from /public/models/car.glb; fallback to ProceduralCar when not available */}
            <ModelLoader rotationTarget={rotationTarget} scale={1.2} />
            <ProceduralCar rotationTarget={rotationTarget} />

            {/* Hotspots */}
            <Hotspot position={[1.8, 0.6, 0.9]} label="Wheels" onClick={onHotspot} />
            <Hotspot position={[2.2, 0.6, 0]} label="Engine" onClick={onHotspot} />
            <Hotspot position={[0.2, 1.0, 0.4]} label="Interior" onClick={onHotspot} />
            <Hotspot position={[1.8, 0.6, -0.9]} label="Exhaust" onClick={onHotspot} />

            {/* Reflective floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="#060606" metalness={0.9} roughness={0.05} />
            </mesh>

            {/* Particle ring */}
            <group ref={particles}>
                {[...Array(60)].map((_, i) => {
                    const angle = (i / 60) * Math.PI * 2;
                    const r = 6 + Math.random() * 4;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * r, -0.2 + Math.random() * 1.2, Math.sin(angle) * r]}>
                            <sphereGeometry args={[0.03, 6, 6]} />
                            <meshStandardMaterial color="#E4FF1A" emissive="#E4FF1A" emissiveIntensity={0.2} />
                        </mesh>
                    );
                })}
            </group>

            <Environment preset="night" />
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} />
            <PerspectiveCamera makeDefault position={[6, 2.2, 6]} fov={40} />
        </>
    );
};

const Showroom3D = ({ onHotspot }) => {
    return (
        <Canvas shadows gl={{ antialias: true }} camera={{ position: [6, 2.2, 6], fov: 40 }} className="w-full h-full">
            <Scene onHotspot={onHotspot || (() => { })} />
        </Canvas>
    );
};

export default Showroom3D;
