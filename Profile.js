import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Profile({ onLogout, selectedGoals, setSelectedGoals, entries  }) { //set selected goals here??
  const [user, setUser] = useState(null);
  const [userEntries, setUserEntries] = useState([]);
  //const [selectedGoals, setSelectedGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const loggedInUsername = localStorage.getItem("loggedInUsername");
  const loggedinUserId = localStorage.getItem("loggedinUserId");
  const loggedInUserImage = localStorage.getItem("loggedInUserImage")
 const loggedInUserEntries = localStorage.getItem("loggedInUserImage")


  useEffect(() => {
      if (!loggedInUsername) {
        setError("Logged in username not provided");
        setLoading(true);
        return;
      }

      
      fetch('URL')
      .then(r=>r.json())
      .then(entries => {
        console.log(entries)
        // const selected = userData.selectedGoals || [];
        // setSelectedGoals(goalsData.filter(goal => goal.user_id === loggedinUserId));
        setLoading(false);
      })
      fetch('URL')
      .then(r=>r.json() )
      .then(goals =>{
        console.log(selectedGoals)
        setLoading(false);
      
      })
        // Fetch user information, entries, and goals in parallel
        // const [entriesRes, goalsRes] = await Promise.all([
        //   fetch(`http://localhost:3000/Entries`),
        //   fetch(`http://localhost:3000/Goals`)
        // ]);

        // Check if all responses are ok
        // if (!entriesRes.ok || !goalsRes.ok) {
        //   throw new Error('Failed to fetch data');
        // }

        // Parse JSON for all responses
        // const [userData, entriesData, goalsData] = await Promise.all([
        //   entriesRes.json(),
        //   goalsRes.json()
        // ]);

        // setUser(userData);
        // setUserEntries(entriesData);

    //     Filter selected goals
    //     const selected = userData.selectedGoals || [];
    //     setSelectedGoals(goalsData.filter(goal => selected.includes(goal.id)));
    //   } 
    //   catch (err) {
    //     console.error('Error:', err);
    //     setError("Error fetching data");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  }, [loggedInUsername]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error)
    return <p>{error}</p>;
  }

  return (
    <div className="profile-card">
      <h1>{loggedInUsername}'s Profile</h1>
      <img
        src={loggedInUserImage}
        alt={`${user?.username}'s profile icon`}
      />
      <h2>Journal Entries</h2>
      <div className="entries-container">
        {entries.length > 0 ? (
          entries.map((entry, index ) => (
            <div key={index} className="entry-card">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Three Things Accomplished:</strong> {entry.three_things_accomplished}</p>
              <p><strong>What Went Well:</strong> {entry.what_went_well}</p>
              <p><strong>What Blocked Progress:</strong> {entry.what_blocked_progress}</p>
              <p><strong>Plan Moving Forward:</strong> {entry.plan_moving_forward}</p>
            </div>
          ))
        ) : (
          <p>No journal entries found.</p>
        )}
      </div>
      <h3>Selected Goals</h3>
      <div className="selected-goals-container">
        {selectedGoals.length > 0 ? (
          selectedGoals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <img src={goal.image} alt={goal.name} className="goal-image" />
              <h4>{goal.goal_name}</h4>
              <p>{goal.description}</p>
            </div>
          ))
        ) : (
          <p>No goals selected.</p>
        )}
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;
