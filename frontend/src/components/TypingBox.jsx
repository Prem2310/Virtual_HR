// import { useAITeacher } from '../hooks/useAITeacher';
import { useState } from "react";
import { BsMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
export const TypingBox = () => {
  const questions = [
    'Tell me about yourself',
    'What was your percentage in the last semester?',
    "What's the project you have done?",
    'Why should we hire you?',
    'Do you have any experience or internship done for the same role?',
  
  ]
  const [endconvo, setEndconvo] = useState(false);
  // const askAI = useAITeacher((state) => state.askAI);
  // const loading = useAITeacher((state) => state.loading);
  const [question, setQuestion] = useState(questions[0]);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [start, setStart] = useState(true);
  const [savedTextObject, setSavedTextObject] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const api = "http://localhost:3000";




   const handleStartListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    setRecognition(recognition);
  };




  const update = async () => {
    try{
      
      const updateans = await fetch(`${api}/update`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              savedTextObject
            }),
          });
          console.log(updateans);
          console.log(savedTextObject);
        }catch(err){
          console.log(err);
        }
    }
    const handleStart = async () => {
      handleTextToSpeech();
      //  const currentIndex = questions.indexOf(question);
      // setQuestion(questions[currentIndex + 1]);
      setStart(false);
    }
    
  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };
  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(question);
      synthesis.speak(utterance);
       // Set output text to be displayed
    } else {
      console.error('Speech synthesis not supported');
    }
  };
  const handleSaveText = () => {
  setSavedTextObject((prev) => {
    const newTextObject = { "question":question, "answer":inputText };
    if (!prev) {
      return savedTextObject[newTextObject];
    }
    return [...prev, newTextObject];
  });

  // Logic for updating the question
  if (questions && questions.length > 0) {
    const currentIndex = questions.indexOf(question);
    if (currentIndex < questions.length - 1) {
      handleTextToSpeech();
      setQuestion(questions[currentIndex + 1]);
      
    }
    setInputText("");
  }

  // Logic for ending the conversation
  const newcurrentIndex = questions.indexOf(question);
  if (newcurrentIndex === questions.length - 1) {
    setEndconvo(true);
    update();
    return;
  }
};

  
  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr  from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4  backdrop-blur-md rounded-xl border-slate-100/30 border">
      {endconvo===false?
      <div className='flex justify-center flex-col items-center'>
        <button onClick={handleStart} className={`${start===false?"disabled":"visible"}`}>{start?"Start the Interview":question}</button>
         <button onClick={isListening ? handleStopListening : handleStartListening} className='w-10 h-10 '>
          {isListening ? <BsMicFill/> : <BsFillMicMuteFill/>}
        </button>
        <p>{inputText}</p>
        <button onClick={handleSaveText}>Submit</button>

      </div>:<h1>Thankyou</h1>}

      {/* {loading ? (
        <div className="flex justify-center items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="gap-3 flex">
          <input
            className="focus:outline focus:outline-white/80 flex-grow bg-slate-800/60 p-2 px-4 rounded-full text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60"
            placeholder="Have you ever been to Japan?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ask();
              }
            }}
          />
          <button
            className="bg-slate-100/20 p-2 px-6 rounded-full text-white"
            onClick={ask}
          >
            Ask
          </button>
        </div>
      )} */}
    </div>
  );
};
