import { useRef, useMemo, useState, useEffect, Suspense, lazy } from 'react';

const ThreeCanvas = lazy(() => import('./hero-3d-canvas'));

function CssParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow linear infinite; }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function CssOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[440px] h-[440px] hidden md:block"
      >
        <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-[12%] rounded-full border border-amber-400/15 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <div className="absolute inset-[24%] rounded-full border border-orange-500/20 animate-spin-slow" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-[38%] rounded-full bg-amber-400/5 border border-amber-400/30 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400/15 to-orange-600/10 blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
      </div>
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-orange-600/5 blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
    </div>
  );
}

export function Hero3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <CssParticles />
      <CssOrbs />
      {webglSupported && (
        <Suspense fallback={null}>
          <ThreeCanvas />
        </Suspense>
      )}
    </div>
  );
}
