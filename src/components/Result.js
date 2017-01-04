import React from 'react';
import './Result.css';

const gUrlPrefix = "https://www.ladymarry.xyz/";
const gResultArray = ['volcano',
                      'castle',
                      'plane',
                      'rollercoaster',
                      'balloon',
                      'underwater',
                      'glacier',
                      'boat',
                      'treehouse',
                      'museum'];

const gGuessResult = {
  'volcano': {
    'text': 'At a Volcano',
    'description': 'how brave and creative you are!'
  },
  'castle': {
    'text': 'At a Castle',
    'description': 'Prince and Princess, live like a dream!'
  },
  'plane': {
    'text': 'On a Plane',
    'description': 'What could be more exciting than flying?'
  },
  'rollercoaster': {
    'text': 'On a Roller Coaster',
    'description': 'Thrilling, suspenseful and exhilarating, that\'s it!'
  },
  'balloon': {
    'text': 'In a Hot Balloon',
    'description': 'Higher in the sky.'
  },
  'underwater': {
    'text': 'Under the Water',
    'description': ''
  },
  'glacier': {
    'text': 'On the Glacier',
    'description': ''
  },
  'boat': {
    'text': 'On a Boat',
    'description': ''
  },
  'treehouse': {
    'text': 'In a Tree House',
    'description': ''
  },
  'museum': {
    'text': 'In a Museum',
    'description': ''
  }
};

const resultText = (name) => gGuessResult[name]['text'];
const shareText = (xxx) => 'OMG! My quiz result is to get married ' + xxx.toLowerCase() +
                         '. lol, check where is yours that fit personality.';
const resultImage = (name) => gUrlPrefix + 'img/places/' + name + '.png';

const hashCode = (str) => {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

function Result(props) {
  var firstName = '';
  var index = 0;
  try {
    firstName = props.username.split(' ').slice(0, -1).join(' ');
    index = hashCode(props.username) % gResultArray.length;
  } catch (e) {
    console.log(e);
  }

  var result = gResultArray[index];

  console.log(result);
  var postLike = function() {
    console.log("posting my like");
    window.FB.ui({
      method: 'feed',
      link: gUrlPrefix,
      picture: resultImage(result),
      description: shareText(resultText(result)),
      caption: resultText(result),
      user_message_prompt: 'Share Marry Guess with friends!'
    }, function(response) {
      if (response && response.post_id) {
        alert('Post was published.');
      } else {
        alert('Post was not published.');
      }
    });
  }

  return (
    <div className="answer">
      <div className="row">
        <p>{(firstName !== '' ? firstName + ', t' : 'T') + 'he perfect wedding venue for you: '}</p>
      </div>
      <div className="answer-text-box">
        <p>{resultText(result)}</p>
      </div>
      <img className="answer-image-2" src={resultImage(result)}
           role="presentation"/>
      <div className="row">
        <button className="button-primary" id="share-button"
                onClick={postLike}>
          <i className="fa fa-facebook-square"></i>
          <span>SHARE ON FACEBOOK</span>
        </button>
      </div>
      <div className="row" id="ladymarry">
        Enter an estimated date, and get a customized wedding checklist on <a href="https://ladymarry.com">LadyMarry</a> App. Download the app and create one Today!
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
