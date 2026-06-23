'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Timer, Target, TrendingUp, Users, Sparkles, Zap, Star } from 'lucide-react';

// Node data - nanti bisa diganti dengan fitur PagePulse
const nodes = [
  { id: 1, x: 15, y: 20, icon: BookOpen, label: 'Track Books', color: 'from-amber-400 to-orange-500', glow: 'rgba(251,191,36,0.6)' },
  { id: 2, x: 55, y: 10, icon: Timer, label: 'Reading Timer', color: 'from-rose-400 to-pink-500', glow: 'rgba(244,114,182,0.6)' },
  { id: 3, x: 75, y: 40, icon: Target, label: 'Set Goals', color: 'from-violet-400 to-purple-500', glow: 'rgba(167,139,250,0.6)' },
  { id: 4, x: 50, y: 65, icon: TrendingUp, label: 'Stats', color: 'from-sky-400 to-blue-500', glow: 'rgba(96,165,250,0.6)' },
  { id: 5, x: 20, y: 55, icon: Users, label: 'Community', color: 'from-emerald-400 to-teal-500', glow: 'rgba(52,211,153,0.6)' },
  { id: 6, x: 40, y: 35, icon: Sparkles, label: 'AI Insights', color: 'from-fuchsia-400 to-purple-500', glow: 'rgba(232,121,249,0.6)' },
];

// Garis koneksi antar node
const connections = [
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [1, 3], [2, 4], [3, 5],
];

// Particle yang berjalan di sepanjang garis
function MovingParticle({ 
  x1, y1, x2, y2, delay, duration, color 
}: { 
  x1: number; y1: number; x2: number; y2: number; 
  delay: number; duration: number; color: string;
}) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full shadow-lg"
      style={{
        background: color,
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
        animation: `moveAlongLine ${duration}s ${delay}s linear infinite`,
        '--x1': `${x1}%`,
        '--y1': `${y1}%`,
        '--x2': `${x2}%`,
        '--y2': `${y2}%`,
      } as React.CSSProperties}
    />
  );
}

export default function ConnectionDiagram() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] lg:h-[550px] overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(251,191,36,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.5)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Cursor glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.5), transparent)',
        }}
      />

      {/* SVG untuk garis koneksi */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          {nodes.map((node) => (
            <radialGradient key={`grad-${node.id}`} id={`glow-${node.id}`}>
              <stop offset="0%" stopColor={node.glow} stopOpacity="0.8" />
              <stop offset="100%" stopColor={node.glow} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Garis koneksi */}
        {connections.map(([from, to], i) => {
          const n1 = nodes[from - 1];
          const n2 = nodes[to - 1];
          const isActive = hoveredNode === from || hoveredNode === to;
          
          return (
            <g key={i}>
              {/* Glow line (di belakang) */}
              <line
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isActive ? 'rgba(251,191,36,0.4)' : 'rgba(251,191,36,0.1)'}
                strokeWidth={isActive ? 3 : 1}
                filter={isActive ? 'url(#line-glow)' : undefined}
                className="transition-all duration-500"
              />
              {/* Animated dash */}
              <line
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isActive ? 'rgba(251,191,36,0.8)' : 'rgba(251,191,36,0.3)'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeDasharray="6 12"
                className="transition-all duration-500 animate-dash"
              />
            </g>
          );
        })}
      </svg>

      {/* Moving particles */}
      {connections.map(([from, to], i) => {
        const n1 = nodes[from - 1];
        const n2 = nodes[to - 1];
        const isActive = hoveredNode === from || hoveredNode === to;
        if (!isActive) return null;
        
        return (
          <MovingParticle
            key={i}
            x1={n1.x} y1={n1.y}
            x2={n2.x} y2={n2.y}
            delay={i * 0.3}
            duration={2 + (i % 3)}
            color={nodes[hoveredNode! - 1]?.glow || '#fbbf24'}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;
        const isConnected = hoveredNode !== null && connections.some(
          ([a, b]) => (a === node.id && b === hoveredNode) || (b === node.id && a === hoveredNode)
        );

        return (
          <div
            key={node.id}
            className="absolute transition-all duration-500 ease-out cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : isConnected ? 1.1 : 1})`,
              zIndex: isHovered ? 20 : 10,
              opacity: hoveredNode !== null && !isHovered && !isConnected ? 0.3 : 1,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
          >
            {/* Glow ring */}
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
              }`}
              style={{ background: node.glow }}
            />

            {/* Node circle */}
            <div
              className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-2xl transition-all duration-500 ${
                isHovered 
                  ? 'shadow-[0_0_40px_rgba(251,191,36,0.5)] brightness-125 scale-110' 
                  : 'shadow-lg shadow-amber-200/20'
              }`}
            >
              <Icon className={`w-6 h-6 lg:w-7 lg:h-7 text-white transition-all duration-300 ${
                isHovered ? 'scale-110 drop-shadow-lg' : ''
              }`} />
              
              {/* Inner shine */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-transparent" />
            </div>

            {/* Label */}
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <span className="text-xs lg:text-sm font-extrabold text-[#3d3530] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-100 shadow-lg">
                {node.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Center label */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}>
        <div className="bg-white/60 backdrop-blur-2xl border-2 border-amber-200/60 rounded-3xl px-6 py-3 shadow-2xl shadow-amber-100/30">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
            <span className="text-lg font-black text-[#3d3530] tracking-tight">PagePulse</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-300/50 animate-twinkle" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          0% { stroke-dashoffset: 18; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes moveAlongLine {
          0% {
            left: var(--x1);
            top: var(--y1);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            left: var(--x2);
            top: var(--y2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}