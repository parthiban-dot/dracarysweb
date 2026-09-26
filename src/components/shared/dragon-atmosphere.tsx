import Image from "next/image";
import logoImage from "../../../public/dracarys-logo.jpg";

export function DragonAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] bg-[#05050a] overflow-hidden" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
      
      {/* Subtle Hex Texture Background */}
      <div className="absolute inset-0 scale-texture opacity-[0.03]" />
      
      {/* 
        PERFORMANCE FIX: 
        Replaced expensive CSS `blur-[150px]` with zero-cost CSS radial gradients.
        Reverted colors back to Primary (Blue) and Secondary (Violet) to match the UI theme perfectly.
      */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] opacity-30 animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          animationDuration: '8s' 
        }}
      />
      
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] opacity-30 animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          animationDuration: '10s' 
        }}
      />
      
      {/* The DRACARYS Dragon Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] mix-blend-screen w-[800px] max-w-[150vw] aspect-square flex items-center justify-center pointer-events-none">
        <Image 
          src={logoImage} 
          alt="DRACARYS Background Theme" 
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>

    </div>
  );
}