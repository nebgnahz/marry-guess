import React from 'react';

class FacebookButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1852389581718892',
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });

      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));

      window.FB.Event.subscribe('auth.statusChange',
                                (response) => this.statusChangeCallback(response).bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    this.log("Status change callback");
    this.log(response.status);
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    this.props.callback(response);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
                                                    'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
                                                    'into Facebook.';
    }
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

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
    window.FB.login(this.checkLoginState());
  }

  render() {
    return (
      <div>
        <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="xlarge"
            data-show-faces="false"
            data-auto-logout-link="true"
        >
        </div>
        <div>{this.state.message}</div>
      </div>
    );
  }
};

FacebookButton.propTypes = {
  callback: React.PropTypes.func.isRequired,
};

export default FacebookButton;
