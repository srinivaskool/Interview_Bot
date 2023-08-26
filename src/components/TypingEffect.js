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
    }, 45); // Adjust typing speed here

    return () => clearTimeout(timer);
    }
  }, [currentIndex, textToType]);

  return (
    <div>
      <p className='m-0'>{typedText}</p>
    </div>
  );
};

export default TypingEffect;
