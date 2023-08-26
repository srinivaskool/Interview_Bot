import React, { useEffect, useState } from 'react';

const SpeechSynthesisComp = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const handleChangeVoice = (event) => {
    setSelectedVoiceIndex(parseInt(event.target.value, 10));
  };

  const handleChangePitch = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleChangeRate = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleChangeVolume = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    const allVoices = speechSynthesis.getVoices();
    setVoices(allVoices);
  }, []);

  const handleSpeak = () => {
    if (selectedVoiceIndex !== null) {
      const utterance = new SpeechSynthesisUtterance('Hello, how are you?');
      utterance.voice = voices[selectedVoiceIndex];
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <div>
        <label>Select Voice:</label>
        <select value={selectedVoiceIndex} onChange={handleChangeVoice}>
          <option value={null}>Select a voice</option>
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <span>
        <label>Pitch:</label>
        <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={handleChangePitch} />
      </span>
      <span>
        <label>Rate:</label>
        <input type="range" min="0.1" max="10" step="0.1" value={rate} onChange={handleChangeRate} />
      </span>
      <span>
        <label>Volume:</label>
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleChangeVolume} />
      </span>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default SpeechSynthesisComp;
