"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import Scene from "./Scene";

// ↓WebGPU
import { WebGPURenderer } from "three/webgpu";

/*===============================================
↓WebWorker
===============================================*/
// import { lazy } from "react";
// import { Canvas } from "@funtech-inc/r3f-offscreen";
// // This is the fallback component that will be rendered on the main thread
// // This will happen on systems where OffscreenCanvas is not supported
// const Scene = lazy(() => import("./Scene"));
// // This is the worker thread that will render the scene
// const worker = new Worker(new URL("./worker.tsx", import.meta.url), {
//    type: "module",
// });

const BlankCanvas = ({
   eventSource,
}: {
   eventSource?: HTMLElement | React.MutableRefObject<HTMLElement> | undefined;
}) => {
   const [frameloop, setFrameLoop] = useState<
      "never" | "always" | "demand" | undefined
   >("never");

   return (
      <Canvas
         eventSource={eventSource}
         eventPrefix="client"
         // ↓WebGPU
         frameloop={frameloop}
         gl={(canvas) => {
            const renderer = new WebGPURenderer({
               canvas: canvas as any,
            });
            renderer.init().then(() => setFrameLoop("always"));
            return renderer;
         }}>
         <Suspense fallback={null}>
            <Scene />
         </Suspense>
         <Stats />
      </Canvas>
      /*===============================================
		↓WebWorker
		===============================================*/
      // <Suspense fallback={null}>
      //    <Canvas
      //       worker={worker}
      //       fallback={<Scene />}
      //       dpr={[1, 2]}
      //       eventSource={eventSource}
      //       eventPrefix="client"
      //    />
      // </Suspense>
   );
};

const FullHeightContainer = ({
   children,
   style,
}: {
   children?: React.ReactNode;
   style?: React.CSSProperties;
}) => {
   return (
      <div
         style={{
            width: "100vw",
            height: "calc(var(--stable-lvh) * 100)",
            position: "fixed",
            inset: 0,
            ...(style || {}),
         }}>
         {children ? children : null}
      </div>
   );
};

const CanvasWrapper = ({ children }: { children: React.ReactNode }) => {
   const ref =
      useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
   return (
      <div ref={ref}>
         {/* If children is less than 100svh, the target cannot be obtained, so add a div for obtaining the target. */}
         <FullHeightContainer />
         <div
            style={{
               pointerEvents: "none",
               position: "relative",
            }}>
            <FullHeightContainer style={{ zIndex: -100000000 }}>
               <BlankCanvas eventSource={ref} />
            </FullHeightContainer>
            {children}
         </div>
      </div>
   );
};

export default CanvasWrapper;
