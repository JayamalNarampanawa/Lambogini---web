import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

const Panel = ({ pos, rot, image, index }) => {
    return (
        <mesh position={pos} rotation={rot}>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial toneMapped={false}>
                <Html distanceFactor={1} transform occlude>
                    <div style={{ width: 480, height: 320, backgroundImage: `url(${image})`, backgroundSize: 'cover', borderRadius: 10 }} />
                </Html>
        </mesh>
    </mesh >
  );
};

const Tunnel = ({ images, onClose }) => {
    const group = useRef();
    useFrame((state, delta) => {
        if (group.current) group.current.rotation.y += delta * 0.02;
    });

    return (
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 6], fov: 60 }}>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <group ref={group}>
                {images.map((img, i) => {
                    const angle = (i / images.length) * Math.PI * 2;
                    const r = 6;
                    const pos = [Math.cos(angle) * r, (i % 2 === 0 ? 0.5 : -0.5), Math.sin(angle) * r * 0.7 * -1];
                    const rot = [0, -angle + Math.PI / 2, 0];
                    return <Panel key={i} pos={pos} rot={rot} image={img.url} index={i} />;
                })}
            </group>
            <Html fullscreen>
                <div className="absolute top-6 right-6 z-50">
                    <button onClick={onClose} className="glass-panel px-4 py-2 rounded-full text-sm">Close</button>
                </div>
            </Html>
        </Canvas>
    );
};

export default Tunnel;
