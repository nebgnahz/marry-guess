import React from 'react';

function Header(props) {
  return (
    <div className='header'>
      <a href="">
        <img className="header-image filter"
             src="./img/logo.png"
             role="presentation"/>
      </a>
      <p className='header-subtitle'>{props.subtitle}</p>
    </div>
  )
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired
};

export default Header;
