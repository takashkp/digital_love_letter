import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textAbove = [
  { text: 'There was that trip we took...', bold: false },
  { text: 'The one where we got lost and found something better.', bold: false },
];

const textBelow = [
  { text: 'You laughed so hard you cried.', bold: false },
  { text: 'I think I fell in love with you all over again.', bold: true },
];

export default function SecondPhotoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboveRef = useRef<(HTMLDivElement | null)[]>([]);
  const belowRef = useRef<(HTMLDivElement | null)[]>([]);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text above reveals first
      aboveRef.current.forEach((line, i) => {
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

      // Photo torn reveal
      if (maskRef.current && photoContainerRef.current) {
        gsap.fromTo(maskRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Sepia to color
        if (photoRef.current) {
          gsap.fromTo(photoRef.current,
            { filter: 'sepia(0.6) saturate(0.5)' },
            {
              filter: 'sepia(0) saturate(1)',
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                toggleActions: 'play none none none',
              },
              delay: 1.5
            }
          );
        }
      }

      // Text below reveals after photo is 50% revealed
      belowRef.current.forEach((line, i) => {
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
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15 + 0.5
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center paper-texture px-6 py-20"
      style={{ backgroundColor: '#F5F0E6' }}
    >
      {/* Text Above */}
      <div className="max-w-[560px] w-full mb-8 text-center">
        {textAbove.map((line, i) => (
          <div
            key={i}
            ref={el => { aboveRef.current[i] = el; }}
            className="font-handwritten text-2xl sm:text-3xl mb-2"
            style={{
              color: '#3D2C1D',
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

      {/* Photo with torn paper reveal */}
      <div
        ref={photoContainerRef}
        className="relative"
        style={{ transform: 'rotate(1deg)' }}
      >
        {/* Tape corners */}
        <div
          className="absolute -top-2 -left-2 w-12 h-8 z-20"
          style={{
            backgroundColor: 'rgba(232, 213, 192, 0.7)',
            transform: 'rotate(-15deg)',
            clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
          }}
        />
        <div
          className="absolute -top-2 -right-2 w-12 h-8 z-20"
          style={{
            backgroundColor: 'rgba(232, 213, 192, 0.7)',
            transform: 'rotate(15deg)',
            clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
          }}
        />

        {/* Photo frame */}
        <div
          className="relative p-3"
          style={{
            backgroundColor: '#FAFAF5',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          }}
        >
          {/* Mask container for torn reveal */}
          <div
            ref={maskRef}
            className="overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '480px',
              transformOrigin: 'center center'
            }}
          >
            {/* Torn edge effect using clip path */}
            <div
              style={{
                clipPath: 'polygon(2% 0%, 98% 1%, 100% 3%, 99% 97%, 97% 100%, 3% 99%, 0% 98%, 1% 2%)'
              }}
            >
              <img
                ref={photoRef}
                src={`${import.meta.env.BASE_URL}images/couple-milestone-trip.jpg`}
                alt="Milestone trip"
                className="w-full h-auto object-cover"
                style={{
                  maxHeight: '360px',
                  aspectRatio: '4/3',
                  filter: 'sepia(0.6) saturate(0.5)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Below */}
      <div className="max-w-[560px] w-full mt-8 text-center">
        {textBelow.map((line, i) => (
          <div
            key={i}
            ref={el => { belowRef.current[i] = el; }}
            className="font-handwritten text-2xl sm:text-3xl mb-2"
            style={{
              color: '#3D2C1D',
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
    </section>
  );
}
