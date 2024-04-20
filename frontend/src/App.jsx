import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
// import { BsMicFill } from "react-icons/bs";

// import { RiMicOffFill } from "react-icons/ri";

function App() {
  //const api = process.env.REACT_APP_BACKEND_API;
  
  return (
    
    <div className='App'>
     <Routes >
     <Route path="/login" component={Login} />
     <Route path="/signup" component={Signup} />
    <Route path="/home" component={Home} />
      </Routes>
      

    </div> 
    
  );
}

export default App;
