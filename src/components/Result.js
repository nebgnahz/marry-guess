import React from 'react';
import './Result.css';

const gUrlPrefix = 'https://cloud.githubusercontent.com/assets/941519/';
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
    'image': '21380482/69209964-c70a-11e6-81d3-8957d50d4719',
    'description': 'How brave, bold and creative you are!'
  },
  'castle': {
    'text': 'At a Castle',
    'image': '21380483/6921f99e-c70a-11e6-9e35-a4196b3955e1',
    'description': 'Castle reflects your taste in the class'
  },
  'plane': {
    'text': 'On a plane',
    'image': '21380480/691fec8a-c70a-11e6-8ba3-5c66c0a27520',
    'description': 'What could be more exciting than flying?'
  },
  'rollercoaster': {
    'text': 'On a roller coaster',
    'image': '21380486/6934d9b0-c70a-11e6-8d8c-904876dfd2a8',
    'description': 'Thrilling, suspenseful and exhilarating, that\'s it!'
  },
  'balloon': {
    'text': 'In a hot balloon',
    'image': '21380484/69323854-c70a-11e6-8d61-a6ab29847e6e.jpg',
    'description': 'Higher in the sky.'
  },
  'underwater': {
    'text': 'Under the water',
    'image': '21380485/6933f806-c70a-11e6-9d02-ce92ef6f8ae0',
    'description': 'Smooth, silent, snuggly, and sleek.'
  },
  'glacier': {
    'text': 'On the glacier',
    'image': '21380481/69204e78-c70a-11e6-8769-3f83f4f2b083',
    'description': 'Cool, huh~'
  }
};

const resultText = (name) => gGuessResult[name]['text'];
const resultImage = (name) => gUrlPrefix + gGuessResult[name]['image'] + '.jpg';
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
