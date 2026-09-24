
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";
import { LiquidGlass } from "@/components/shared/liquid-glass";

export function AboutHero3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto py-12 md:py-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Floating Hero Text */}
        <div 
          style={{ transform: "translateZ(100px)" }} 
          className="text-center mb-16 relative z-20 pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold heading-dragon mb-6 leading-tight drop-shadow-2xl text-white">
            Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Classroom</span>.
          </h1>
          <p 
            style={{ transform: "translateZ(60px)" }} 
            className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
          >
            DRACARYS is a student-led technology organization built on a singular vision: 
            To forge academic potential into production-ready engineering excellence.
          </p>
        </div>

        {/* 3D LiquidGlass Card */}
        <div 
          style={{ transform: "translateZ(40px)" }} 
          className="w-full relative z-10"
        >
          <LiquidGlass heavy className="p-8 md:p-12 border-white/20 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12" style={{ transform: "translateZ(20px)" }}>
              <div style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">The Community Motive</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  The inception of DRACARYS came from a shared frustration: academic projects rarely reflect the rigorous demands of the actual tech industry. We formed this collective to act as a bridge. 
                </p>
                <p className="text-white/60 leading-relaxed">
                  By bringing together the most passionate developers, designers, and architects, we created a space where members don't just learn syntax—they learn system design, production deployment, and collaborative engineering. We rise together.
                </p>
              </div>
              
              <div style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">Engineering Innovation</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Our innovation lies in our execution. We integrate cutting-edge domains like Generative AI, Computer Vision, and Web3 into highly stable, scalable full-stack architectures. 
                </p>
                <p className="text-white/60 leading-relaxed">
                  We don't use templates. We build bespoke design systems. We don't manually deploy. We rely on automated pipelines and container orchestration. DRACARYS operates at the bleeding edge, ensuring every member is over-prepared for the modern technology landscape.
                </p>
              </div>
            </div>

            {/* Glowing inner orb */}
            <div 
              style={{ transform: "translateZ(10px)" }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"
            />
          </LiquidGlass>
        </div>
        
      </motion.div>
    </div>
  );
}
