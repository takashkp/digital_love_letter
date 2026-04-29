import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: 'Dear Tiffany,', bold: true, size: 'text-4xl sm:text-5xl' },
  { text: 'I still remember the first time I saw you.', bold: false, size: 'text-2xl sm:text-3xl' },
  { text: 'You were standing by the window,', bold: false, size: 'text-2xl sm:text-3xl' },
  { text: 'light falling on your hair like golden thread.', bold: false, size: 'text-2xl sm:text-3xl' },
  { text: 'I didn\'t know then that my life was about to change.', bold: false, size: 'text-2xl sm:text-3xl' },
  { text: 'But looking back, I think I always knew.', bold: true, size: 'text-2xl sm:text-3xl' },
];

export default function BeginningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

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
            delay: i * 0.15
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center paper-texture px-6 py-20"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      <div className="max-w-[640px] w-full">
        {lines.map((line, i) => (
          <div
            key={i}
            ref={el => { linesRef.current[i] = el; }}
            className={`font-handwritten mb-3 ${line.size}`}
            style={{
              color: line.bold ? '#3D2C1D' : '#3D2C1D',
              fontWeight: line.bold ? 700 : 400,
              opacity: 0,
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
              transformOrigin: 'left center'
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </section>
  );
}
