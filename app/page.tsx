export default function Home() {
   // return null;
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100svh",
         }}>
         <button
            style={{
               color: "black",
               fontSize: "14px",
               width: "400px",
               height: "80px",
               backgroundColor: "rgba(255,255,255,1)",
               textAlign: "center",
               cursor: "pointer",
               pointerEvents: "auto",
               mixBlendMode: "difference",
            }}>
            UI (you can pointer over)
         </button>
      </div>
   );
}
