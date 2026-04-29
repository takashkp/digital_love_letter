import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMousePosition } from '../hooks/useMousePosition';

gsap.registerPlugin(ScrollTrigger);

const textLines = [
  { text: 'Then you smiled at me.', bold: false },
  { text: 'And I forgot how to breathe.', bold: false },
  { text: 'That was the beginning of everything.', bold: true },
];

export default function FirstPhotoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text lines reveal
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

      // Polaroid slides in
      if (polaroidRef.current) {
        gsap.fromTo(polaroidRef.current,
          { x: '120%', rotate: 8, opacity: 0 },
          {
            x: 0,
            rotate: -2,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax for polaroid
  useEffect(() => {
    if (!polaroidRef.current) return;

    let rafId: number;
    const updateParallax = () => {
      const x = (mousePos.current.x / window.innerWidth - 0.5) * 10;
      const y = (mousePos.current.y / window.innerHeight - 0.5) * 10;
      if (polaroidRef.current) {
        polaroidRef.current.style.transform = `translate(${x}px, ${y}px) rotate(-2deg)`;
      }
      rafId = requestAnimationFrame(updateParallax);
    };
    rafId = requestAnimationFrame(updateParallax);

    return () => cancelAnimationFrame(rafId);
  }, [mousePos]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center paper-texture px-6 py-20"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      <div className="max-w-[900px] w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text Content */}
        <div className="flex-1 max-w-[400px]">
          {textLines.map((line, i) => (
            <div
              key={i}
              ref={el => { linesRef.current[i] = el; }}
              className="font-handwritten text-2xl sm:text-3xl mb-3"
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

        {/* Polaroid Photo */}
        <div
          ref={polaroidRef}
          className="relative flex-shrink-0"
          style={{
            width: '280px',
            opacity: 0,
            willChange: 'transform'
          }}
        >
          {/* Paper clip */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-10 z-10"
            style={{
              background: 'linear-gradient(90deg, #B0B0B0 0%, #E0E0E0 30%, #C0C0C0 60%, #A0A0A0 100%)',
              borderRadius: '2px 2px 0 0',
              clipPath: 'polygon(20% 0, 80% 0, 100% 30%, 100% 100%, 0 100%, 0 30%)'
            }}
          />

          {/* Polaroid frame */}
          <div
            className="p-3 pb-16"
            style={{
              backgroundColor: '#FAFAF5',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
              transform: 'rotate(-2deg)'
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/couple-first-meet.jpg`}
              alt="First meeting"
              className="w-full h-[320px] object-cover"
              style={{ filter: 'saturate(0.9)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
