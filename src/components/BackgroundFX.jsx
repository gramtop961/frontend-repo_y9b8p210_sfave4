import React, { useEffect, useRef } from 'react';

// Subtle particles + glow auras that respect themes
const BackgroundFX = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.7 + 0.2,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const themeColors = {
      calm: 'rgba(147,197,253,', // blue-300
      neon: 'rgba(244,114,182,', // pink-400
      matrix: 'rgba(74,222,128,', // green-400
      sakura: 'rgba(251,113,133,', // rose-400
      retro: 'rgba(250,204,21,', // yellow-400
    };

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const base = themeColors[theme] || themeColors.calm;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `${base}${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* soft radial auras */}
      <div className="absolute inset-0 mix-blend-screen">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full blur-3xl opacity-30 bg-fuchsia-500" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full blur-3xl opacity-25 bg-cyan-400" />
      </div>
    </div>
  );
};

export default BackgroundFX;
