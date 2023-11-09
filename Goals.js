import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Goals({  selectedGoals, setSelectedGoals }) {
  const  [goals, setGoals] = useState([]);
  // const [selectedGoals, setSelectedGoals] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setGoals(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const selectedGoal = (goal) => {
    console.log(goal)
    setSelectedGoals(prevGoals => {
      if (prevGoals.includes(goal)) {
        return prevGoals.filter(g => g !== goal);
      } else {
        return [...prevGoals, goal];
      }
    });
  };
  
  return (
    <div className="text-container">
      <h1 id="welcome-heading" className="main-heading">
        My Goals
      </h1>
      <p className="subtext">Set and Achieve Your Goals</p>

      <h2 className="section-heading">Goals</h2>

      <div className="goal-grid">
  {goals.map((goal) => (
    <div className={`goal-item ${selectedGoals.includes(goal) ? 'selected' : ''}`} key={goal.goal_id} onClick={()=>selectedGoal(goal)}>
      <img src={goal.image} alt="Goal" className="goal-item-image" />
      <h3 className="goal-name">{goal.goal_name}</h3>
      <p className="goal-description">{goal.description}</p>
    </div>
  ))}
</div>
<Link to="/profile">Go to Profile</Link>
    </div>
    
  )}

export default Goals;


// setSelectedGoals(prevGoals => {
//   if (prevGoals.includes(goal)) {
//     // If the goal is already selected, remove it from the array
//     return prevGoals.filter(g => g !== goal);
//   } else {
//     // If the goal is not selected, add it to the array
//     return [...prevGoals, goal];
//   }
// })