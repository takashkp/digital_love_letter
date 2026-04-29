import { useState, useCallback } from 'react';
import EnvelopeSection from './sections/EnvelopeSection';
import BeginningSection from './sections/BeginningSection';
import FirstPhotoSection from './sections/FirstPhotoSection';
import MiddleSection from './sections/MiddleSection';
import SecondPhotoSection from './sections/SecondPhotoSection';
import TheNowSection from './sections/TheNowSection';
import QuestionSection from './sections/QuestionSection';
import Celebration from './sections/Celebration';

export default function App() {
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  const handleEnvelopeComplete = useCallback(() => {
    // Auto-scroll to next section
    const nextSection = document.getElementById('beginning');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleYesClick = useCallback(() => {
    setCelebrationVisible(true);
  }, []);

  return (
    <div className="relative">
      {/* Envelope Opening */}
      <EnvelopeSection onComplete={handleEnvelopeComplete} />

      {/* The Beginning */}
      <div id="beginning">
        <BeginningSection />
      </div>

      {/* First Photo */}
      <FirstPhotoSection />

      {/* The Middle */}
      <MiddleSection />

      {/* Second Photo */}
      <SecondPhotoSection />

      {/* The Now */}
      <TheNowSection />

      {/* The Question */}
      <QuestionSection onYesClick={handleYesClick} />

      {/* Final Celebration */}
      <Celebration visible={celebrationVisible} />
    </div>
  );
}
