import React, { useState, useEffect } from 'react';
import '../index.css';


function Journal( { loggedInUserEntries  }) {
  const [prompt, setPrompt] = useState({
    
    username: "",
    three_things_accomplished: "",
    what_went_well: '',
    what_blocked_progress: '',
    plan_moving_forward: '',
  });
  const [customEntry, setCustomEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  

  useEffect(() => {
    const username = localStorage.getItem('loggedInUsername');
    setLoggedInUsername(username);
  }, []);
 

  const handlePromptChange = (event, fieldName) => {
    setPrompt({ ...prompt, [fieldName]: event.target.value });
  };

  const handleCustomEntryChange = (event) => {
    setCustomEntry(event.target.value);
  };

  const handleSubmitEntry = () => {
    const entry = {
      ...prompt,
      custom: customEntry,
      date: new Date().toLocaleDateString(),
      username: loggedInUsername,
    };

    fetch('http://localhost:3000/Entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    })
      .then(response => response.json())
      .then(data => {
        setEntries([...entries, entry]);
        setPrompt({
          
          three_things_accomplished: "",
          what_went_well: '',
          what_blocked_progress: '',
          plan_moving_forward: '',
        });
        setCustomEntry('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:3000/Entries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setEntries(data); // assuming the server response is the array of entries
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []); // Empty dependency array to run only on mount
  

  return (
    <div className="text-container">
      <h1>My Journal</h1>

      <h2>Reflection</h2>
      <div>
        <label>Three Things I Accomplished This Week</label>
        <textarea
          value={prompt.three_things_accomplished}
          onChange={(event) => handlePromptChange(event, 'three_things_accomplished')}
        />
      </div>
      <div>
        <label>What Went Well This Week?</label>
        <textarea
          value={prompt.what_went_well}
          onChange={(event) => handlePromptChange(event, 'what_went_well')}
        />
      </div>
      <div>
        <label>What blocked your progress this week?</label>
        <textarea
          value={prompt.what_blocked_progress}
          onChange={(event) => handlePromptChange(event, 'what_blocked_progress')}
        />
      </div>
      <div>
        <label>What's your plan to overcome these blocks next week?</label>
        <textarea
          value={prompt.plan_moving_forward}
          onChange={(event) => handlePromptChange(event, 'plan_moving_forward')}
        />
      </div>

      {/* Freeform Entry */}
      <h4>Freeform Entry</h4>
      <textarea
        placeholder="Write whatever you want..."
        value={customEntry}
        onChange={handleCustomEntryChange}
      />

      <button onClick={handleSubmitEntry}>Submit Entry</button>
      
    </div>
    
  );
}

export default Journal;