import React from 'react';

function Card(props) {
  return (
    <div className="card">
      <div className="image">
        <img className="actual-image" src={props.image} role="presentation"/>
        <span className="title">{props.title}</span>
      </div>
      <div className="content">
        <p>{props.content}</p>
      </div>
      <div className="action">
        <a onClick={props.linkClicked}
           className={props.enabled ? '' : 'disabled'}
           href={props.link}>{props.action}</a>
      </div>
    </div>
  )
}

Card.propTypes = {
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  action: React.PropTypes.string.isRequired,
  enabled: React.PropTypes.bool,
  linkClicked: React.PropTypes.func,
};

export default Card;
