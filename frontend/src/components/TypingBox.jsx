
import { useAITeacher } from '../hooks/useAITeacher';
import { useState } from "react";

export const TypingBox = () => {
  // Destructure state and actions from the Zustand store
  const { messages, currentMessage, loading, askAI, startconvo,endInterview} = useAITeacher((state) => ({
    messages: state.messages,
    currentMessage: state.currentMessage,
    loading: state.loading,
    askAI: state.askAI,
    startconvo: state.startconvo,
    endInterview: state.endInterview,
  }));
  //console.log(messages);
 // const oldconvo = messages.filter((message) => message.question === currentMessage?.question);
  
  const [ended, setEnded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [reply, setReply] = useState("");

  const handleStartConvo = async () => {
    setIsStarted(true);
    await startconvo();
  };

  const handleGiveAnswer = async () => {
    //setIsStarted(false);
    console.log("this is the current question",currentMessage.question);
    const fullcontext = [...messages, { question: currentMessage.question, answer: reply }];
    console.log("fullcontext",fullcontext);
    const fullcontextapiformat=[];
    fullcontext.forEach((message)=>{
      if(message.question!==undefined || message.question!==null)fullcontextapiformat.push({role:'system',content:message.question});
      if(message.answer!==undefined || message.answer!==null)fullcontextapiformat.push({role:'user',content:message.answer});
    })
    await askAI(reply,fullcontextapiformat);
    const lastmessage = messages[messages.length-1].question;
    console.log("this is the lastmsg",lastmessage);
    if(lastmessage.endsWith("Goodbye!") || lastmessage.endsWith("Thank you for your time!") || lastmessage.endsWith("Thank you for your time! Good bye!") || lastmessage.endsWith("Good bye!")){
      setReply("");
      setEnded(true);
      setIsStarted(false);
      
      const rating = lastmessage[0];
      await endInterview(messages,rating);
    }
    setReply("");
  }

  return (
    <div className='bg-red-500'>
      {ended && <p>Interview Ended</p>}
      {loading && <p>Loading...</p>}
      <h1>Start</h1>
      {/* {oldconvo.map((message) => (
        <div key={message.id}>
          <p>{message.question}</p>
          <p>{message.answer}</p>
        </div>
      ))} */}
      <br />
      {currentMessage && (
        <div>
          <p>{currentMessage.question}</p>
          <p>{currentMessage.answer}</p>
        </div>
      )}
      {isStarted && !ended && (
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      )}
      <button onClick={isStarted ? handleGiveAnswer : handleStartConvo}>
        {isStarted ? "Reply" : "Start Interview"}
      </button>
    </div>
  );
};
