import { useState } from 'react'
import axios from 'axios';
import './tailwind.css';
import './App.css'
import Dropdown from './Dropdown';

function App() {
  const [textQuery, setTextQuery] = useState('');
  const [result, setResult] = useState('');
  const [minimumWords, setMinimumWords] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectedCategoryValueChange = (value) => {
    setSelectedCategory(value);
  }

  const handleTextQueryChange = (e) => {
    setTextQuery(e.target.value);
  };

  const handleOpenAICall = async (event) => {
    event.preventDefault();

    const endpointUrl = import.meta.env.VITE_OPENAPI_ENDPOINT_URL;
    const apiKey = import.meta.env.VITE_OPENAPI_API_KEY;
    setMinimumWords('500');
    console.log(`Help me write up  a ${selectedCategory} about ${textQuery} with minimum words of ${minimumWords}. can you make it possible for me to copy and paste easily? with correct spacing`)
    // The body of your request (e.g., a prompt for GPT-3)
    const requestBody = {
      messages: [
        { 
          role: 'system',
          content: `Help me write up  a ${selectedCategory} about ${textQuery} with minimum words of ${minimumWords}. can you make it possible for me to copy and paste easily? with correct spacing` 
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
    <div className='w-full'>
      <Dropdown onValueChange={handleSelectedCategoryValueChange} />
      <hr/>
      {/* <p>Min. words:</p> */}
      <div className="flex flex-col gap-4">
        <textarea 
          className="w-full"
          value={textQuery} 
          onChange={handleTextQueryChange} 
          placeholder="Enter instructions here..."
        />
        <button
          className=''
          onClick={handleOpenAICall}>
          Submit
        </button>
      </div>
      
      <hr />
      {result && (
          <div className="mt-4 p-4 rounded">
            <strong>result:</strong>
            <pre>{result}</pre>
          </div>
        )}
    </div>
  );
}

export default App
