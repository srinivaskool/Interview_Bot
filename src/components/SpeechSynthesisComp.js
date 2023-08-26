import React, { useEffect, useState } from "react";
const SpeechSynthesisComp = ({ utteranceVoiceChange }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null);

  const handleChangeVoice = (event) => {
    utteranceVoiceChange(voices[parseInt(event.target.value, 10)]);
    setSelectedVoiceIndex(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const handleVoicesChanged = () => {
      const allVoices = speechSynthesis.getVoices();
      const defaultVoice = speechSynthesis
        .getVoices()
        .find((voice) => voice.default);
      const voicesStartingWithGoogle = allVoices.filter((voice) =>
        voice.name.toLowerCase().includes("google")
      );

      if (defaultVoice) {
        voicesStartingWithGoogle.unshift(defaultVoice);
      } else {
        console.log("No default voice found.");
      }

      setVoices(voicesStartingWithGoogle);
    };

    speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    // Initial setup when the component mounts
    handleVoicesChanged();

    // Cleanup the event listener when the component unmounts
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  return (
    <span>
      <select value={selectedVoiceIndex} onChange={handleChangeVoice}>
        <option value={null}>Select a voice</option>
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice == speechSynthesis.getVoices().find((voice) => voice.default)
              ? "Default"
              : voice.name}
          </option>
        ))}
      </select>
    </span>
  );
};

export default SpeechSynthesisComp;
