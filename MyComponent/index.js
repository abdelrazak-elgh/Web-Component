import { style } from './cssTemplate.js';
import { template } from './htmlTemplate.js'

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

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
    this.listVideo = this.shadowRoot.querySelectorAll('.vid');
    this.listVideoDuration = this.shadowRoot.querySelectorAll('.lv-duration');

    this.videoContainer = this.getSDom('.video-container');
    this.videoControls = this.getSDom('.video-controls');
    this.video = this.getSDom('.curVideo');
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
      this.handlePlayButtonChange();
    }

    this.pauseButton.onclick = () => {
      this.handlePlayButtonChange();
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
    }

    this.volumeOff.onclick = () => {
      this.unMute();
      this.handleRangeUI(this.rangeInput, this.video.volume);
    }

    this.fullScreenButton.onclick = () => {
      this.fullScreen();
    }

    this.listVideo.forEach(video => {
      video.onclick = () => {
        this.listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if (video.classList.contains('active')) {
          let src = video.children[0].getAttribute('src');
          this.video.src = src;
        }
      }
    });

    this.progress.onclick = (e) => {
      this.handleInputProgress(e);
    }

    this.video.onloadedmetadata = () => {
      this.initializeVideo();
    }

    /* Event to manage the display of the video duration in the video list */
    this.listVideo.forEach(video => {
      const durationC = video.children[1].children[2];
      video.children[0].onloadedmetadata = () => {
        let videoDuration = Math.round(video.children[0].duration);
        let time = this.formatTime(videoDuration);
        let textnode = document.createTextNode(`${time.minutes}:${time.seconds}`);
        durationC.replaceChild(textnode, durationC.children[0]);
      }
    });

    /* Event to manage the update of time video and progress bar */
    this.video.ontimeupdate = () => {
      this.updateTimeElapsed();
      this.updateProgressBar();
    }

    this.rangeInput.oninput = (e) => {
      this.handleInputChange(e);
    }

    document.onkeyup = (e) => {
      this.keyboardShortcuts(e);
    }
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
    console.log(this.currentVolume);
    this.video.volume = this.currentVolume;
    console.log(this.video.volume);
    this.rangeInput.value = this.currentVolume;
  }

  resetVideo() {
    this.video.currentTime = 0;
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

  showControls() {
    this.videoControls.style.transform = "translateY(0)";
  }

  hideControls() {
    this.videoControls.style.removeProperty('transform');
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
    this.pauseButton.hidden = true;
    this.playButton.hidden = false;
    this.progressBar.style.width = "0";
    this.showControls();
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

  handlePlayButtonChange() {
    if (this.video.paused || this.video.ended) {
      this.video.play();
      setTimeout(() => {
        this.hideControls();
      }, 3000);
      this.pauseButton.hidden = false;
      this.playButton.hidden = true;
    } else {
      this.video.pause();
      this.showControls();
      this.pauseButton.hidden = true;
      this.playButton.hidden = false;
    }
  }

  handleRangeUI(element, value) {
    if (value < 0.1) {
      this.volumeOn.hidden = true;
      this.volumeOff.hidden = false;
    } else {
      this.volumeOn.hidden = false;
      this.volumeOff.hidden = true;
    }
    element.style.backgroundSize = (value - element.min) * 100 / (element.max - element.min) + '% 100%';
  }

  handleInputChange(e) {
    let target = e.target;
    const min = target.min
    const max = target.max
    const val = target.value
    this.video.volume = val;
    this.handleRangeUI(target, val);
    console.log(val);
  }

  handleInputProgress(e) {
    const progressTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    this.video.currentTime = progressTime;
  }

  keyboardShortcuts(event) {
    const { key } = event;
    switch (key) {
      case ' ':
        this.handlePlayButtonChange();
        break;
      case '0':
        this.resetVideo();
        break;
      case 'ArrowLeft':
        this.moveBack5s();
        break;
      case 'ArrowRight':
        this.forward5s();
        break;
      case 'ArrowUp':
        //this.moveBack5s();
        break;
      case 'ArrowDown':
        //this.forward5s();
        break;
      case 'm':
        if (this.video.volume > 0) {
          this.mute();
          this.handleRangeUI(this.rangeInput, this.video.volume)
        } else {
          this.unMute();
          this.handleRangeUI(this.rangeInput, this.video.volume)
        }
        this.mute();
        break;
      case 'f':
        this.fullScreen();
        break;
    }
  }
}

customElements.define('my-component', MyVideoPlayer);

