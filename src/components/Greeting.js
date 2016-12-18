import React from 'react';

function Greeting(props) {
  return (
    <div className="row greeting">
      <span>
        {props.name}, welcome to play Marry Guess!
      </span>
    </div>
  )
}

Greeting.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Greeting;
