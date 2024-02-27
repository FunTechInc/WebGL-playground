import "the-new-css-reset/css/reset.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
   title: "blankcanvas | 🎨 Blank canvas for WebGL",
   description: "🎨 Blank canvas for WebGL",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   );
}

export { metadata };
