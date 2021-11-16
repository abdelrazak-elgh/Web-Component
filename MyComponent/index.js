const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

*{ box-sizing: border-box; }

/* buttons */

  button {
    background-color: transparent;
    border: none;
    border-radius: 50px;
    cursor: pointer;
  }

  button:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  i {
    color: #fff;
  }

  #play, #pause{
    font-size:0.9em;
    margin-left: -0.5em;
  }

  #v-on, #v-off, #fullscreen{
    font-size:1.1em;
  }

  #v-off {
    padding-right: 0.5em;
  }

  #fullscreen {
    margin-right: -0.5em;
  }

  /* video container */

  .video {
    width: 100%;
  height: auto;
  }

  .video-container {
    position: relative;
    //overflow: hidden;
    margin: auto;
    width: fit-content;
    display: flex;
    //border: 2px solid green;
  } 

  .video-container:hover .video-controls{
    transform: translateY(0);
  }

  .video-controls {
    //background: rgba(0, 0, 0, 0.1);
    //background: linear-gradient(#538FFB00, #5B54FA50);
    background: linear-gradient(#242b2e00, #242b2e);
    padding: 0.2rem 1rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    transition: .3s;
    //border: 1px dashed red;
  }

  .video-progress {
    position: relative;
    display:flex;
    width: 100%;
    height: 5px;
    transition: .3s;
    background: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.5em;
    cursor: pointer;
  }

  .video-progress-filled {
    width: 0;
    background: white;
  }

  .control-items {
    //border: 2px dashed black;
    display: flex;
    flex-direction: row;
    margin: 1rem 1rem;
  }

  .control-bar-left {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    //border: 2px solid blue;
  }

  .control-bar-right {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-end;
    //border: 2px solid blue;
  }

  .child1 {
    display: flex;
    align-items: center;
    //border: 1px dashed yellow;
    color: #fff;
  }

  .child1 *{
    margin: 0 0.5em;
  }

  .time {
    font-size:0.8em;
    color: #fff;
    text-align : center;
    font-family: Arial, Helvetica, sans-serif;
    display: felx;
    align-items: center;
    justify-content: center;
  }

  /* input range */

  .volumebar {
    display: none;
    width: fit-content;
    overflow: hidden;
    padding: 0.2em 0;
  }
  
  .volume-setting:hover  .volumebar {
    display:flex;
    margin-left: -1em;
    animation-direction: reverse;
    -webkit-animation: fadeIn 0.1s linear;
    animation: fadeIn 0.5s linear;
  }

  .volume-setting:hover{
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }

  .custom-slider {
    -webkit-appearance: none;
    width: 70px;
    height: 0.3em;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-image: linear-gradient(#fff, #fff);
    background-size: 50% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
    
  .custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0.8em;
    width: 0.8em;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 2px 0.5px #000;
  }
    
  .custom-slider::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  /* animation */

  @-webkit-keyframes fadeIn {
    from { width: 0%; }
      to { width: 70px; }
  }

  @keyframes fadeIn {
    from { width: 0%; }
    to { width: 70px; }
  }
`;

let template = /*html*/`
    <div class="video-container">
      <video class="video"></video>
      <!--<button id="restart"><i class="fa fa-undo"></i></button>-->
    
      <div class="video-controls">
        <div class="control-items">
          <div class="control-bar-left">
            <div class="child1">
              <button id="play"><i class="fa fa-play"></i></button>
              <button id="pause" hidden><i class="fa fa-pause"></i></button>
              <button id="mb-5s"><i class="fa fa-fast-backward"></i></button>
              <button id="fwd-5s"><i class="fa fa-fast-forward"></i></button>
            </div>

            <!--<div class="volume-setting child1">
              <button id="v-on"><i class="fa fa-volume-up"></i></button>
              <button id="v-off" hidden ><i class="fa fa-volume-off"></i></button>
              <div class="volumebar child1">
                <input type="range" 
                  class="custom-slider" 
                  title="volume"
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value="0.5"
                >
              </div>
            </div>-->

            <div class="time child1">
              <time id="time-elapsed">00:00</time>
              <span>/</span>
              <time id="duration">00:00</time>
            </div>
          </div>

          <div class="control-bar-right">
            <div class="volume-setting child1">
              <button id="v-on"><i class="fa fa-volume-up"></i></button>
              <button id="v-off" hidden ><i class="fa fa-volume-off"></i></button>
              <div class="volumebar child1">
                <input type="range" 
                  class="custom-slider" 
                  title="volume"
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value="0.5"
                >
              </div>
            </div>
            <div class="child1">
              <button id="fullscreen" aria-label="fullscreen"><i class="fa fa-expand"></i></button>
            </div>
          </div>
        </div>
        <div class="video-progress">
          <div class="video-progress-filled"></div>
        </div>
      </div>
      <!--<div>
        <button id="info">GET INFO</button>
        <button id="speed" >SPEED</button>
        
      </div>-->
    </div>
   `;

export default class MyVideoPlayer extends HTMLElement {
  constructor() {
    super();
    console.log("BaseURL = " + getBaseURL());
    const shadow = this.attachShadow({ mode: 'open' });
    let isMute = false;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;

    // recuperation des elements du shadow
    this.videoContainer = this.getSDom('.video-container');
    this.video = this.getSDom('.video');
    this.timeElapsed = this.getSDom('#time-elapsed');
    this.duration = this.getSDom('#duration');
    this.rangeInput = this.getSDom('.custom-slider');
    this.progress = this.getSDom('.video-progress');
    this.progressBar = this.getSDom('.video-progress-filled');

    this.playButton = this.getSDom('#play');
    this.pauseButton = this.getSDom('#pause');
    this.fwd5sButton = this.getSDom('#fwd-5s');
    this.mb5sButton = this.getSDom('#mb-5s');
    //this.spdButton = this.getSDom('#speed');
    this.volumeOn = this.getSDom('#v-on');
    this.volumeOff = this.getSDom("#v-off");
    this.fullScreenButton = this.getSDom('#fullscreen');

    // récupération de l'attribut HTML
    this.video.src = this.getAttribute("src");

    // initialisation du volume de la video par default
    this.video.volume = this.rangeInput.value;

    // configuration des ecouteurs sur les boutons
    this.listenerConfiguration();
  }

  getSDom(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  listenerConfiguration() {
    this.playButton.onclick = () => {
      this.play();
      this.pauseButton.hidden = false;
      this.playButton.hidden = true;
    }

    this.pauseButton.onclick = () => {
      this.pause();
      this.pauseButton.hidden = true;
      this.playButton.hidden = false;
    }

    this.mb5sButton.onclick = () => {
      this.moveBack5s();
    }

    this.fwd5sButton.onclick = () => {
      this.forward5s();
    }

    /*this.spdButton.onclick = () => {
      this.speed();
    }*/

    this.volumeOn.onclick = () => {
      this.mute();
      this.handleRangeUI(this.rangeInput, this.video.volume);
      this.volumeOn.hidden = true;
      this.volumeOff.hidden = false;
    }

    this.volumeOff.onclick = () => {
      this.unMute();
      this.handleRangeUI(this.rangeInput, this.video.volume);
      this.volumeOn.hidden = false;
      this.volumeOff.hidden = true;
    }

    this.fullScreenButton.onclick = () => {
      this.fullScreen();
    }

    this.video.onloadedmetadata = () => {
      this.initializeVideo();
    }

    this.video.ontimeupdate = () => {
      this.updateTimeElapsed();
      this.updateProgressBar();
    }

    this.rangeInput.oninput = (e) => {
      this.handleInputChange(e);
    }

    this.progress.onclick = (e) => {
      this.handleInputProgress(e);
    }
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  forward5s() {
    this.video.currentTime += 5;
  }

  moveBack5s() {
    this.video.currentTime -= 5;
  }

  /*speed() {
    this.video.playbackRate += 0.5;
  }*/

  mute() {
    this.currentVolume = this.video.volume;
    this.video.volume = 0;
    this.rangeInput.value = 0;
  }

  unMute() {
    this.video.volume = this.currentVolume;
    this.rangeInput.value = this.currentVolume;
  }

  fullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (this.videoContainer.webkitRequestFullscreen) {
      this.videoContainer.webkitRequestFullscreen();
    } else {
      this.videoContainer.requestFullscreen();
    }
  }

  formatTime(timeInSeconds) {
    let result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  initializeVideo() {
    console.log(this.video.duration);
    let videoDuration = Math.round(this.video.duration);
    let time = this.formatTime(videoDuration);
    this.duration.innerText = `${time.minutes}:${time.seconds}`;
  }

  updateTimeElapsed() {
    const time = this.formatTime(Math.round(this.video.currentTime));
    this.timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  }

  updateProgressBar() {
    const percentage = (this.video.currentTime / this.video.duration) * 100;
    this.progressBar.style.width = `${percentage}%`;
  }

  handleInputChange(e) {
    let target = e.target;
    const min = target.min
    const max = target.max
    const val = target.value
    this.video.volume = val;
    this.handleRangeUI(target, val);
    // console.log(val);
  }

  handleInputProgress(e) {
    const progressTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    this.video.currentTime = progressTime;
  }

  handleRangeUI(element, value) {
    element.style.backgroundSize = (value - element.min) * 100 / (element.max - element.min) + '% 100%';
  }
}

customElements.define('my-component', MyVideoPlayer);

