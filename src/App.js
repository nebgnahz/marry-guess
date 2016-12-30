import React, { Component } from 'react';
import './App.css';
import './components/Landing.css';
import Header from './components/Header';
import Pending from './components/Pending';
import Banner from './components/Banner';
import Result from './components/Result';
import FacebookLogin from 'react-facebook-login';
// import FacebookButton from './components/FacebookButton';

const gAppName = 'LadyMarry';  // Use logo here
const gAppSubtitle = 'Free Virtual Wedding Planner App';
const gClickButton = 'Show Me Now';
const gLogInFbMessage = 'Log in with Facebook to see result';

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
    this.fbClicked = this.fbClicked.bind(this);
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

  fbClicked() {
    if (this.state.login) {
      console.log('clicked fb button and logged in');
      this.handleClick();
    }
  }

  responseFacebook(response) {
    this.log(response);
    console.log(response);

    if (response.name !== '') {
      console.log('valid login');
      this.setState({
        username: response.name,
        login: true,
      });

      // if (response.name === 'Ben Zhang') {
      //   this.setState({
      //     logEnabled: true,
      //   });
      // }

      this.handleClick();
      return;
    }

    if (response.status === undefined || response.status === 'unknown') {
      alert('You must log in Facebook in order to proceed');
      return;
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
    console.log('Start button is clicked, we enter pending state.');
    this.setState({
      pending: true
    })
  }

  renderPending() {
    return (
      <div className="container main">
        <Pending done={this.setSelfResult.bind(this)}/>
      </div>
    )
  }

  renderResult() {
    return (
      <div className="container main">
        <Result username={this.state.username} />
      </div>
    )
  }

  renderFBLogin() {
    return (
      <div className="row">
        <FacebookLogin
            className="row"
            appId="142095429615113"
            fields="name,email,picture"
            cssClass="show-me-now-button"
            textButton={gClickButton}
            onClick={this.fbClicked}
            callback={this.responseFacebook} />
      </div>
    );
  }

  renderLanding() {
    return (
      <div className="main">
        <div className="row">
          <Banner image="./img/where-bg.jpg"/>
        </div>
        <div className="container">
          <div className="row">
            {this.renderFBLogin()}
            <p className="text-center text-small" id="fb-message">{gLogInFbMessage}</p>
          </div>
          <div id="anti-virus">
            <p className="text-small text-center">Antivirus Protected by LadyMarry</p>
          </div>
        </div>
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
        <Header title={gAppName}
                subtitle={gAppSubtitle}/>
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
    )
  }
}

export default App;
