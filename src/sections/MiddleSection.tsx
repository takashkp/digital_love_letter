import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sentences = [
  { text: 'Then everything changed.', bold: false, accent: false },
  { text: 'The late night talks turned into early morning coffee.', bold: false, accent: false },
  { textParts: [
    { text: "The 'I' became ", accent: false },
    { text: 'we', accent: true },
    { text: ' before I even noticed.', accent: false }
  ]},
  { text: 'You became my favorite habit.', bold: false, accent: false },
  { text: 'My safest place.', bold: false, accent: false },
  { textParts: [
    { text: 'My ', accent: false },
    { text: 'home', accent: true },
    { text: '.', accent: false }
  ]},
];

export default function MiddleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sentencesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background blur animation - scroll scrubbed
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { scale: 1, filter: 'blur(0px) brightness(1)', opacity: 0.3 },
          {
            scale: 1.5,
            filter: 'blur(12px) brightness(1.1)',
            opacity: 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3
            }
          }
        );
      }

      // Text lines reveal
      sentencesRef.current.forEach((sentence, i) => {
        if (!sentence) return;
        gsap.fromTo(sentence,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center paper-texture px-6 py-20 overflow-hidden"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      {/* Blurred background photo */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/couple-first-meet.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: 1
        }}
      />

      {/* Text Content */}
      <div className="relative max-w-[560px] w-full z-10">
        <div
          className="font-handwritten text-2xl sm:text-3xl leading-relaxed"
          style={{ textShadow: '0 2px 12px rgba(245,240,230,0.8)' }}
        >
          {sentences.map((sentence, i) => (
            <div
              key={i}
              ref={el => { sentencesRef.current[i] = el; }}
              className="mb-2"
              style={{
                color: '#3D2C1D',
                fontWeight: sentence.bold ? 700 : 400,
                opacity: 0,
                transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                transformOrigin: 'left center'
              }}
            >
              {sentence.textParts ? (
                sentence.textParts.map((part, j) => (
                  <span
                    key={j}
                    style={{
                      color: part.accent ? '#C45C6A' : '#3D2C1D',
                      fontWeight: part.accent ? 700 : 400
                    }}
                  >
                    {part.text}
                  </span>
                ))
              ) : (
                <span style={{ color: sentence.accent ? '#C45C6A' : '#3D2C1D', fontWeight: sentence.accent ? 700 : 400 }}>
                  {sentence.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
