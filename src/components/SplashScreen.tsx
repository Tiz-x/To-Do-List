import { useEffect, useState } from 'react';
import './SplashScreen.css';

const LINES = [
  "You don't have to be perfect.",
  "You just have to start.",
  "One task at a time.",
];

interface Props {
  onDone: () => void;
}

const SplashScreen = ({ onDone }: Props) => {
  const [lineIndex, setLineIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState<string[]>(['', '', '']);
  const [exiting, setExiting]       = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      // All lines typed — pause then exit
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 700);
      }, 1200);
      return () => clearTimeout(t);
    }

    const currentLine = LINES[lineIndex];

    if (charIndex < currentLine.length) {
      const delay = 38 + Math.random() * 28; // slight randomness = natural feel
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex(c => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      // Line done — pause before next line
      const t = setTimeout(() => {
        setLineIndex(i => i + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, onDone]);

  return (
    <div className={`splash ${exiting ? 'splash--exit' : ''}`}>
      <div className="splash__lines">
        {LINES.map((_, i) => (
          <p
            key={i}
            className={`splash__line ${i < lineIndex ? 'splash__line--done' : ''} ${i === lineIndex ? 'splash__line--active' : ''}`}
          >
            {displayed[i]}
            {i === lineIndex && lineIndex < LINES.length && (
              <span className="splash__cursor" />
            )}
          </p>
        ))}
      </div>
      <p className="splash__skip" onClick={() => { setExiting(true); setTimeout(onDone, 700); }}>
        skip →
      </p>
    </div>
  );
};

export default SplashScreen;