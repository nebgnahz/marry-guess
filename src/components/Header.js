import React from 'react';

function Header(props) {
  return (
    <div className="row">
      <h1 className="title">
        {props.title}
      </h1>
    </div>
  )
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
