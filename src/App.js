import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Greeting from './components/Greeting';
import Pending from './components/Pending';
import Result from './components/Result';
import Card from './components/Card';
import FacebookLogin from 'react-facebook-login';
// import FacebookButton from './components/FacebookButton';

const gAppName = 'Marry Guess';
const gQuizTitle = 'Where shall I say "I Do"?';
const gQuizContent = 'Where could be my perfect wedding site that fits personality?';
const gClickButton = 'let\'s find out';

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
    // starting from here, we enter pending state
    console.log('button clicked');
    this.setState({
      pending: true
    })
  }

  renderPending() {
    return (
      <Pending done={this.setSelfResult.bind(this)}/>
    )
  }

  renderResult() {
    var getRandom = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
      <div>
        <Result index={getRandom(0, 7)} />
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
            fields="name,email,picture,publish_actions"
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
              title={gQuizTitle}
              content={gQuizContent}
              link="#"
              enabled={isLoggedIn} />
        <br />
        <input className="button-primary u-full-width"
               type="submit"
               value={gClickButton}
               onClick={()=> this.handleClick()} />
      </div>
    )
  }

  render() {
    var page = null;
    if (this.state.pending) {
      page = this.renderPending();
    } else if (this.state.showResult) {
      page = this.renderResult();
    } else {
      page = this.renderLanding();
    }

    return (
      <div>
        <Header title={gAppName}/>
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
