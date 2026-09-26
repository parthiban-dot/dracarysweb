import Image from "next/image";
import logoImage from "../../../public/dracarys-logo.jpg";

export function DragonAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] bg-black overflow-hidden">
      
      {/* Subtle Hex Texture Background */}
      <div className="absolute inset-0 scale-texture opacity-[0.03]" />
      
      {/* Fiery atmospheric orbs matching the dragon logo */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      
      {/* The DRACARYS Dragon Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] mix-blend-screen w-[1000px] max-w-[150vw] aspect-square flex items-center justify-center">
        <Image 
          src={logoImage} 
          alt="DRACARYS Background Theme" 
          fill
          className="object-contain"
          priority
        />
      </div>

    </div>
  );
}