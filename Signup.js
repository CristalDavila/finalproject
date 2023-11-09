import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    optInForReminders: false,
  });
  const navigate = useNavigate();

  // Array of icons (example paths, replace with your actual paths)
  const profileIcons = [
    'assets/randomicons/bunbun.jpg',
    'assets/randomicons/capy.jpg',
    'assets/randomicons/dog.jpg',
    'assets/randomicons/floppyears.jpg', // Fixed typo here as well
    'assets/randomicons/fox.jpg',
    'assets/randomicons/frog.jpg',
    'assets/randomicons/goodcat.jpg', // Removed extra comma
    'assets/randomicons/littlerhino.jpg',
    'assets/randomicons/llama.jpg',
    'assets/randomicons/racoonmario.jpg',
    'assets/randomicons/doge.jpg',
  ];

  // Function to get a random icon from the array
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * profileIcons.length);
    return profileIcons[randomIndex];
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSignup = () => {
    // Form validation
    if (!formData.username || !formData.password || !formData.email) {
      alert('Please enter a username, password, and email address.');
      return;
    }
    console.log(JSON.stringify(formData));

    // Include the random profile icon in the userData
    const userData = {
      ...formData,
      profileIcon: getRandomIcon(),
    };

    // POST request for a new user account
    fetch('URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        // Handle a successful signup, redirect to the login page
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network or other errors
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div id="signup" className="text-container">
      <h1 id="signup-title">Sign Up</h1>
      <form>
        <div>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="optInForReminders"
              checked={formData.optInForReminders}
              onChange={handleInputChange}
            />
            Opt-in for reminders
          </label>
        </div>
        <div>
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;