import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Greeting from './components/Greeting';
import Result from './components/Result';
import Card from './components/Card';
import FacebookLogin from 'react-facebook-login';
// import FacebookButton from './components/FacebookButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // app state machine
      login: false,
      pending: false,
      showResult: false,

      // debugging
      logMessage: [],
      logEnabled: false,

      // user information
      username: '',
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
    this.setState({
      username: response.name,
      login: true,
    });

    if (response.name === 'Ben Zhang') {
      // Enable debugging
      this.setState({
        logEnabled: true,
      });
    }
  }

  log(message) {
    var date = new Date();
    var timestamp = '[' + date.getDate() + '/'
                  + (date.getMonth()+1)  + '/'
                  + date.getFullYear() + '@'
                  + date.getHours() + ':'
                  + date.getMinutes() + ':'
                  + date.getSeconds() + '] '
    var text = timestamp + JSON.stringify(message);
    var newLog = this.state.logMessage.concat(text);
    this.setState({
      logMessage: newLog,
    });
  }

  showLog() {
    var logElem = document.getElementById('logmessage');
    while (logElem.hasChildNodes()) {
      logElem.removeChild(logElem.lastChild);
    }
    this.state.logMessage.forEach(m => {
      var textnode = document.createTextNode(m);
      logElem.appendChild(textnode);
      logElem.appendChild(document.createElement("br"));
    });
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
        <div className="one-third column filler">&nbsp;</div>
        <div className="one-third column filler pending">
          <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
          <span className="sr-only">Loading...</span>
          <p className="pending-text">Searching for the answer to the Ultimate Question of Life, the Universe, and Everything</p>
        </div>
        <div className="one-third column filler">&nbsp;</div>
      </div>
    )
  }

  renderResult() {
    return (
      <div>
        <Result image="./img/volcano.jpg"
                text="Marry near the volcano"/>
      </div>
    )
  }

  renderFBLogin() {
    return (
      <div className="row">
        <FacebookLogin
            className="row"
            appId="1852389581718892"
            autoLoad={true}
            fields="name,email,picture"
            cssClass="button-primary u-full-width"
            callback={this.responseFacebook} />
      </div>
    );
  }

  renderLanding() {
    const isLoggedIn = this.state.login;
    return (
      <div className={"row " + (isLoggedIn ? '' : 'disabled')}>
        <Greeting name={this.state.username} />
        <Card image="./img/where-wedding.jpg"
              title="Where is the perfect place for your marriage?"
              content="Play to see where is the best place for you marriage"
              link="#"
              enabled={isLoggedIn}
              action="play"
              linkClicked={() => this.handleClick()}
        />
      </div>
    )
  }

  render() {
    var page = null;
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
          {!this.state.login &&
           this.renderFBLogin()
          }

          {page}

          {this.state.logEnabled &&
           <div>
             <input
                 className="button u-full-width"
                 type="submit"
                 value="debug"
                 onClick={()=> this.showLog()}/>
             <div className="row" id="logmessage" />
           </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
