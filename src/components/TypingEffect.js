import React, { useEffect, useState } from 'react';

const TypingEffect = ({textToType, scrollOnType}) => {
//   const textToType = "Hello, I am a typing effect!";
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      if (currentIndex < textToType.length) {
      const timer = setTimeout(() => {
        setTypedText(prevTypedText => prevTypedText + textToType[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        scrollOnType()
    }, 50); // Adjust typing speed here

    return () => clearTimeout(timer);
    }
  }, [currentIndex, textToType]);

  return (
    <div>
      <p>{typedText}</p>
    </div>
  );
};

export default TypingEffect;
