import React, { Component } from 'react';

const gPendingTick = 500;  // ms
const gPendingText = ['Connecting to your Facebook...\n',
                      'Analyzing your public likes and comments...\n',
                      'Defining your personality...\n'];

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: props.done,
      pendingTextIndex: 0,
      pendingStatus: [],
    }

    console.log("pending constructor called");
    setTimeout(this.updatePending.bind(this), gPendingTick);
  }

  updatePending() {
    if (this.state.pendingTextIndex === gPendingText.length) {
      this.state.done();
      return;
    }

    var newIndex = this.state.pendingTextIndex + 1;
    var newStatus = gPendingText[this.state.pendingTextIndex];
    this.setState({
      pendingTextIndex: newIndex,
      pendingStatus: this.state.pendingStatus.concat(newStatus)
    });
    setTimeout(this.updatePending.bind(this), gPendingTick);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="one-third column filler">&nbsp;</div>
          <div className="one-third column filler pending-icon">
            <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
          <div className="one-third column filler">&nbsp;</div>
        </div>
        <div className="row">
          {this.state.pendingStatus.map(function(status){
             return <p className="pending-text">{status}</p>;
           })}
        </div>
      </div>
    )
  }
}

Pending.propTypes = {
  done: React.PropTypes.func.isRequired
};

export default Pending;
