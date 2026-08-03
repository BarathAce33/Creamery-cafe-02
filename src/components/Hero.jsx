import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as DreiSparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ChevronDown, ArrowRight, Star, MapPin } from 'lucide-react';

/* ─── 3D Floating Gold Orbs Scene ─── */
function GoldOrb({ position, scale = 1 }) {
  const meshRef = useRef();
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.12, 1]} />
        <meshStandardMaterial
          color="#E8B931"
          emissive="#E8B931"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  const orbs = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2,
      ],
      scale: 0.5 + Math.random() * 1.2,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 5]} intensity={0.8} color="#E8B931" />
      <pointLight position={[-3, -2, 3]} intensity={0.3} color="#34D399" />

      {orbs.map((orb, i) => (
        <GoldOrb key={i} position={orb.position} scale={orb.scale} />
      ))}

      <DreiSparkles
        count={60}
        scale={10}
        size={2}
        speed={0.4}
        color="#E8B931"
        opacity={0.5}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          intensity={0.8}
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

/* ─── Animated Text ─── */
function AnimatedWord({ children, delay = 0 }) {
  return (
    <span
      className="inline-block animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      {children}
    </span>
  );
}

/* ─── Hero Section ─── */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservation = () => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <HeroScene />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'var(--hero-gradient)' }} />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[1]"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />

      {/* Parallax content layer */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 pb-20"
        style={{
          transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Location Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
          style={{
            background: 'rgba(13, 31, 20, 0.6)',
            border: '1px solid var(--border-gold)',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold" style={{ color: 'var(--text-gold)' }}>
            <Star className="w-3 h-3 fill-current" />
            <span>4.9 Rating</span>
          </div>
          <span className="gold-dot" />
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium" style={{ color: 'var(--text-sub)' }}>
            <MapPin className="w-3 h-3" />
            <span>Peelamedu, Coimbatore</span>
          </div>
        </div>

        {/* Logo Emblem */}
        <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div className="relative group">
            <div
              className="absolute -inset-4 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              style={{ background: 'radial-gradient(circle, rgba(232,185,49,0.4), transparent)' }}
            />
            <img
              src="/logo.jpg"
              alt="Creamery Café Logo"
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-[#E8B931]/50 shadow-2xl object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Main Typography */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-none">
            <span className="gold-shimmer">THE GOLD</span>
            <br />
            <span className="gold-shimmer">STANDARD</span>
          </h1>
          <p className="mt-4 font-serif text-lg sm:text-2xl md:text-3xl italic font-light tracking-wide" style={{ color: 'var(--text-sub)' }}>
            in Milkshakes & Gourmet Café
          </p>
        </div>

        {/* Description */}
        <p
          className="mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-light animate-fade-in-up"
          style={{ color: 'var(--text-sub)', animationDelay: '0.8s', animationFillMode: 'both' }}
        >
          Welcome to <strong style={{ color: 'var(--text-gold)' }}>Creamery Café</strong> — Peelamedu's finest artisanal destination 
          for Lotus Biscoff thickshakes, fresh fruit creams, charcoal burgers, and steamed momos. 
          Handcrafted with passion, served with perfection.
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
          <button
            onClick={scrollToMenu}
            className="group flex items-center gap-3 px-8 py-4 rounded-full btn-gold text-sm font-bold tracking-wide"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToReservation}
            className="flex items-center gap-3 px-8 py-4 rounded-full btn-outline text-sm tracking-wide"
          >
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <button
            onClick={scrollToMenu}
            className="flex flex-col items-center gap-2 group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
              Discover
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: 'var(--text-gold)' }} />
          </button>
        </div>
      </div>
    </section>
  );
}
