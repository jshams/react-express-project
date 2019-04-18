/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';
import OneRandomInput from './OneRandomInput'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // State holds values returned from server
    this.state = {
      about: null,
      message: null,
      min: null,
      max: 100,
      rolls: null,
    }
  }

  componentDidMount() {
    // Use Fetch to call API. The /test route returns a simple string
    // This call in componentDidMount will only be called once
    fetch('/about').then((res) => {
      // stream the response as JSON
      return res.json()
    }).then((json) => {
      console.log(json)
      const { about } = json // Get a value from JSON object
      this.setState({ about }) // Set a value on state with returned value
    }).catch((err) => {
      // Handle errors
      console.log(err.message)
    })

    // Let's call another API
    this.random()
  }

  random() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string. 
    const { max } = this.state
    fetch(`/random/${max}`).then(res => res.json()).then((json) => {
      console.log('>', json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  randomD() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string. 
    const { max } = this.state
    fetch(`/random/sides/${max}`).then(res => res.json()).then((json) => {
      console.log('>', json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  randomRolls() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string. 
    const { max, rolls } = this.state
    fetch(`/random/sides/${max}/rolls/${rolls}`).then(res => res.json()).then((json) => {
      console.log('>', json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  randomRollsRange() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string.
    const { min, max, rolls } = this.state
    fetch(`/random/start/${min}/end/${max}/rolls/${rolls}`).then(res => res.json()).then((json) => {
      console.log('>', json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  fetchMessage() {
    const { min, max, rolls } = this.state
    if ((min != null) && (max != null) && (rolls != null)) this.randomRollsRange()
    else if ((min != null) && (max != null)) this.randomRolls()
    else if (max != null) this.randomD()
  }

  renderMessage() {
    // Used to conditionally render data from server.
    // Returns null if message is null otherwise returns
    // a populated JSX element.
    const { message } = this.state
    if (message === null) {
      return undefined
    }

    return <h1>{message}</h1>
  }

  render() {
    const {
      about,
      min,
      max,
      rolls,
    } = this.state

    return (
      <div className="App">
        <p>
          <strong>About:</strong>
          {about}
        </p>
        <div>{this.renderMessage()}</div>
        <p>
          <input
            type="number"
            placeholder="MINIMUM"
            value={min}
            onChange={e => this.setState({ min: e.target.value })}
          />
          <input
            type="number"
            placeholder="MAXIMUM"
            value={max}
            onChange={e => this.setState({ max: e.target.value })}
          />
          <input
            type="number"
            placeholder="ROLLS"
            value={rolls}
            onChange={e => this.setState({ rolls: e.target.value })}
          />
          <button
            type="button"
            onClick={() => {
              this.fetchMessage()
            }}
          >
            Random
          </button>
        </p>
      </div>
    );
  }
}

export default App;
