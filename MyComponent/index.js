import './lib/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  button {
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    font-size: 30px;
    background-color: seagreen;
    color: white;
  }

  span {
    font-size: 24px;
  }

  .video-controls {
    background: rgba(14, 32, 82, 0.8);
    padding: 0 1.5rem;
  }

  #restart {
    border: none;
    background: none;
    color: #000;
  }
  
`;
let template = /*html*/`
    <video id="video" >
    </video>
    <br>
    <div class="video-player">
      <button id="restart"><span class="fa fa-undo"></span></button>
      <div class="video-controls">
        <span id="play"><i class="fa fa-play"></i></span>
        <span id="pause" hidden><i class="fa fa-pause"></i></span>
        <button id="info">GET INFO</button>
        <button id="mb-5s">-5S</button>
        <button id="fwd-5s">+5S</button>
        <button id="speed" >SPEED</button>
        <input type="range" id="volume-bar" title="volume" min="0" max="1" step="0.1" value="1">
        <div class="time">
          <time id="time-elapsed">00:00</time>
          <span> / </span>
          <time id="duration">00:00</time>
        </div>
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

    this.fwd5sButton.onclick = () => {
      this.forward5s();
    }

    this.mb5sButton.onclick = () => {
      this.moveBack5s();
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
}

customElements.define('my-component', MyVideoPlayer);
