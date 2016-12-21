import React from 'react';

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
    'text': 'Next to a volcano',
    'image': '21380482/69209964-c70a-11e6-81d3-8957d50d4719',
    'description': 'Dummy description for volcano'
  },
  'castle': {
    'text': 'At a Castle',
    'image': '21380483/6921f99e-c70a-11e6-9e35-a4196b3955e1',
    'description': 'Dummy description for castle'
  },
  'plane': {
    'text': 'On a plane',
    'image': '21380480/691fec8a-c70a-11e6-8ba3-5c66c0a27520',
    'description': 'Dummy description for plane'
  },
  'rollercoaster': {
    'text': 'On a roller coaster',
    'image': '21380486/6934d9b0-c70a-11e6-8d8c-904876dfd2a8',
    'description': 'Dummy description for rollercoaster'
  },
  'balloon': {
    'text': 'In a hot balloon',
    'image': '21380484/69323854-c70a-11e6-8d61-a6ab29847e6e.jpg',
    'description': 'Dummy description for balloon'
  },
  'underwater': {
    'text': 'Under the water',
    'image': '21380485/6933f806-c70a-11e6-9d02-ce92ef6f8ae0',
    'description': 'Dummy description for underwater'
  },
  'glacier': {
    'text': 'On the glacier',
    'image': '21380481/69204e78-c70a-11e6-8769-3f83f4f2b083',
    'description': 'Dummy description for glacier'
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
      caption: resultText(result) + ':' + resultDescription(result)
    }, function(response){});
  }
  
  return (
    <div className="answer">
      <div className="row answer-text">
        <span>{resultText(result)}</span>
      </div>
      <div className="row">
        <img className="answer-image"
             src={resultImage(result)}
             role="presentation" />
      </div>
      <div className="row">
        <span>{resultDescription(result)}</span>
      </div>
      <div className="row">
        <input className="button-primary u-full-width share-button"
               type="submit"
               value="Share on Facebook"
               onClick={() => postLike()} />
      </div>
      <div className="row ladymarry">
        Brought to you by <a href="https://ladymarry.com">LadyMarry</a>, an app helping you plan your wedding anywhere, anytime.
      </div>
      <div id="app-store" className="twelve columns">
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
