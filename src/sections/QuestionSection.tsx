import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const questionLines = [
  { text: 'So here\'s my question...', size: 'text-2xl sm:text-3xl' },
  { text: 'Will you let me love you', size: 'text-3xl sm:text-4xl' },
  { text: 'for another year?', size: 'text-4xl sm:text-5xl', accent: true },
];

const noTexts = ['No', 'Really?', 'Think again!', 'Please?', 'I\'m begging...', '...'];

interface QuestionSectionProps {
  onYesClick: () => void;
}

export default function QuestionSection({ onYesClick }: QuestionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const [phase, setPhase] = useState(0);
  const [yesText, setYesText] = useState('Yes');
  const [showButtons, setShowButtons] = useState(false);
  const [noVisible, setNoVisible] = useState(true);

  // Text lines reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(line,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.2
          }
        );
      });

      gsap.delayedCall(1.2, () => setShowButtons(true));
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Yes button grows with each phase
  useEffect(() => {
    if (!yesButtonRef.current) return;

    if (phase >= 5) {
      setYesText('YES!');
      setNoVisible(false);
    }
  }, [phase]);

  const handleNoClick = useCallback(() => {
    setPhase(prev => Math.min(prev + 1, 5));
  }, []);

  const handleYesClick = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8A0B0', '#D4607A', '#F0C4A0', '#D4A574'],
      shapes: ['circle', 'square'],
      scalar: 1.2
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5, x: 0.3 },
        colors: ['#E8A0B0', '#D4607A', '#F0C4A0'],
        shapes: ['circle']
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5, x: 0.7 },
        colors: ['#E8A0B0', '#D4607A', '#D4A574'],
        shapes: ['square']
      });
    }, 400);

    onYesClick();
  }, [onYesClick]);

  // Compute styles based on phase
  const yesScale = [1, 1.05, 1.1, 1.15, 1.2, 1][phase];
  const noScale = [1, 0.95, 0.85, 0.7, 0.5, 0][phase];
  const noOpacity = [1, 1, 0.9, 0.7, 0.5, 0][phase];

  const yesButtonClasses = [
    '',
    'shadow-glow-soft',
    'animate-heartbeat',
    'animate-glow-pulse',
    'animate-gentle-bounce shadow-glow-golden',
    'shadow-glow-golden animate-gentle-bounce'
  ][phase];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center paper-texture px-6 py-20"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      {/* Question Text */}
      <div className="max-w-[600px] w-full text-center mb-12">
        {questionLines.map((line, i) => (
          <div
            key={i}
            ref={el => { linesRef.current[i] = el; }}
            className={`font-handwritten ${line.size} mb-2`}
            style={{
              color: line.accent ? '#C45C6A' : '#3D2C1D',
              fontWeight: line.accent ? 700 : 400,
              opacity: 0
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {showButtons && (
        <div className="flex flex-col items-center gap-6">
          {/* Yes Button */}
          <button
            ref={yesButtonRef}
            onClick={handleYesClick}
            className={`relative font-handwritten font-bold rounded-xl transition-all duration-300 ${yesButtonClasses}`}
            style={{
              width: phase >= 5 ? 'min(500px, 85vw)' : 'min(220px, 60vw)',
              height: phase >= 5 ? '80px' : '56px',
              backgroundColor: phase >= 2 ? '#D4607A' : '#E8A0B0',
              color: '#3D2C1D',
              fontSize: phase >= 5 ? '36px' : '24px',
              border: 'none',
              cursor: 'pointer',
              transform: `scale(${yesScale})`,
            }}
          >
            {yesText}

            {/* Sparkles (Phase 3+) */}
            {phase >= 3 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-base sm:text-lg"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${-16 + (i % 2) * 8}px`,
                      animation: 'sparkle-float 1.5s infinite ease-in-out',
                      animationDelay: `${i * 0.3}s`
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            )}
          </button>

          {/* No Button */}
          {noVisible && (
            <button
              onClick={handleNoClick}
              className={`font-handwritten rounded-lg transition-all duration-300 ${phase >= 3 ? 'animate-shake' : ''}`}
              style={{
                width: `${Math.max(50, 100 * noScale)}px`,
                height: `${Math.max(28, 44 * noScale)}px`,
                backgroundColor: '#9E9E9E',
                color: 'white',
                fontSize: `${Math.max(12, 18 * noScale)}px`,
                border: 'none',
                cursor: 'pointer',
                opacity: noOpacity,
                transform: `scale(${noScale})`,
              }}
            >
              {noTexts[phase]}
            </button>
          )}

          {/* Emoji reactions */}
          <div className="h-8 flex items-center justify-center">
            {phase === 2 && <span className="text-xl animate-gentle-bounce">💧</span>}
            {phase === 3 && <span className="text-xl animate-gentle-bounce">🥺</span>}
            {phase >= 4 && <span className="text-2xl animate-gentle-bounce">😢</span>}
          </div>
        </div>
      )}
    </section>
  );
}
