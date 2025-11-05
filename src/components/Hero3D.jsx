import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = ({ onGuide }) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 via-[#0b0f1a] to-black shadow-xl">
      <Spline
        scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Soft gradient aura overlay - do not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.25),transparent_60%)]" />

      {/* Headline + CTA */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-5 md:p-6 shadow-2xl max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            SAGA-AI // Sagar Mahajan
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-300 leading-relaxed">
            Where AI meets emotion — and code becomes poetry. Calm futurism, soft neon, and a mentor that listens.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onGuide}
              className="px-4 py-2 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-400/40 text-fuchsia-200 transition-colors"
            >
              Guide me
            </button>
            <span className="text-xs text-slate-400">Type "help" in the terminal to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
