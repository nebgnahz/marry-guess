import React, { Component } from 'react';
import './Pending.css';

const gPendingTick = 2000;  // ms
const gPendingText = ['Connecting to your Facebook...\n',
                      'Analyzing your profile...\n',
                      'Defining your personality...\n'];

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: props.done,
      pendingTextIndex: 0,
      pendingStatus: gPendingText[0],
    }

    console.log("pending constructor called");
    setTimeout(this.updatePending.bind(this), gPendingTick);
  }

  updatePending() {
    if (this.state.pendingTextIndex === gPendingText.length - 1) {
      this.state.done();
      return;
    }

    var newIndex = this.state.pendingTextIndex + 1;
    var newStatus = gPendingText[newIndex];
    console.log(newStatus);
    this.setState({
      pendingTextIndex: newIndex,
      pendingStatus: newStatus,
    });
    setTimeout(this.updatePending.bind(this), gPendingTick);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div id="progressbar">
            <div id="progress" >
              <div id="pbaranim">
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <p className="pending-text">{this.state.pendingStatus}</p>
        </div>
        <div id="pending-footer">
          <p className="text-center text-small">Smart Quiz Made by LadyMarry</p>
        </div>
      </div>
    )
  }
}

Pending.propTypes = {
  done: React.PropTypes.func.isRequired
};

export default Pending;
