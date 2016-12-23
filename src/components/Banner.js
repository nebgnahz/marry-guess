import React from 'react';

function Banner(props) {
  return (
    <div className="row">
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
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  action: React.PropTypes.string.isRequired,
  enabled: React.PropTypes.bool,
  linkClicked: React.PropTypes.func,
};

export default Banner;
