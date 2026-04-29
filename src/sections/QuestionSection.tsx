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

interface QuestionSectionProps {
  onYesClick: () => void;
}

export default function QuestionSection({ onYesClick }: QuestionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const noWrapperRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const sweatRef = useRef<HTMLDivElement>(null);
  const tearRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);
  const [noText, setNoText] = useState('No');
  const [yesText, setYesText] = useState('Yes');
  const [showButtons, setShowButtons] = useState(false);
  const [noPopup, setNoPopup] = useState(false);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

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

      // Show buttons after text
      gsap.delayedCall(1.2, () => setShowButtons(true));
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Phase change effects
  useEffect(() => {
    if (phase === 1) {
      setNoText('Really?');
      gsap.to(noButtonRef.current, {
        x: 50,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(yesButtonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else if (phase === 2) {
      setNoText('Think again!');
      // Teleport to random position
      const safeX = 60 + Math.random() * (window.innerWidth - 200);
      const safeY = 60 + Math.random() * (window.innerHeight - 150);
      if (noWrapperRef.current) {
        gsap.set(noWrapperRef.current, {
          position: 'fixed',
          left: safeX,
          top: safeY,
          rotate: 15
        });
      }
      gsap.to(yesButtonRef.current, {
        scale: 1.3,
        backgroundColor: '#D4607A',
        duration: 0.3,
        ease: 'power2.out'
      });
      // Show sweat
      gsap.to(sweatRef.current, { opacity: 1, duration: 0.3 });
    } else if (phase === 3) {
      setNoText('Please?');
      gsap.to(noButtonRef.current, {
        scale: 0.7,
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(yesButtonRef.current, {
        scale: 1.6,
        duration: 0.3,
        ease: 'power2.out'
      });
      // Show sparkles
      gsap.to(sparklesRef.current, { opacity: 1, duration: 0.3 });
    } else if (phase === 4) {
      setNoText('I\'m begging...');
      gsap.to(noButtonRef.current, {
        scale: 0.4,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(yesButtonRef.current, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
      // Show tears
      gsap.to(tearRef.current, { opacity: 0.7, duration: 0.3 });
    } else if (phase === 5) {
      setNoText('...');
      gsap.to(noButtonRef.current, {
        scale: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
      // Flee to corner
      if (noWrapperRef.current) {
        gsap.to(noWrapperRef.current, {
          left: 40,
          top: window.innerHeight - 80,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
      // Yes expands
      gsap.to(yesButtonRef.current, {
        scale: 1,
        width: 'min(500px, 80vw)',
        height: '100px',
        duration: 0.5,
        ease: 'power2.out'
      });
      setYesText('YES!');
    }
  }, [phase]);

  const handleNoHover = useCallback(() => {
    if (phaseRef.current >= 5) return;
    setPhase(prev => Math.min(prev + 1, 5));
  }, []);

  const handleNoClick = useCallback(() => {
    if (phaseRef.current >= 5) {
      setNoPopup(true);
      setTimeout(() => {
        setNoPopup(false);
        gsap.to(noWrapperRef.current, { opacity: 0, duration: 0.3 });
      }, 1500);
    }
  }, []);

  const handleYesClick = useCallback(() => {
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8A0B0', '#D4607A', '#F0C4A0', '#D4A574'],
      shapes: ['circle', 'square'],
      scalar: 1.2
    });

    // Second burst
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

  // Flee algorithm for Phase 4
  useEffect(() => {
    if (phase !== 4) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noWrapperRef.current || !noButtonRef.current) return;

      const rect = noButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const angle = Math.atan2(dy, dx) + Math.PI;
        const moveDist = 100;
        const newX = centerX + Math.cos(angle) * moveDist;
        const newY = centerY + Math.sin(angle) * moveDist;
        const clampedX = Math.max(60, Math.min(window.innerWidth - 60, newX));
        const clampedY = Math.max(60, Math.min(window.innerHeight - 60, newY));

        gsap.to(noWrapperRef.current, {
          left: clampedX - rect.width / 2,
          top: clampedY - rect.height / 2,
          duration: 0.15,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [phase]);

  const noButtonClasses = [
    '',
    'cursor-not-allowed',
    'cursor-not-allowed',
    'animate-shake cursor-not-allowed',
    'cursor-not-allowed',
    'cursor-not-allowed'
  ][phase];

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
        <div className="relative flex items-center justify-center gap-10">
          {/* Yes Button */}
          <button
            ref={yesButtonRef}
            onClick={handleYesClick}
            className={`relative font-handwritten font-bold rounded-xl transition-all duration-300 z-50 ${yesButtonClasses}`}
            style={{
              width: phase >= 5 ? 'min(500px, 80vw)' : '180px',
              height: phase >= 5 ? '100px' : '60px',
              backgroundColor: phase >= 2 ? '#D4607A' : '#E8A0B0',
              color: '#3D2C1D',
              fontSize: phase >= 5 ? '48px' : '28px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {yesText}

            {/* Sparkles around Yes (Phase 3+) */}
            <div
              ref={sparklesRef}
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0 }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-lg"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${-20 + (i % 2) * 10}px`,
                    animation: `sparkle-float 1.5s infinite ease-in-out`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </button>

          {/* No Button Wrapper */}
          <div
            ref={noWrapperRef}
            className="relative"
            style={{ zIndex: 40 }}
          >
            {/* Sweat drop (Phase 2) */}
            <div
              ref={sweatRef}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-xl"
              style={{ opacity: 0 }}
            >
              💧
            </div>

            {/* Tear (Phase 4+) */}
            <div
              ref={tearRef}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
              style={{ opacity: 0 }}
            >
              😢
            </div>

            {/* Popup for Phase 5 */}
            {noPopup && (
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 font-handwritten text-sm whitespace-nowrap px-3 py-1 rounded-lg"
                style={{
                  backgroundColor: '#3D2C1D',
                  color: '#F5F0E6'
                }}
              >
                You win...
              </div>
            )}

            <button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              className={`font-handwritten rounded-lg transition-all duration-300 ${noButtonClasses}`}
              style={{
                width: phase >= 5 ? '40px' : '100px',
                height: phase >= 5 ? '30px' : '50px',
                backgroundColor: '#9E9E9E',
                color: 'white',
                fontSize: phase >= 5 ? '14px' : '20px',
                border: 'none',
                opacity: phase >= 3 ? 0.6 : 1
              }}
            >
              {noText}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
