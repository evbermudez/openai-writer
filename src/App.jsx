import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [textQuery, setTextQuery] = useState('');

  const handleTextQueryChange = (e) => {
    setTextQuery(e.target.value);
  };

  const handleOpenAICall = async () => {
    console.log('submit');

    const endpointUrl = import.meta.env.VITE_OPENAPI_ENDPOINT_URL;
    const apiKey = import.meta.env.VITE_OPENAPI_API_KEY;

    // The body of your request (e.g., a prompt for GPT-3)
    const requestBody = {
      prompt: textQuery,
      max_tokens: 60
    };

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error calling OpenAPI:", error);
      res.status(500).json({ error: "Failed to call OpenAPI" });
    }
  };

  return (
    <div>
      <textarea 
        value={textQuery} 
        onChange={handleTextQueryChange} 
        placeholder="Enter instructions here..."
      />
      <button onClick={() => {handleOpenAICall}}>
        Submit
      </button>
    </div>
  );
}

export default App
