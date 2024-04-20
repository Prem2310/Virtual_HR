// import './App.css';
// import { useState } from 'react';
// // import { BsMicFill } from "react-icons/bs";
// // import { RiMicOffFill } from "react-icons/ri";

// function App() {
//   //const api = process.env.REACT_APP_BACKEND_API;
//   const api = 'http://localhost:3000';
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [start, setStart] = useState(true);
//   const [outputText, setOutputText] = useState('');
//   const [isSpeakinguser,setIsSpeakinguser]= useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeakingAI, setIsSpeakingAI] = useState(false);
//   const [recognition, setRecognition] = useState(null);
// const [completion,setCompletion]=useState(false);
//   const questions = [
//     'Tell me about yourself',
//     'What was your percentage in the last semester?',
//     'What\'s the project you have done?',
//     'Why should we hire you?',
//     'Do you have any experience or internship done for the same role?',
//   ];

//   const [inputText, setInputText] = useState(questions[currentQuestionIndex]);
// console.log(inputText);
// const sendresponse = async()=>{
//   try{
//     const response = await fetch(`${api}/api/v1/updateemployee`,{
//       method:'PUT',
//       headers:{
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify({answers:answers})
//     });
//     const data = await response.json();
//     console.log(data);
//   }catch(e){
//     console.log(e);
//     console.log("error in sending response");
//   }
// }
//   const handleAnswer = () => {
//     if (outputText === '') {
//       return;
//     }
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       inputText: outputText,
//     }));
//     console.log(answers);
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     // setInputText(questions[currentQuestionIndex + 1]);
//     setOutputText('');
//     questioncall(currentQuestionIndex);
//   };

//   const handleTextToSpeech = () => {
//     if ('speechSynthesis' in window && !isSpeakingAI) {
//       setIsSpeakingAI(true);
//       const synthesis = window.speechSynthesis;
//       const utterance = new SpeechSynthesisUtterance(inputText);
//       utterance.onend = () => {
//         setIsSpeakingAI(false);
//         if(inputText=="Thank You"){
//           setCompletion(true);
//           sendresponse();
//         }

//       };
//       synthesis.speak(utterance);
//     } else {
//       console.error('Speech synthesis not supported');
//     }
//   };

