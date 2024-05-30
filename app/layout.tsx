import "the-new-css-reset/css/reset.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
   title: "blankcanvas | 🎨 Blank canvas for WebGL",
   description: "🎨 Blank canvas for WebGL",
};

import Canvas from "./BlankCanvas";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" style={{ height: "100svh", overflow: "hidden" }}>
         <body className={inter.className}>
            <Canvas>{children}</Canvas>
         </body>
      </html>
   );
}

export { metadata };
