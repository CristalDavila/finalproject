import React, { Component } from 'react';

class Resources extends Component {
  constructor() {
    super();

    this.state = {
      resources: [
        {
          title: 'Find A Therapist',
          url: 'https://www.psychology.com/therapist/',
        },
        {
          title: 'Learn How To Meditate',
          url: 'https://www.mindful.org/how-to-meditate/',
        },
        {
          title: 'Free Online Yoga Practice',
          url: 'https://www.doyogawithme.com/',
        },
        {
          title:'Eat Healthy',
          url: 'https://www.cdc.gov/healthyweight/healthy_eating/index.html'

        },
        {
          title:'Play Tetris!',
          url: 'https://tetris.com/play-tetris'

        },
        {
          title:'Random Animals',
          url: 'https://www.randomlists.com/random-animals'
        },
      ],
      newResourceTitle: '',
      newResourceURL: '',
    };
  }

  // Handle changes in the new resource title
  handleTitleChange = (event) => {
    this.setState({ newResourceTitle: event.target.value });
  }

  // Handle changes in the new resource URL
  handleURLChange = (event) => {
    this.setState({ newResourceURL: event.target.value });
  }

  // Add a new resource
  addResource = () => {
    const { resources, newResourceTitle, newResourceURL } = this.state;

    if (newResourceTitle.trim() !== '' && newResourceURL.trim() !== '') {
      this.setState({
        resources: [...resources, { title: newResourceTitle, url: newResourceURL }],
        newResourceTitle: '',
        newResourceURL: '',
      });
    }
  }

  render() {
    const { resources, newResourceTitle, newResourceURL } = this.state;

    return (
      <div className="text-container">
        <h1>Resources</h1>
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a>
            </li>
          ))}
        </ul>

        {/* Add a new resource form */}
        <div>
          <input
            type="text"
            placeholder="Resource Title"
            value={newResourceTitle}
            onChange={this.handleTitleChange}
          />
          <input
            type="text"
            placeholder="Resource URL"
            value={newResourceURL}
            onChange={this.handleURLChange}
          />
          <button onClick={this.addResource}>Add Resource</button>
        </div>
      </div>
    );
  }
}

export default Resources;