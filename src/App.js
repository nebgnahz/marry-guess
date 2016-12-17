import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
    };
  }

  componentWillMount() {
    console.log('componentWillMount called');
  }

  render() {
    return (
      <div>
        <Header title="Where could be my perfect wedding venue matches personality?"/>
        <input className="button-primary" type="submit" value="click to see"/>
      </div>
    );
  }
}

export default App;
