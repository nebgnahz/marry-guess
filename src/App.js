import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
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
        <div className="row">
          <input className="button" type="submit" value="click to see"
                 onClick={(e)=> this.handleClick(e)}/>
        </div>;
    } else {
      button =
        <div className="row">
          <FacebookLogin
              className="row"
              appId="1852389581718892"
              autoLoad={true}
              fields="name,email,picture"
              cssClass="button"
              callback={this.responseFacebook} />
        </div>
    }
    return (
      <div>
        <Header title="Where could be my perfect wedding venue matches personality?"/>
        {button}
        <p id="status"></p>
        <ul className="row" id="logmessage" />
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
