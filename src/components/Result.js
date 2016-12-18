import React from 'react';

function Result(props) {
  return (
    <div className="answer">
      <div className="row">
        <img className="answer-image"
             src={props.image}
             role="presentation" />
      </div>
      <div className="row">
        <span>{props.text}</span>
      </div>
      <div className="row">

        <div className="six columns fb-share-button"
             data-href="https://nebgnahz.github.io/marry-quiz"
             data-layout="button_count"
             data-size="large"
             data-mobile-iframe="true">
          <a className="fb-xfbml-parse-ignore"
             target="_blank"
             href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnebgnahz.github.io%2Fmarry-quiz&amp;src=sdkpreparse">
            <input className="button-primary u-full-width"
                   type="submit"
                   value="Share on Facebook" />
          </a>
        </div>
      </div>
      <div className="row">
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
  image: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};

export default Result;
