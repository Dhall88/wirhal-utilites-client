import React, { Component } from "react"

export default class Audio extends Component {
  componentDidMount() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    audioEl.play()
  }

  componentDidUpdate() {
    console.log('in update');
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <audio className="audio-element">
          <source src={this.props.source}></source>
        </audio>
      </div>
    )
  }
}
