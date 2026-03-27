import { useEffect, useState, useRef } from 'react';
import './SplashScreen.css';

const QUOTE_SETS = [
  [
    "You don't have to be perfect.",
    "You just have to start.",
    "One task at a time.",
  ],
  [
    "Small steps every day.",
    "That's how mountains are moved.",
    "Let's get to work.",
  ],
  [
    "The secret to getting ahead",
    "is getting started.",
    "Your list is waiting.",
  ],
  [
    "Don't wait for motivation.",
    "Build it through action.",
    "Begin. Right now.",
  ],
  [
    "Great things are done",
    "by a series of small things",
    "brought together.",
  ],
  [
    "You've got this.",
    "One thing at a time.",
    "Make today count.",
  ],
  [
    "Focus is your superpower.",
    "Distraction is the enemy.",
    "Start with one task.",
  ],
  [
    "It always seems impossible",
    "until it's done.",
    "So — let's do it.",
  ],
];

function pickRandomSet() {
  const last = parseInt(localStorage.getItem('lastQuoteIndex') ?? '-1');
  let idx: number;
  do {
    idx = Math.floor(Math.random() * QUOTE_SETS.length);
  } while (idx === last && QUOTE_SETS.length > 1);
  localStorage.setItem('lastQuoteIndex', String(idx));
  return QUOTE_SETS[idx];
}

interface Props {
  onDone: () => void;
}

const SplashScreen = ({ onDone }: Props) => {
  const lines = useRef(pickRandomSet()).current;

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>(() => lines.map(() => ''));
  const [exiting, setExiting]     = useState(false);

  const exit = () => {
    setExiting(true);
    setTimeout(onDone, 700);
  };

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const t = setTimeout(exit, 1200);
      return () => clearTimeout(t);
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const delay = 36 + Math.random() * 30;
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
      const t = setTimeout(() => {
        setLineIndex(i => i + 1);
        setCharIndex(0);
      }, 480);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  return (
    <div className={`splash ${exiting ? 'splash--exit' : ''}`}>
      <div className="splash__lines">
        {lines.map((_, i) => (
          <p
            key={i}
            className={[
              'splash__line',
              i < lineIndex   ? 'splash__line--done'   : '',
              i === lineIndex ? 'splash__line--active'  : '',
              i === lines.length - 1 ? 'splash__line--last' : '',
            ].join(' ')}
          >
            {displayed[i]}
            {i === lineIndex && lineIndex < lines.length && (
              <span className="splash__cursor" />
            )}
          </p>
        ))}
      </div>
      <p className="splash__skip" onClick={exit}>skip →</p>
    </div>
  );
};

export default SplashScreen;