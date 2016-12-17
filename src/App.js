import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import FacebookButton from './components/FacebookButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      pending: false,
      showResult: false,
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  setSelfLoggedIn() {
    console.log('Setting self as logged in');
    this.setState({
      login: true
    })
  }

  setSelfResult() {
    this.setState({
      pending: false,
      showResult: true,
    })
  }

  responseFacebook(response) {
    console.log(response);
    this.setSelfLoggedIn();
  }

  componentWillMount() {
    console.log('componentWillMount called');
  }

  handleClick(event) {
    console.log('button clicked');
    this.setState({
      pending: true
    })
    setTimeout(this.setSelfResult.bind(this), 1000);
  }

  renderPending() {
    return (
      <div>
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  renderResult() {
    return (
      <div>
        <div className="row">
          <img src="/img/volcano.jpg"
               className="answer-image"
               alt="Volcano Marriage" />
        </div>
        <div className="row">
          <span>Marry near the volcano</span>
        </div>
      </div>
    )
  }

  renderLanding() {
    return (
      <div>
        <Header title="Where could be my perfect wedding venue matches personality?"/>
        {this.state.login &&
         <input className="button" type="submit" value="click to see"
                onClick={(e)=> this.handleClick(e)}/>
        }
        <div className="row">
          <FacebookButton fb={window.FB} callback={this.responseFacebook} />
          <p id="status"></p>
        </div>
      </div>
    )
  }

  render() {
    console.log('render');
    if (this.state.pending) {
      console.log('render pending ' + this.state.pending);
      return this.renderPending();
    } else if (this.state.showResult) {
      console.log('render result')
      return this.renderResult();
    } else {
      return this.renderLanding();
    }
  }
}

export default App;
