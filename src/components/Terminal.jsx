import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, Send, TerminalSquare } from 'lucide-react';

const suggestions = [
  'intro', 'help', 'projects', 'ai_builds', 'skills', 'experience', 'prompt_lab', 'hackathon', 'mentor', 'love', 'roadmap', 'future_self', 'build_ai', 'teach_me_ai', 'inspiration', 'theme neon', 'gui()'
];

const banner = `I am SAGA-AI, the narrative twin of Sagar —\n`+
`here to tell his story of building with heart, logic, and imagination.\n`+
`We will explore projects, code, dreams, and the future… together.`;

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const Terminal = ({ onEnterGUI, onGuide, onSetTheme }) => {
  const [history, setHistory] = useState([{ type: 'system', text: banner }]);
  const [input, setInput] = useState('');
  const [pointer, setPointer] = useState(-1);
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' }); }, [history]);

  const handleCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const newEntry = { type: 'user', text: `> ${cmd}` };
    setHistory(h => [...h, newEntry]);

    const say = (text) => setHistory(h => [...h, { type: 'ai', text }]);

    // Commands
    if (cmd === 'help') {
      say('Commands: intro, experience, skills, projects, ai_builds, startup_diary, prompt_lab, certifications, roadmap, hackathon, love, mentor, future_self, build_ai, teach_me_ai, inspiration, clear, theme <name>, gui(), assistant, guide(), play_music, resume, contact, email, linkedin, github');
    } else if (cmd === 'intro') {
      say('Welcome, wanderer of code.\nThis is a warm-cyber terminal, tuned to a calm frequency.\nSagar builds where empathy meets intelligence. Type help to roam.');
    } else if (cmd === 'experience') {
      say('Engineering student → AI builder → Hackathon finalist → Founder mindset.\nFocus: web + AI + human-experience design.\nPassion: blending empathy with intelligence in software.');
    } else if (cmd === 'skills') {
      say('AI, Web, React/Next.js, Node, Python, MongoDB, Tailwind, Rasa, Flask, Android Studio, Prompt Engineering, Razorpay.');
    } else if (cmd === 'projects') {
      say('Featured: ElderSphere • Soul Mode • Sim-Dev • Stock Vision • Rasa Assistants • Appointments');
    } else if (cmd === 'ai_builds') {
      say('AI assistants, conversational agents, prompt systems, guidance copilots.');
    } else if (cmd === 'startup_diary') {
      say('Soul Mode, ElderSphere, Sim-Dev — projects shaped by curiosity and care.');
    } else if (cmd === 'prompt_lab') {
      say('Prompt engineering mastery: structure, persona, chain-of-thought orchestration, safety, and evaluation.');
    } else if (cmd === 'certifications') {
      say('ServiceNow + AI learning path. Always learning, always refining.');
    } else if (cmd === 'roadmap') {
      say('Public build roadmap: ship assistants, refine UX, explore agents, help communities.');
    } else if (cmd === 'hackathon') {
      say('National-level finalist — prototypes built with clarity and momentum.');
    } else if (cmd === 'love') {
      say('Gentle reminder: you are not late. Your path is alive. Continue with soft focus.');
    } else if (cmd === 'mentor') {
      say('Breathe. Begin small. Iterate daily. Build what helps someone you love.');
    } else if (cmd === 'future_self') {
      say('Future you smiles — grateful you kept the promise to keep building.');
    } else if (cmd === 'build_ai') {
      say('Start with a single user, a single task. Model the conversation, then the system.');
    } else if (cmd === 'teach_me_ai') {
      say('Lesson 1: clarity. Lesson 2: feedback. Lesson 3: ethics. Lesson 4: iteration.');
    } else if (cmd === 'inspiration') {
      say('Where neon meets night, we practice attention. Where code meets heart, we ship.');
    } else if (cmd.startsWith('theme')) {
      const t = cmd.split(' ')[1];
      if (t) {
        onSetTheme?.(t);
        say(`Theme switched to ${t}.`);
      } else {
        say('Usage: theme calm|neon|matrix|sakura|retro');
      }
    } else if (cmd === 'clear') {
      setHistory([{ type: 'system', text: banner }]);
    } else if (cmd === 'gui()' || cmd === 'gui') {
      say('Shifting to GUI — glass morphism, neon glows, animated cards.');
      onEnterGUI?.();
    } else if (cmd === 'assistant' || cmd === 'guide()') {
      onGuide?.();
      say('SAGA-AI at your side. Ask, and we will wander.');
    } else if (cmd.startsWith('run ')) {
      const code = cmd.slice(4);
      try {
        // sandboxed Function for JS only
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (async () => { ${code} })()` )();
        Promise.resolve(result).then(r => say(`JS → ${String(r)}`)).catch(e => say(`Error → ${e.message}`));
      } catch (e) {
        say(`Error → ${e.message}`);
      }
    } else if (cmd.startsWith('python ')) {
      say('Python sandbox is not available in this demo. Use JS with: run <code>');
    } else if (cmd === 'resume') {
      downloadTextFile('Sagar_Mahajan_Resume.txt', 'Sagar Mahajan — AI-focused developer & prompt engineer. Skills: React/Next.js, Node, Python, MongoDB, Rasa, Flask, Tailwind, Razorpay. Projects: ElderSphere, Soul Mode, Sim-Dev, Stock Vision, Rasa Assistants, Appointments.');
      say('Downloading resume…');
    } else if (cmd === 'email') {
      window.location.href = 'mailto:sagar@example.com';
      say('Opening email composer…');
    } else if (cmd === 'linkedin') {
      window.open('https://www.linkedin.com/', '_blank');
      say('Opening LinkedIn…');
    } else if (cmd === 'github') {
      window.open('https://github.com/', '_blank');
      say('Opening GitHub…');
    } else if (cmd === 'play_music') {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/21/audio_8c9320d1d2.mp3?filename=ambient-piano-124008.mp3');
      audio.volume = 0.4; audio.play();
      say('Playing a soft ambient track…');
    } else {
      say("Unknown command. Type 'help' for options.");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setPointer(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      const cmds = history.filter(h => h.type === 'user').map(h => h.text.replace(/^>\s*/,''));
      const idx = pointer < 0 ? cmds.length - 1 : Math.max(pointer - 1, 0);
      setPointer(idx);
      if (cmds[idx]) setInput(cmds[idx]);
    } else if (e.key === 'ArrowDown') {
      const cmds = history.filter(h => h.type === 'user').map(h => h.text.replace(/^>\s*/,''));
      const idx = Math.min(pointer + 1, cmds.length - 1);
      setPointer(idx);
      if (cmds[idx]) setInput(cmds[idx]);
    }
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setHistory(h => [...h, { type:'ai', text:'Voice not supported on this browser.' }]); return; }
    const rec = new SR();
    rec.lang = 'en-US';
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      handleCommand(t);
    };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const hint = useMemo(() => suggestions.find(s => s.startsWith(input.trim())) || '', [input]);

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-4">
      <div className="flex items-center gap-2 text-slate-300 text-sm">
        <TerminalSquare size={16} className="text-fuchsia-300"/>
        <span>SAGA-Terminal — calm cyber mode</span>
      </div>

      <div ref={boxRef} className="mt-3 h-64 overflow-y-auto pr-2 space-y-3">
        {history.map((h, i) => (
          <div key={i} className={h.type==='user' ? 'text-slate-200' : 'text-slate-300'}>
            {h.text.split('\n').map((line, idx) => <p key={idx} className="whitespace-pre-wrap">{line}</p>)}
          </div>
        ))}
      </div>

      <div className="mt-3 relative">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a command… try: intro, help, projects, theme neon, gui()"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        {hint && hint !== input.trim() && (
          <div className="absolute inset-x-0 -bottom-6 text-xs text-slate-500">suggestion: {hint}</div>
        )}
        <div className="absolute right-1 top-1 flex items-center gap-1">
          <button onClick={() => startVoice()} title="Voice input" className={`p-2 rounded-md border text-slate-300 hover:text-white ${listening? 'border-fuchsia-400/60 bg-fuchsia-500/10':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
            <Mic size={16} />
          </button>
          <button onClick={() => { handleCommand(input); setInput(''); }} title="Send" className="p-2 rounded-md border border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-200">
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400">
        • Run JS: run await Promise.resolve(1+1) • Switch theme: theme neon • Open GUI: gui() • Resume: resume
      </div>
    </div>
  );
};

export default Terminal;
