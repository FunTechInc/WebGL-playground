"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";

import { useBrush, useNoise } from "@funtech-inc/use-shader-fx";
import { Perf } from "r3f-perf";
import { Float, OrbitControls, PointMaterial } from "@react-three/drei";

import { AmbientLight, DirectionalLight } from "three/webgpu";

extend({
   WebGPUAmbientLight: AmbientLight,
   WebGPUDirectionalLight: DirectionalLight,
});

declare global {
   namespace JSX {
      interface IntrinsicElements {
         webGPUAmbientLight: any;
         webGPUDirectionalLight: any;
      }
   }
}

const Scene = () => {
   const { gl, scene, camera, size, viewport } = useThree();
   const [updateNoise, setNoise, { output: noise }] = useNoise({
      size,
      dpr: 2,
   });
   useFrame((state) => {
      // updateNoise(state);
   });
   return (
      <>
         <webGPUAmbientLight intensity={2} />
         <webGPUDirectionalLight intensity={2} />
         <Float speed={3} rotationIntensity={10} floatIntensity={5}>
            <mesh>
               <boxGeometry args={[1.5, 1.5, 1.5]} />
               <meshStandardMaterial color="hotpink" />
            </mesh>
         </Float>
      </>
   );
};

export default Scene;