//   const handleStartListening = () => {
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.onresult = (event) => {
//         const resultIndex = event.resultIndex;
//         const transcript = event.results[resultIndex][0].transcript;
//         setOutputText(transcript);
//       };
//       recognition.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//       };
//       recognition.onend = () => {
//         setIsListening(false);

//       };
//       recognition.start();
//       setIsListening(true);
//       setIsSpeakingAI(false);
//       setRecognition(recognition);
//     } else {
//       console.error('Speech recognition not supported');
//     }
//   };

//   const handleStopListening = () => {
//     if (recognition) {
//       recognition.stop();
//       setRecognition(null);
//     }
//   };
//   const questioncall = async(prevres="")=>{
//     try{
//       const response = await fetch( `${api}/api/v1/getquestion`,{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify({currentQuestionIndex:currentQuestionIndex, previousResponse:prevres})
//       });
//       const data = await response.json();
//       console.log(data);
//       setInputText(data.question);
//       handleTextToSpeech();

//     }catch(e){
//       console.log(e);
//       console.log("error in fetching question");

//     }
//   }
//   const startInterview = () => {
//     setCurrentQuestionIndex(0);
//     setAnswers({});
//     questioncall();
//     setStart(false);

//   }
//   return (

//     <div className='App'>
//       <h1>Virtual Assistant</h1>
//       {
//         completion?<h1>Thank You</h1>:<>
//       <div>
//       { !start && <button type="button" onClick={()=>startInterview}>Start Interview</button>}
//       </div>
//       <div>
//       {start &&
//           <div>
//               <button type="button"
//               onClick={()=>isSpeakinguser?handleStopListening:handleStartListening }
//               className={`${isSpeakingAI}?"disabled":"visible"` }>
//                 {`${isSpeakinguser}?"Answer":"Stop"`}
//               </button>
//               <button type="button" onClick={()=>handleAnswer}>Done</button>
//           </div>

//           }
//       </div>
//       </>
//       }
//     </div>

//   );
// }

// export default App;

// {/* {currentQuestionIndex < questions.length ? (
//   <>
//     <div className='flex gap-2'>
//       <p>{questions[currentQuestionIndex]}</p>
//       <button
//         onClick={handleTextToSpeech}
//         className={`${isSpeaking ? 'disabled' : 'visible'}`}
//       >
//         {isSpeaking ? <RiMicOffFill /> : <BsMicFill />}
//       </button>

//     </div>
//     <div className='flex gap-2'>
//       <button onClick={isListening ? handleStopListening : handleStartListening}
//       className='bg-slate-900 text-white px-3 py-2  rounded-md'>

//         {isListening ? 'Stop Listening' : 'Start Listening'}

//       </button>
//       <button
//         onClick={handleAnswer}
//         className={`${isListening || isSpeaking ? 'disabled' : 'visible'}`}
//         disabled={isListening || isSpeaking}
//       >
//         Submit
//       </button>
//     </div>
//   </>
// ) : (
//   <p>Thank you for your responses!</p>
// )} */}
// {/* <hr /> */}
// {/* <h3>Answers:</h3>
// { currentQuestionIndex === questions.length  && Object.entries(answers).map(([question, answer]) => (
//   <div key={question}>
//     <h4>{question}</h4>
//     <p>{answer}</p>
//   </div>
// ))} */}
import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { useState } from "react";

function App() {
  const api = "http://localhost:3000";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [start, setStart] = useState(true);
  const [outputText, setOutputText] = useState("");
  const [isSpeakinguser, setIsSpeakinguser] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [completion, setCompletion] = useState(false);
  const [inputText, setInputText] = useState("");
  const questions = [
    "Tell me about yourself",
    "What was your percentage in the last semester?",
    "What's the project you have done?",
    "Why should we hire you?",
    "Do you have any experience or internship done for the same role?",
  ];

  const sendResponse = async () => {
    try {
      const response = await fetch(`${api}/api/v1/updateemployee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answers }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
      console.log("Error in sending response");
    }
  };

  const handleAnswer = () => {
    if (outputText === "") {
      return;
    }
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      inputText: outputText,
    }));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setOutputText("");
    questionCall(questions[currentQuestionIndex]);
  };

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window && !isSpeakingAI) {
      setIsSpeakingAI(true);
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(
        questions[currentQuestionIndex]
      );
      utterance.onend = () => {
        setIsSpeakingAI(false);
        if (questions[currentQuestionIndex] === "Thank You") {
          setCompletion(true);
          sendResponse();
        }
      };
      synthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported");
    }
  };

  const handleStartListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        setOutputText(transcript);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
      setIsListening(true);
      setIsSpeakingAI(false);
      setRecognition(recognition);
    } else {
      console.error("Speech recognition not supported");
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const questionCall = async (prevRes = "") => {
    try {
      const response = await fetch(`${api}/api/v1/getquestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentQuestionIndex: currentQuestionIndex,
          previousResponse: prevRes,
        }),
      });
      const data = await response.json();
      setInputText(data.question);
      handleTextToSpeech();
    } catch (e) {
      console.log(e);
      console.log("Error in fetching question");
    }
  };

  const startInterview = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    questionCall();
    setStart(false);
  };

  return (
    <div className="App">
      <Login />
      <SignUp />

      <h1>Virtual Assistant</h1>
      {completion === true ? (
        <h1>Thank You</h1>
      ) : (
        <>
          <div>
            {!start && (
              <button type="button" onClick={startInterview}>
                Start Interview
              </button>
            )}
          </div>
          <div>
            {start && (
              <div>
                <button
                  type="button"
                  onClick={
                    isSpeakinguser ? handleStopListening : handleStartListening
                  }
                >
                  {isSpeakinguser ? "Stop" : "Answer"}
                </button>
                <button type="button" onClick={handleAnswer}>
                  Done
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
