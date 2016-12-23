import React from 'react';
import './Result.css';

const gUrlPrefix = 'http://ladymarry.xyz';
const gResultArray = ['volcano',
                      'castle',
                      'plane',
                      'rollercoaster',
                      'balloon',
                      'underwater',
                      'glacier'];
const gGuessResult = {
  'volcano': {
    'text': 'Marry at a volcano',
    'description': 'How brave, bold and creative you are!'
  },
  'castle': {
    'text': 'At a Castle',
    'description': 'Castle reflects your taste in the class'
  },
  'plane': {
    'text': 'On a plane',
    'description': 'What could be more exciting than flying?'
  },
  'rollercoaster': {
    'text': 'On a roller coaster',
    'description': 'Thrilling, suspenseful and exhilarating, that\'s it!'
  },
  'balloon': {
    'text': 'In a hot balloon',
    'description': 'Higher in the sky.'
  },
  'underwater': {
    'text': 'Under the water',
    'description': 'Smooth, silent, snuggly, and sleek.'
  },
  'glacier': {
    'text': 'On the glacier',
    'description': 'Cool, huh~'
  }
};

const resultText = (name) => gGuessResult[name]['text'];
const resultImage = (name) => gUrlPrefix + '/img/places/' + name + '.png';
const resultDescription = (name) => gGuessResult[name]['description'];

const hashCode = (str) => {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function Result(props) {
  var index = hashCode(props.username) % gResultArray.length;
  var result = gResultArray[index];

  console.log(result);
  var postLike = function() {
    console.log("posting my like");
    window.FB.ui({
      method: 'feed',
      link: resultImage(result),
      caption: resultText(result),
      description: resultDescription(result)
    }, function(response){});
  }

  return (
    <div className="answer">
      <div className="row">
        {props.username ? props.username + ', here' : 'Here'} is your perfect wedding venue:
      </div>
      <div className="row">
        <span>{resultText(result)}</span>
      </div>
      <div className="row">
        <img className="answer-image"
             src={resultImage(result)}
             role="presentation" />
      </div>
      <div className="row">
        <p>{resultDescription(result)}</p>
      </div>
      <div className="row">
        <button className="button-primary" id="share-button"
                onClick={postLike}>
          <i className="fa fa-facebook-square"></i>
          <span>Share on Facebook</span>
        </button>
      </div>
      <div className="row" id="ladymarry">
        Enter an estimate date, and get a customized wedding checklist on <a href="https://ladymarry.com">LadyMarry</a> App. Download the app and create one Today!
      </div>
      <div id="app-store" className="row twelve columns">
        <ul>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.fotavo.todolist.ladymarry"
               target="_blank">
              <img className="half" src="./img/google_play01.png" role="presentation"/>
            </a>
          </li>
          <li>
            <a href="https://itunes.apple.com/cn/app/wedding-planner-ladymarry/id1021083723"
               target="_blank">
              <img className="half" src="./img/app_store01.png" role="presentation"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

Result.propTypes = {
  username: React.PropTypes.string.isRequired,
};

export default Result;
