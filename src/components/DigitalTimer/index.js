import {Component} from 'react'
import './index.css'

const StartImage = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PauseImage = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

const initialState = {isActive: false, minutesValue: 25, secondsElapsedValue: 0}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  resetButton = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  timerRunning = () => {
    const {minutesValue, secondsElapsedValue} = this.state

    const timeCompleted = secondsElapsedValue === minutesValue * 60

    if (timeCompleted) {
      this.clearTimeInterval()
      this.setState({isActive: false})
    } else {
      this.setState(prevState => ({
        secondsElapsedValue: prevState.secondsElapsedValue + 1,
      }))
    }
  }

  startPauseButton = () => {
    const {isActive, minutesValue, secondsElapsedValue} = this.state

    const timeCompleted = secondsElapsedValue === minutesValue * 60
    if (timeCompleted) {
      this.setState({secondsElapsedValue: 0})
    }

    if (isActive) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.timerRunning, 1000)
    }

    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  renderStartPauseBtn = () => {
    const {isActive} = this.state
    const IMAGE = isActive ? PauseImage : StartImage
    const ImageAlt = isActive ? 'pause icon' : 'play icon'
    const buttonText = isActive ? 'Pause' : 'Start'

    return (
      <div className="btn-card">
        <button
          type="button"
          className="button"
          onClick={this.startPauseButton}
        >
          <img src={IMAGE} alt={ImageAlt} className="image" />
          <p className="btn-text">{buttonText}</p>
        </button>
      </div>
    )
  }

  renderLimitButton = () => {
    const {minutesValue, secondsElapsedValue} = this.state
    const buttonDisabled = secondsElapsedValue > 0
    return (
      <div className="limit-btn-card">
        <button
          type="button"
          className="minus-plus-button"
          onClick={this.minusButton}
          disabled={buttonDisabled}
        >
          -
        </button>
        <p className="limit-para">{minutesValue}</p>
        <button
          type="button"
          className="minus-plus-button"
          onClick={this.plusButton}
          disabled={buttonDisabled}
        >
          +
        </button>
      </div>
    )
  }

  timerRender = () => {
    const {minutesValue, secondsElapsedValue, isActive} = this.state
    const totalRemainingSeconds = minutesValue * 60 - secondsElapsedValue
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const minValue = minutes > 9 ? minutes : `0${minutes}`
    const secValue = seconds > 9 ? seconds : `0${seconds}`
    const timerText = isActive ? 'Running' : 'Paused'
    return (
      <div className="timer-sm-card">
        <h1 className="time">
          {minValue}:{secValue}
        </h1>
        <p className="para">{timerText}</p>
      </div>
    )
  }

  plusButton = () => {
    this.setState(prevState => ({
      minutesValue: prevState.minutesValue + 1,
    }))
  }

  minusButton = () => {
    const {minutesValue} = this.state
    if (minutesValue > 1) {
      this.setState(prevState => ({
        minutesValue: prevState.minutesValue - 1,
      }))
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>

        <div className="btm-container">
          <div className="timer-card">{this.timerRender()}</div>

          <div className="button-limit-card">
            <div className="buttons-card">
              {this.renderStartPauseBtn()}
              <div className="btn-card">
                <button
                  type="button"
                  className="button"
                  onClick={this.resetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset Icon"
                    className="image"
                  />
                  <p className="btn-text">Reset</p>
                </button>
              </div>
            </div>

            <div className="limit-card">
              <p className="limit-text">Set Timer Limit</p>
              {this.renderLimitButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
