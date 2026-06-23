'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Timer, Target, TrendingUp, Users, Sparkles, Zap, Star } from 'lucide-react';

const nodes = [
  { id: 1, x: 12, y: 18, icon: BookOpen, label: 'Track Books', color: 'from-amber-400 to-orange-500', glow: 'rgba(251,191,36,0.6)', lineColor: '#f59e0b', available: true },
  { id: 2, x: 50, y: 8, icon: Timer, label: 'Reading Timer', color: 'from-rose-400 to-pink-500', glow: 'rgba(244,114,182,0.6)', lineColor: '#f472b6', available: true },
  { id: 3, x: 78, y: 38, icon: Target, label: 'Set Goals', color: 'from-violet-400 to-purple-500', glow: 'rgba(167,139,250,0.6)', lineColor: '#a78bfa', available: true },
  { id: 4, x: 52, y: 68, icon: TrendingUp, label: 'Stats', color: 'from-sky-400 to-blue-500', glow: 'rgba(96,165,250,0.6)', lineColor: '#60a5fa', available: true },
  { id: 5, x: 18, y: 58, icon: Users, label: 'Community', color: 'from-emerald-400 to-teal-500', glow: 'rgba(52,211,153,0.6)', lineColor: '#34d399', available: true },
  { id: 6, x: 40, y: 34, icon: Sparkles, label: 'AI Insights', color: 'from-fuchsia-400 to-purple-500', glow: 'rgba(232,121,249,0.6)', lineColor: '#e879f9', available: false },
];

const connections = [
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [1, 3], [2, 4], [3, 5],
];

function MovingParticle({ 
  x1, y1, x2, y2, delay, duration, color 
}: { 
  x1: number; y1: number; x2: number; y2: number; 
  delay: number; duration: number; color: string;
}) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: color,
        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
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
      className="relative w-full h-[520px] lg:h-[580px] overflow-visible rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(rgba(251,191,36,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.6)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Cursor glow */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.6), transparent)',
        }}
      />

      {/* SVG garis koneksi */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          {nodes.map((node) => (
            <radialGradient key={`grad-${node.id}`} id={`glow-${node.id}`}>
              <stop offset="0%" stopColor={node.glow} stopOpacity="0.8" />
              <stop offset="100%" stopColor={node.glow} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map(([from, to], i) => {
          const n1 = nodes[from - 1];
          const n2 = nodes[to - 1];
          const isActive = hoveredNode === from || hoveredNode === to;
          
          return (
            <g key={i}>
              <line
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isActive ? 'rgba(251,191,36,0.5)' : 'rgba(251,191,36,0.15)'}
                strokeWidth={isActive ? 4 : 1.5}
                strokeLinecap="round"
                filter={isActive ? 'url(#line-glow)' : undefined}
                className="transition-all duration-500"
              />
              <line
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isActive ? 'rgba(251,191,36,0.9)' : 'rgba(251,191,36,0.3)'}
                strokeWidth={isActive ? 2 : 0.8}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {isActive && (
                <line
                  x1={`${n1.x}%`} y1={`${n1.y}%`}
                  x2={`${n2.x}%`} y2={`${n2.y}%`}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 12"
                  className="animate-dash"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Moving particles */}
      {hoveredNode !== null && connections
        .filter(([from, to]) => from === hoveredNode || to === hoveredNode)
        .map(([from, to], i) => {
          const n1 = nodes[from - 1];
          const n2 = nodes[to - 1];
          
          return [...Array(3)].map((_, j) => (
            <MovingParticle
              key={`${i}-${j}`}
              x1={n1.x} y1={n1.y}
              x2={n2.x} y2={n2.y}
              delay={j * 0.5}
              duration={1.5 + j * 0.3}
              color={nodes[hoveredNode - 1]?.lineColor || '#fbbf24'}
            />
          ));
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;
        const isConnected = hoveredNode !== null && connections.some(
          ([a, b]) => (a === node.id && b === hoveredNode) || (b === node.id && a === hoveredNode)
        );

        // Hitung posisi label biar gak ketimpa
        const labelOffsetY = node.y > 60 ? -60 : node.y < 20 ? 20 : 30;
        const labelOffsetX = node.x > 70 ? -10 : node.x < 20 ? 10 : 0;

        return (
          <div
            key={node.id}
            className="absolute transition-all duration-500 ease-out cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : isConnected ? 1.1 : 1})`,
              zIndex: isHovered ? 20 : 10,
              opacity: hoveredNode !== null && !isHovered && !isConnected ? 0.35 : 1,
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

            {/* Pulse ring */}
            {isHovered && (
              <div 
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{ background: node.glow }}
              />
            )}

            {/* Node circle */}
            <div
              className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-2xl transition-all duration-500 ${
                isHovered 
                  ? 'shadow-[0_0_50px_rgba(251,191,36,0.6)] brightness-125 scale-110' 
                  : 'shadow-lg shadow-amber-200/20 hover:shadow-xl'
              }`}
            >
              <Icon className={`w-6 h-6 lg:w-7 lg:h-7 text-white transition-all duration-300 ${
                isHovered ? 'scale-110 drop-shadow-lg' : ''
              }`} />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-transparent" />
            </div>

            {/* Label - POSISI DINAMIS biar gak ketimpa */}
            <div 
              className="absolute whitespace-nowrap transition-all duration-500 pointer-events-none"
              style={{
                left: `calc(-50% + ${labelOffsetX}px)`,
                top: `${labelOffsetY}px`,
                opacity: isHovered ? 1 : 0,
                transform: `translateY(${isHovered ? 0 : 4}px)`,
              }}
            >
              <span className="text-xs lg:text-sm font-extrabold text-[#3d3530] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-200 shadow-lg inline-flex items-center gap-1.5">
                {node.label}
                {!node.available && (
                  <span className="text-[10px] bg-gradient-to-r from-fuchsia-400 to-purple-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    SOON
                  </span>
                )}
              </span>
            </div>
          </div>
        );
      })}

      {/* Center label */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}>
        <div className="bg-white/70 backdrop-blur-2xl border-2 border-amber-200/60 rounded-3xl px-6 py-3 shadow-2xl shadow-amber-100/30">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
            <span className="text-lg font-black text-[#3d3530] tracking-tight">PagePulse</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-300/50 animate-twinkle" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes moveAlongLine {
          0% {
            left: var(--x1);
            top: var(--y1);
            opacity: 0;
            transform: scale(0.5);
          }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% {
            left: var(--x2);
            top: var(--y2);
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}