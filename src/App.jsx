import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import Terminal from './components/Terminal';
import GUIPortfolio from './components/GUIPortfolio';
import BackgroundFX from './components/BackgroundFX';
import { X } from 'lucide-react';

const themeClasses = {
  calm: 'from-slate-950 via-[#0b0f1a] to-black',
  neon: 'from-[#100516] via-[#0a0014] to-black',
  matrix: 'from-black via-[#02140a] to-black',
  sakura: 'from-[#16060c] via-[#11030a] to-black',
  retro: 'from-[#100f03] via-[#0a0a00] to-black',
};

export default function App() {
  const [theme, setTheme] = useState('calm');
  const [gui, setGui] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const gradient = useMemo(() => themeClasses[theme] || themeClasses.calm, [theme]);

  const GuideModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={() => setGuideOpen(false)} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-6 text-slate-200">
        <button onClick={() => setGuideOpen(false)} className="absolute right-3 top-3 p-1 rounded-md hover:bg-white/5"><X size={16}/></button>
        <h3 className="text-xl font-semibold text-white">SAGA-AI — gentle mentor</h3>
        <p className="mt-2 text-slate-300 text-sm">Ask anything about Sagar, projects, or your own path. A calm guide will answer.</p>
        <div className="mt-4 space-y-3 text-sm">
          <p>• What draws you toward AI? • Which project made you proud? • What do you want to build next?</p>
          <p className="text-fuchsia-300">I listen, then suggest a small next step. One clear action, tonight.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b ${gradient} text-slate-100 relative`}> 
      <BackgroundFX theme={theme} />
      <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-10">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-400">Sagar Mahajan</div>
            <div className="text-lg font-semibold text-white">Calm Cyber Portfolio</div>
          </div>
          <div className="flex items-center gap-2">
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <option value="calm">calm</option>
              <option value="neon">neon</option>
              <option value="matrix">matrix</option>
              <option value="sakura">sakura</option>
              <option value="retro">retro</option>
            </select>
            <button onClick={() => setGui(g => !g)} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm">{gui ? 'Terminal' : 'GUI'}</button>
          </div>
        </header>

        <div className="mt-6">
          <Hero3D onGuide={() => setGuideOpen(true)} />
        </div>

        {gui ? (
          <GUIPortfolio />
        ) : (
          <Terminal onEnterGUI={() => setGui(true)} onGuide={() => setGuideOpen(true)} onSetTheme={setTheme} />
        )}

        <footer className="mt-10 text-center text-slate-400 text-sm">
          Building humane intelligence, one line at a time.
        </footer>
      </div>

      {guideOpen && <GuideModal />}
    </div>
  );
}
