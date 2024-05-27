import {create } from "zustand";
export const teachers = ["Nanami", "Naoki"];

export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        message.audioPlayer = null; // New teacher, new Voice
        return message;
      }),
    }));
  },
  classroom: "default",
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  loading: false,
  // furigana: true,
  // setFurigana: (furigana) => {
  //   set(() => ({
  //     furigana,
  //   }));
  // },
  // english: true,
  // setEnglish: (english) => {
  //   set(() => ({
  //     english,
  //   }));
  // },
  speech: "formal",
  setSpeech: (speech) => {
    set(() => ({
      speech,
    }));
  },
  startconvo:async()=>{
    const inimsg = "Hello , You are an HR manager virtual assistant. Your task is to ask questions to the candidate .lets start the interview ,Ask first question .In last message when you  end the interview first character should be rating of the interview 1-10 and end it by saying 'Goodbye!'.";
    set(() => ({
      loading: true,
    }));
    const res = await fetch(`http://localhost:3000/api/v1/startinterview`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: inimsg,
      }),
    });
    console.log(res);
    console.log("interview started");
    const data = await res.json();
    // const message = {
    //   question: inimsg,
    //   id: get().messages.length,
    // };
    const message = {
      question: data.content,
    }
    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    //get().playMessage(message);



  }
  ,
  endInterview:async(messages,rating)=>{
    set(() => ({
      loading: true,
    }));
    const res = fetch(`http://localhost:3000/api/v1/endinterview`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        rating,
      }),
    });
    const data = await res.json();
    console.log("interview ended",data);
    set(() => ({
      loading: false,
    }));
  },
    
  askAI: async (question,fullcontext) => {
    if (!question) {
      return;
    }
    console.log(question);
    console.log(fullcontext);
    const prevmsg = get().messages[get().messages.length - 1];
    prevmsg.answer = question;
    // const message = {
    //   question,
    //   id: get().messages.length,
    // };
    set(() => ({
      loading: true,
    }));

    //const speech = get().speech;

    // Ask AI
    const res  = await fetch(`http://localhost:3000/api/v1/askquestion`,
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: fullcontext,
      }
    )});
    const data = await res.json();
    const message = {
      question: data.content,
    }
    
    // message.answer = data;
    // message.speech = speech;

    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    //get().playMessage(message);
  },
  playMessage: async (message) => {
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));
      // Get TTS
      const audioRes = await fetch(
        `/api/tts?teacher=${get().teacher}&text=${message.answer.japanese
          .map((word) => word.word)
          .join(" ")}`
      );
      const audio = await audioRes.blob();
      const visemes = JSON.parse(await audioRes.headers.get("visemes"));
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.visemes = visemes;
      message.audioPlayer = audioPlayer;
      message.audioPlayer.onended = () => {
        set(() => ({
          currentMessage: null,
        }));
      };
      set(() => ({
        loading: false,
        messages: get().messages.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        }),
      }));
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },
  stopMessage: (message) => {
    message.audioPlayer.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
}));
