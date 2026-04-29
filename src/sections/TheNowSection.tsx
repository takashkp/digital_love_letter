import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: 'And here we are.', bold: false },
  { text: '365 days later.', bold: true, accent: true },
  { text: 'And I still look at you the same way.', bold: false },
];

const belowText = 'Some things don\'t change. They just grow deeper.';

export default function TheNowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const photoRef = useRef<HTMLImageElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);

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

      // Photo focus pull - scroll scrubbed
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { filter: 'blur(8px) brightness(0.9)', opacity: 0 },
          {
            filter: 'blur(0px) brightness(1)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'center center',
              scrub: 0.3
            }
          }
        );
      }

      // Below text reveal
      if (belowRef.current) {
        gsap.fromTo(belowRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center paper-texture px-6 py-20"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      {/* Text Above Photo */}
      <div className="max-w-[560px] w-full text-center mb-8">
        {lines.map((line, i) => (
          <div
            key={i}
            ref={el => { linesRef.current[i] = el; }}
            className="font-handwritten text-2xl sm:text-3xl mb-2"
            style={{
              color: line.accent ? '#C45C6A' : '#3D2C1D',
              fontWeight: line.bold ? 700 : 400,
              opacity: 0,
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
              transformOrigin: 'center center'
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Photo - Focus Pull */}
      <div
        className="relative p-4"
        style={{
          backgroundColor: '#FAFAF5',
          borderRadius: '4px'
        }}
      >
        <img
          ref={photoRef}
          src={`${import.meta.env.BASE_URL}images/couple-now.jpg`}
          alt="Now"
          className="w-[280px] sm:w-[400px] h-auto object-cover"
          style={{
            aspectRatio: '3/4',
            filter: 'blur(8px) brightness(0.9)',
            opacity: 0
          }}
        />
      </div>

      {/* Text Below Photo */}
      <div
        ref={belowRef}
        className="max-w-[560px] w-full text-center mt-8 font-handwritten text-xl sm:text-2xl italic"
        style={{
          color: '#3D2C1D',
          opacity: 0,
          transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
          transformOrigin: 'center center'
        }}
      >
        {belowText}
      </div>
    </section>
  );
}
