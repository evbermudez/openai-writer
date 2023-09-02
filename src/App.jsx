import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <textarea 
        value={input} 
        onChange={handleInputChange} 
        placeholder="Enter your requirements here..."
      />
      <button onClick={() => {/*handle the OpenAI API call */}}>
        Submit
      </button>
    </div>
  );
}

export default App
