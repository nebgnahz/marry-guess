import React from 'react';
import './Banner.css'

// const gQuizTitle = 'Where shall I say "I Do"?';
// const gQuizContent = 'Where could be my perfect wedding site that fits personality?';

function Banner(props) {
  return (
    <div className="row banner">
      <div className="banner-box">
        <p>Where could be my</p>
        <p className="banner-text-fancy">Perfect Wedding Venue</p>
        <p>that fits personality?</p>
        <div id="white-line"></div>
      </div>
      <img className="banner-image" src={props.image} role="presentation"/>
    </div>
  )
}

Banner.propTypes = {
  image: React.PropTypes.string.isRequired,
};

export default Banner;
