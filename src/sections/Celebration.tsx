import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  visible: boolean;
}

export default function Celebration({ visible }: CelebrationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heartsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Screen flash white
      tl.fromTo(flashRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power2.in' }
      );
      tl.to(flashRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out'
      });

      // 2. Big photo fades in
      tl.fromTo(photoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );

      // 3. Text appears
      tl.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );

      // 4. Screenshot prompt
      tl.fromTo(screenshotRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 1, ease: 'power2.out' },
        '+=1'
      );

      // Continuous confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#E8A0B0', '#D4607A', '#F0C4A0', '#D4A574'],
          shapes: ['circle', 'square']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#E8A0B0', '#D4607A', '#F0C4A0', '#D4A574'],
          shapes: ['circle', 'square']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      setTimeout(frame, 500);
    }, overlayRef);

    return () => ctx.revert();
  }, [visible]);

  // Generate floating hearts
  useEffect(() => {
    if (!visible || !heartsContainerRef.current) return;

    const container = heartsContainerRef.current;
    const heartCount = 40;
    const colors = ['#E8A0B0', '#D4607A', '#F0C4A0', '#D4A574'];

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '♥';
      heart.style.position = 'fixed';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = '-50px';
      heart.style.fontSize = `${12 + Math.random() * 24}px`;
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.opacity = '0.8';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '90';
      heart.style.animation = `heart-rise ${4 + Math.random() * 4}s linear infinite`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);
      heart.style.setProperty('--rot', `${Math.random() * 360}deg`);
      container.appendChild(heart);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'rgba(245, 240, 230, 0.95)' }}
    >
      {/* Flash white */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: 0, zIndex: 101 }}
      />

      {/* Floating hearts container */}
      <div
        ref={heartsContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 90 }}
      />

      {/* Big photo */}
      <img
        ref={photoRef}
        src="/images/couple-celebration.jpg"
        alt="Celebration"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, zIndex: 1 }}
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(61,44,29,0.3), rgba(61,44,29,0.5))',
          zIndex: 2
        }}
      />

      {/* Text overlay */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6"
        style={{ opacity: 0 }}
      >
        <div
          className="font-handwritten text-4xl sm:text-6xl font-bold mb-4"
          style={{ color: '#F5F0E6', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          I love you.
        </div>
        <div
          className="font-handwritten text-2xl sm:text-4xl"
          style={{ color: '#F5F0E6', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          Here's to forever.
        </div>
      </div>

      {/* Screenshot prompt */}
      <div
        ref={screenshotRef}
        className="absolute bottom-8 left-0 right-0 text-center z-10"
        style={{ opacity: 0 }}
      >
        <span className="font-ui text-sm" style={{ color: '#F5F0E6' }}>
          Screenshot this moment
        </span>
        <span className="ml-1">💕</span>
      </div>
    </div>
  );
}
