import React from 'react';

function Header(props) {
  return (
    <div className='header'>
      <div className='container'>
        <a href="">{props.title}</a>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
