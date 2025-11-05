import React, { useMemo, useState } from 'react';
import { Github, Linkedin, Mail, Rocket, Star } from 'lucide-react';

const projects = [
  { title: 'ElderSphere', tag: 'AI', desc: 'Elder care platform with payments and dashboards.', stack: ['Next.js','Node','MongoDB','Razorpay'], glow:'from-fuchsia-400 to-cyan-400' },
  { title: 'Soul Mode', tag: 'Web', desc: 'E-commerce brand: planning, sourcing, identity.', stack: ['Next.js','Tailwind'], glow:'from-pink-400 to-amber-300' },
  { title: 'Sim-Dev', tag: 'App', desc: 'Farmer marketplace for supply-chain fairness.', stack: ['Android','Node','MongoDB'], glow:'from-emerald-400 to-teal-300' },
  { title: 'Stock Vision', tag: 'AI', desc: 'Time-series forecasting and dashboards.', stack: ['Python','Flask','React'], glow:'from-indigo-400 to-sky-300' },
  { title: 'Rasa Assistants', tag: 'AI', desc: 'Production chat assistants with Rasa + Flask/Node.', stack: ['Rasa','Flask','Node'], glow:'from-violet-400 to-fuchsia-300' },
  { title: 'Appointments', tag: 'Web', desc: 'Booking system with admin dashboard and auth.', stack: ['Next.js','MongoDB'], glow:'from-cyan-400 to-blue-300' },
];

const filters = ['All','AI','Web','App','Hackathon'];

const Badge = ({ children }) => (
  <span className="px-2 py-0.5 rounded-md text-xs bg-white/5 border border-white/10 text-slate-300">{children}</span>
);

const Card = ({ p }) => (
  <div className="group relative rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-colors">
    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity bg-gradient-to-br ${p.glow}`} />
    <div className="relative">
      <div className="flex items-center gap-2">
        <Rocket size={16} className="text-fuchsia-300" />
        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
      </div>
      <p className="mt-2 text-slate-300 text-sm">{p.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.stack.map(s => <Badge key={s}>{s}</Badge>)}
      </div>
    </div>
  </div>
);

const GUIPortfolio = () => {
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter(p => p.tag === active), [active]);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Portfolio</h2>
          <p className="text-slate-400 text-sm">Where AI meets emotion — and code becomes poetry.</p>
        </div>
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} className={`px-3 py-1.5 rounded-lg border text-sm backdrop-blur-md transition-colors ${active===f? 'border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => <Card key={p.title} p={p} />)}
      </div>

      <div className="mt-6 flex items-center gap-4 text-slate-300">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
          <Github size={18}/> GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
          <Linkedin size={18}/> LinkedIn
        </a>
        <a href="mailto:sagar@example.com" className="inline-flex items-center gap-2 hover:text-white">
          <Mail size={18}/> Email
        </a>
        <span className="ml-auto inline-flex items-center gap-1 text-amber-300"><Star size={16}/> Calm futurism</span>
      </div>
    </div>
  );
};

export default GUIPortfolio;
