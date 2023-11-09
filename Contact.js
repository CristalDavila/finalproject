import React from 'react';
import { Component } from 'react'


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      feedback: '',
      successMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      name: this.state.name,
      request: this.state.request,
    };
    
    //Lets a user submit their feedback.

    fetch('URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMessage: 'Feedback sent. Thank you!',
            name: '',
            request: '',
            timeframe: ''
          });

        } else {
          console.error('Feedback submission failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
 

  render() {
    return (
      <div className="text-container">
        <h2>Feedback</h2>
        <p>goalapp@email.com</p>
        <img src="/assets/siteicons/heart.jpg" alt="'Sup." />
        <p>Let us know how we can improve!</p>

        {this.state.successMessage && <p style={{ color: 'green' }}>{this.state.successMessage}</p>}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <input
          type="email"
          name="email"
          placeholder="your email"
          />
          <input
            type="text"
            name="feedback"
            placeholder="Constructive Feedback"
            value={this.state.feedback}
            onChange={this.handleInputChange}
          />
          <button type="submit">Send Feedback</button>
        </form>
      </div>
    );
  }
}

export default Contact;
