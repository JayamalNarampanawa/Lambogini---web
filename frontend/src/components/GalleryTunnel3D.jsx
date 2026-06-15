import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Panel = ({ pos, rot, image }) => {
    const texture = useLoader(THREE.TextureLoader, image);
    return (
        <mesh position={pos} rotation={rot}>
            <planeGeometry args={[3.2, 2.2]} />
            <meshStandardMaterial map={texture} toneMapped={false} metalness={0.1} roughness={0.2} />
        </mesh>
    );
};

const InnerScene = ({ images }) => {
    const group = useRef();
    useFrame((state, delta) => {
        if (group.current) group.current.rotation.y += delta * 0.02;
    });

    return (
        <group ref={group}>
            {images.map((img, i) => {
                const angle = (i / images.length) * Math.PI * 2;
                const r = 6;
                const pos = [Math.cos(angle) * r, (i % 2 === 0 ? 0.5 : -0.5), Math.sin(angle) * r * 0.7 * -1];
                const rot = [0, -angle + Math.PI / 2, 0];
                return <Panel key={i} pos={pos} rot={rot} image={img.url} index={i} />;
            })}
        </group>
    );
};

const Tunnel = ({ images, onClose }) => {
    if (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('enable3d') === 'false') {
        return null;
    }

    return (
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 6], fov: 60 }}>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <InnerScene images={images} />
        </Canvas>
    );
};

export default Tunnel;
