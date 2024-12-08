import { BsMicFill } from 'react-icons/bs'
import React, { useState } from 'react'

const Home = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('JAPANESE');
  const [listening, setListening] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleOutputChange = (e) => {
    setOutput(e.target.value);
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const getEasyJapanese = async() => {
    const response = await fetch('http://localhost:8080/api/v1/easy-japanese', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({input})
    });
    const data = await response.text();
    setOutput(data);
  }

  const getIntent = async () => {
    const response = await fetch('http://localhost:8080/api/v1/express-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({input})
    });
    const data = await response.text();
    setOutput(data);
  }

  const getTranslation = async () => {
    const response = await fetch('http://localhost:8080/api/v1/translate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({language, input})
    });
    const data = await response.text();
    setOutput(data);
  }
  
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = 'ja';

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
  };

  recognition.onend = () => {
    setListening(false);
  };

  return (
    <div className='flex flex-col items-center py-4'>
      <h1 className='text-3xl'>Input</h1>
      <textarea 
        name="input"
        id="input"
        className='w-1/2 h-44 p-4 my-4 border border-gray shadow-md rounded-md'
        placeholder='Enter something...'
        value={input}
        onChange={(e) => handleInputChange(e)}
      />
      <button 
        className='px-4 py-2 flex gap-2 border border-gray shadow-md rounded-md hover:bg-gray'
        // onClick={() => recognition.start()}
      >
        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-red text-white'>
          <BsMicFill />
        </div>
        {listening ? 'Listening...' : 'Voice input'}
      </button>
      <div className='w-1/2 my-4 flex items-center justify-center gap-4'>
        <button 
          className='px-4 py-2 flex gap-2 bg-blue text-white shadow-md rounded-md hover:bg-darkBlue'
          onClick={() => getEasyJapanese()}
        >
          Easy Japanese mode
        </button>
        <button 
          className='px-4 py-2 flex gap-2 bg-blue text-white shadow-md rounded-md hover:bg-darkBlue'
          onClick={() => getIntent()}
        >
          Express intent
        </button>
        or
        <select 
          className='px-4 py-2 flex gap-2 border border-gray shadow-md rounded-md'
          onChange={(e) => handleLanguageChange(e)}
        >
          <option value='JAPANESE'>
            日本語
          </option>
          <option value='VIETNAMESE'>
            Tiếng Việt
          </option>
          <option value='ENGLISH'>
            English
          </option>
        </select>
        <button 
          className='px-4 py-2 flex gap-2 bg-blue text-white shadow-md rounded-md hover:bg-darkBlue'
          onClick={() => getTranslation()}
        >
          Translate
        </button>
      </div>
      <h1 className='text-3xl'>Output</h1>
      <textarea 
        name="output"
        id="output"
        className='w-1/2 h-44 p-4 my-4 border border-gray shadow-md rounded-md'
        placeholder='The output intent expression or translation is displayed here...'
        value={output}
        onChange={(e) => handleOutputChange(e)}
      />
    </div>
  )
}

export default Home