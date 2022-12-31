import Typewriter from 'typewriter-effect/dist/core';
import React, { useState } from 'react'
import './heropage.css';

function Heropage() {
    const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch ('https://ai-rudra-backend.vercel.app/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    })

      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };
  return (
    
    <div className='main-container'>
        {/* <div>
            <p>Ask AiRudra Anything About Programming</p>
        </div> */}
        <div className='home-holder'>
            
            <div className='home-left'>
                <p>Ask AiRudra</p>
                <form onSubmit={handleSubmit}>
                    <div className='text-area'>
                        <textarea
                        placeholder='Ask Here...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className='form-btn'>
                        <button type='submit'>Submit</button>
                    </div>
                    
                </form>
            </div>
            
            <div className='home-right'>
                {response && <div className="answer-holder"><b>AiRudra:</b><p>{response}</p></div>}
            </div>
        </div>
    </div>
  )
}

export default Heropage