import { useState } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [textQuery, setTextQuery] = useState('');
  const [result, setResult] = useState('');

  const handleTextQueryChange = (e) => {
    setTextQuery(e.target.value);
  };

  const handleOpenAICall = async (event) => {
    event.preventDefault();

    const endpointUrl = import.meta.env.VITE_OPENAPI_ENDPOINT_URL;
    const apiKey = import.meta.env.VITE_OPENAPI_API_KEY;

    // The body of your request (e.g., a prompt for GPT-3)
    const requestBody = {
      messages: [
        { 
          role: 'system',
          content: `Help me write about: ${textQuery}` 
        },
        { 
          role: 'user',
          content: textQuery 
        }
      ],
      model: 'gpt-3.5-turbo',
    };

    try {
      const response = await axios.post(endpointUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      });

      const res = response.data.choices[0].message.content;
      console.log(response.data.choices[0]);

      setResult(res);
    } catch (error) {
      if (error.response) {
          console.error('Error Response:', error.response.data);
      } else if (error.request) {
          console.error('Error Request:', error.request);
      } else {
          console.error('Error:', error.message);
      }
   }
  };

  return (
    <div>
      <textarea 
        value={textQuery} 
        onChange={handleTextQueryChange} 
        placeholder="Enter instructions here..."
      />
      <button onClick={handleOpenAICall}>
        Submit
      </button>
      <hr />
      {result && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <strong>result:</strong>
            <p>{result}</p>
          </div>
        )}
    </div>
  );
}

export default App
