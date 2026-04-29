import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface EnvelopeSectionProps {
  onComplete: () => void;
}

export default function EnvelopeSection({ onComplete }: EnvelopeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (hasPlayed) return;
    setHasPlayed(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 500);
        }
      });

      // Envelope scales in
      tl.fromTo(envelopeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Text fades in
      tl.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Flap opens
      tl.to(flapRef.current, {
        rotateX: 180,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '+=0.5');

      // Paper slides up and unfolds
      tl.fromTo(paperRef.current,
        { y: 80, opacity: 0, scaleY: 0.3 },
        { y: -60, opacity: 1, scaleY: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Envelope and paper fade out
      tl.to([envelopeRef.current, paperRef.current, textRef.current], {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: 'power2.in'
      }, '+=0.8');

    }, sectionRef);

    return () => ctx.revert();
  }, [hasPlayed, onComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center paper-texture overflow-hidden"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      {/* Envelope Container */}
      <div
        ref={envelopeRef}
        className="relative"
        style={{ perspective: '800px', opacity: 0 }}
      >
        {/* Envelope Body */}
        <div
          className="relative w-[200px] h-[140px] sm:w-[280px] sm:h-[180px]"
          style={{ backgroundColor: '#E8D5C0' }}
        >
          {/* Envelope bottom V shape */}
          <div
            className="absolute bottom-0 left-0 w-full h-[70%]"
            style={{
              backgroundColor: '#E8D5C0',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              zIndex: 2
            }}
          />
          {/* Envelope side flaps */}
          <div
            className="absolute top-0 left-0 w-[50%] h-full"
            style={{
              backgroundColor: '#D4C4A8',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              zIndex: 1
            }}
          />
          <div
            className="absolute top-0 right-0 w-[50%] h-full"
            style={{
              backgroundColor: '#D4C4A8',
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              zIndex: 1
            }}
          />

          {/* Paper inside */}
          <div
            ref={paperRef}
            className="absolute left-[10%] top-[10%] w-[80%] h-[80%] rounded-sm"
            style={{
              backgroundColor: '#FAFAF5',
              zIndex: 3,
              transformOrigin: 'bottom center',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {/* Fold line */}
            <div
              className="absolute top-1/2 left-0 w-full h-[1px]"
              style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
            />
          </div>

          {/* Envelope Flap (top) */}
          <div
            ref={flapRef}
            className="absolute top-0 left-0 w-full h-[55%]"
            style={{
              backgroundColor: '#C9A87C',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              zIndex: 4,
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Stamp */}
          <div
            className="absolute top-3 right-3 w-8 h-10 sm:w-10 sm:h-12 rounded-sm flex items-center justify-center"
            style={{
              backgroundColor: '#C45C6A',
              zIndex: 5,
              opacity: 0.9
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtitle text */}
      <div
        ref={textRef}
        className="mt-8 font-handwritten text-xl sm:text-2xl"
        style={{ color: '#C45C6A', opacity: 0 }}
      >
        A letter for you...
      </div>
    </section>
  );
}
