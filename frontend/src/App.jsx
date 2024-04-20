import './App.css';
import { useState } from 'react';
import { BsMicFill } from "react-icons/bs";
import { RiMicOffFill } from "react-icons/ri";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [outputText, setOutputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const questions = [
    'Tell me about yourself',
    'What was your percentage in the last semester?',
    'What\'s the project you have done?',
    'Why should we hire you?',
    'Do you have any experience or internship done for the same role?',
  ];

  const [inputText, setInputText] = useState(questions[currentQuestionIndex]);
console.log(inputText);
  const handleAnswer = () => {
    if (outputText === '') {
      return;
    }
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex]]: outputText,
    }));
    console.log(answers);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setInputText(questions[currentQuestionIndex + 1]);
    setOutputText('');
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window && !isSpeaking) {
      setIsSpeaking(true);
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      synthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const handleStartListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        setOutputText(transcript);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
      setIsListening(true);
      setIsSpeaking(false);
      setRecognition(recognition);
    } else {
      console.error('Speech recognition not supported');
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  return (
    <>
      <h1>Virtual Assistant</h1>
      {currentQuestionIndex < questions.length ? (
        <>
          <div className='flex gap-2'>
            <p>{questions[currentQuestionIndex]}</p>
            <button
              onClick={handleTextToSpeech}
              className={`${isSpeaking ? 'disabled' : 'visible'}`}
            >
              {isSpeaking ? <RiMicOffFill /> : <BsMicFill />}
            </button>
          </div>
          <div className='flex gap-2'>
            <button onClick={isListening ? handleStopListening : handleStartListening}
            className='bg-slate-900 text-white px-3 py-2  rounded-md'>
              {/* {isListening ? <RiMicOffFill /> : <BsMicFill />} */}
              {isListening ? 'Stop Listening' : 'Start Listening'}
              
            </button>
            <button
              onClick={handleAnswer}
              className={`${isListening || isSpeaking ? 'disabled' : 'visible'}`}
              disabled={isListening || isSpeaking}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <p>Thank you for your responses!</p>
      )}
      <hr />
      <h3>Answers:</h3>
      { currentQuestionIndex === questions.length  && Object.entries(answers).map(([question, answer]) => (
        <div key={question}>
          <h4>{question}</h4>
          <p>{answer}</p>
        </div>
      ))}
    </>
  );
}

export default App;
