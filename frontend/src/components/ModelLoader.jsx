import React from 'react';
import { useGLTF } from '@react-three/drei';

// Simple wrapper to load a GLTF at /models/car.glb
// Falls back to null if the file is missing or fails to load.
const ModelLoader = ({ rotationTarget, scale = 1 }) => {
  try {
    const gltf = useGLTF('/models/car.glb');
    return <primitive object={gltf.scene} scale={scale} />;
  } catch (e) {
    // If unable to load (file missing), return null to allow fallback
    return null;
  }
};

export default ModelLoader;
