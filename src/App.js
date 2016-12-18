import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import FacebookLogin from 'react-facebook-login';
// import FacebookButton from './components/FacebookButton';

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

  setSelfLoggedIn(state) {
    this.log('Setting self as logged in');
    this.setState({
      login: state
    })
  }

  setSelfResult() {
    this.setState({
      pending: false,
      showResult: true,
    })
  }

  responseFacebook(response) {
    this.log(response);
    this.setSelfLoggedIn(true);
  }

  log(message) {
    var timestamp = '[' + Date.now() + '] ';

    var text = timestamp + JSON.stringify(message);
    var node = document.createElement("li");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);

    var log = document.getElementById('logmessage');
    log.appendChild(node);
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
      <div className="row">
        <div className="pending">&nbsp;
          <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  renderResult() {
    return (
      <div className="answer">
        <div className="row">
          <img src="./img/volcano.jpg"
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
    let button = null;
    console.log("renderLanding");
    console.log(this.state.login);
    if (this.state.login) {
      button =
        <input className="button-primary u-full-width" type="submit" value="click to see"
               onClick={(e)=> this.handleClick(e)}/>
    } else {
      button =
        <FacebookLogin
            className="row"
            appId="1852389581718892"
            autoLoad={true}
            fields="name,email,picture"
            cssClass="button-primary u-full-width"
            callback={this.responseFacebook} />
    }
    return (
      <div>
        <div className="row question">
          <p>Where could be my perfect wedding venue that matches personality?</p>
        </div>
        <div className="row">
          {button}
        </div>
        <p id="status"></p>
        <ul className="row" id="logmessage" />
      </div>
    )
  }

  render() {
    var page = null;
    console.log('render');
    if (this.state.pending) {
      console.log('render pending ' + this.state.pending);
      page = this.renderPending();
    } else if (this.state.showResult) {
      console.log('render result')
      page = this.renderResult();
    } else {
      page = this.renderLanding();
    }

    return (
      <div>
        <Header title="Marry Guess"/>
        <div className="container">
          <div className="row">
            <Card image="./img/volcano.jpg"
                  title="Where is your perfect place for marriage?"
                  content="Play to see where is the best place for you marriage"
                  link="#"
                  action="play" />
          </div>
          {page}
        </div>
      </div>
    )
  }
}

export default App;
