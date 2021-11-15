const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  button {
    background-color: transparent;
    border: none;
    padding: 0;
    margin-right: 0.8em;
    cursor: pointer;
  }

  .video-controls {
    background: rgba(14, 32, 82, 0.8);
    padding: 0.2rem 1.5rem;
    display; flex;
    flex-direction: column;
    //border: 1px dashed red;
  }

  .control-items {
    //border: 2px dashed black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .control-items div {
    //margin: 0 1em 0 0;
  }

  .control-bar-left {
    display: flex;
    align-items: center;
  }

  .control-bar-right {
    display: inline-flex;
  }

  .video-controls div {
    vertical-align: middle;
  }

  .child1 {
    display: flex;
    align-items: center;
    border: 1px dashed yellow;
    color: #fff;
  }

  .time {
    font-size:0.8em;
  }

  #video-container {
    margin: auto;
    width: fit-content;
  } 
  
  .volumebar {
    display: none;
    width: fit-content;
    overflow: hidden;
    padding: 0.2em 0;
  }
  
  .volume-setting:hover  .volumebar {
    display:inline-flex;
    margin-right: 1rem;
    -webkit-animation: fadeIn 0.5s;
    animation: fadeIn 0.5s;
  }

  #play, #pause{
    font-size:0.9em;
  }

  #v-on, #v-off, #fullscreen{
    font-size:1.1em;
  }

 #progress progress{
    width: 100%;
    font-size:0.5em;
    margin-bottom: 0.3em;
  }

  /* input range */

.custom-slider {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 70px;
  height: 0.3em;
  background: rgba(000, 000, 000, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(#fff, #fff);
  background-size: 0% 25%;
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
    <div id="video-container">
      <video id="video"></video>
      <!--<button id="restart"><i class="fa fa-undo"></i></button>-->
      <div class="video-controls">

        <div id="progress">
          <progress value="0" min="0">
            <i id="progress-bar"></i>
          </progress>
        </div>

        <div class="control-items">
          <div class="control-bar-left">
            <div class="child1">
              <button id="play"><i class="fa fa-play"></i></button>
              <button id="pause" hidden><i class="fa fa-pause"></i></button>
              <button id="mb-5s">-5S</button>
              <button id="fwd-5s">+5S</button>
            </div>

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

            <div class="time child1">
              <time id="time-elapsed">00:00</time>
              <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
              <time id="duration">00:00</time>
            </div>
          </div>

          <div class="control-bar-right">
            <div class="child1">
              <button id="fullscreen"><i class="fa fa-expand"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button id="info">GET INFO</button>
        <button id="speed" >SPEED</button>
        
      </div>
    </div>
   `;

export default class MyVideoPlayer extends HTMLElement {
  constructor() {
    super();
    console.log("BaseURL = " + getBaseURL());
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;

    // recuperation des elements du shadow
    this.player = this.getSDom('#video');
    this.timeElapsed = this.getSDom('#time-elapsed');
    this.duration = this.getSDom('#duration');
    this.rangeInput = this.getSDom('.custom-slider');

    this.playButton = this.getSDom('#play');
    this.pauseButton = this.getSDom('#pause');
    this.fwd5sButton = this.getSDom('#fwd-5s');
    this.mb5sButton = this.getSDom('#mb-5s');
    this.spdButton = this.getSDom('#speed');

    // récupération de l'attribut HTML
    this.player.src = this.getAttribute("src");

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

    this.spdButton.onclick = () => {
      this.speed();
    }

    this.player.onloadedmetadata = () => {
      this.initializeVideo();
    }

    this.player.ontimeupdate = () => {
      this.updateTimeElapsed();
    }

    this.rangeInput.oninput = (e) => {
      this.handleInputChange(e); 
    }

  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  forward5s() {
    this.player.currentTime += 5;
  }

  moveBack5s() {
    this.player.currentTime -= 5;
  }

  speed() {
    this.player.playbackRate += 0.5;
  }

  formatTime(timeInSeconds) {
    let result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  initializeVideo() {
    console.log(this.player.duration);
    let videoDuration = Math.round(this.player.duration);
    let time = this.formatTime(videoDuration);
    this.duration.innerText = `${time.minutes}:${time.seconds}`;
    this.duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
  }

  updateTimeElapsed() {
    const time = this.formatTime(Math.round(this.player.currentTime));
    this.timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    this.timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
  }

  handleInputChange(e) {
      let target = e.target;
      const min = target.min
      const max = target.max
      const val = target.value
      this.player.volume = val;
      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
      console.log(val);
  }

}

customElements.define('my-component', MyVideoPlayer);

