import React, { Component } from "react"

export default class Audio extends Component {
  componentDidMount() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <audio className="audio-element">
          <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    )
  }
}
