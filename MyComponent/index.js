const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

* {
  box-sizing: border-box;
  text-transform: capitalize;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: thin;
}


body {
  margin: 0;
  padding: 1000px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#ff9f4a, #ff3c83);
}

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

/* button */
#play,
#pause,
#fullscreen,
#mb-5s,
#fwd-5s {
  padding: 0.6vw;
}

#v-off {
  padding-right: 1vw;
}

.container {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-gap: 1vw;
  align-items: flex-start;
  padding: 2% 10%;
  height: 100%;
}

.video-container {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 20px 1px rgba(255, 255, 255, 1);
  max-height: 70%;
}

.curVideo {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.video-container:hover .video-controls {
  transform: translateY(0);
}

.video-controls {
  background: linear-gradient(#242b2e00, #242b2e);
  padding: 0.2rem 1rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 5px 5px;
  width: 100%;
  height: 15%;
  transform: translateY(100%);
  transition: 0.3s;
}

/* Video Progress Bar */
.video-progress {
  position: relative;
  display: flex;
  width: 100%;
  height: 5%;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 1%;
  cursor: pointer;
}

.video-progress-filled {
  width: 0;
  background: white;
}

/* controls container */
.control-items {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.control-bar-left {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-start;
}

.control-bar-right {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
}

.elements {
  display: flex;
  align-items: center;
  color: #fff;
  height: 100%;
}

.elements * {
  margin: 0 0.5em;
  font-size: 1vw;
}

.time {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: felx;
  align-items: center;
  justify-content: center;
}

/* volume input range */

.volumebar {
  display: none;
  width: fit-content;
  overflow: hidden;
  padding: 0.4em 0;
}

.volume-setting:hover .volumebar {
  display: flex;
  margin-left: -1em;
  animation-direction: reverse;
  -webkit-animation: fadeIn 0.1s linear;
  animation: fadeIn 0.5s linear;
}

.volume-setting:hover {
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

.custom-slider::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

/* Video list */

.container .video-list {
  overflow-y: scroll;
  max-height: 70%;
}

.video-list::-webkit-scrollbar {
  width: 0.5vw;
}

.video-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

.video-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}

.vid video {
  width: 40%;
  max-width: 40%;
}

.vid {
  display: flex;
  grid-gap: 0.5vw;
  background: rgba(255,255,255,.5);
  border-radius: 5px;
  margin: 2%;
  padding: 1%;
  cursor: pointer;
  max-height: 20vh;
}

.vid .h3 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 60%;
  color: #333;
  margin-right: 0.5vw;
}

.vid:hover {
  background: rgba(0,0,0,.3);
  color: white;
}

.vid.active {
  background: rgba(0,0,0,.8);
}

.vid.active * {
  color: white;
}

.video-data {
  margin: 0;
}

.title {
  font-size: 1vw;
}

.duree {
  display: flex;
  justify-content: flex-end;
  font-size: 0.8vw;
  font-weight: bold;
}

.author {
  font-style: italic;
  font-size: 0.8vw;
}

/* Animations */

@-webkit-keyframes fadeIn {
  from {
    width: 0%;
  }
  to {
    width: 70px;
  }
}

@keyframes fadeIn {
  from {
    width: 0%;
  }
  to {
    width: 70px;
  }
}

@media (max-width:991px) {
  .container {
    grid-template-columns: 2fr 1fr;
    padding: 10px;
  }
}

@media (max-width:580px) {
  .container {
    grid-template-columns: 1fr;
  }
}
`;

let template = /*html*/`
<div class="container">
  <div class="video-container">
    <video
      src="https://media.w3.org/2010/05/sintel/trailer.mp4"
      class="curVideo"
    ></video>
    <div class="video-controls">
      <div class="control-items">
        <div class="control-bar-left">
          <div class="elements">
            <button id="play"><i class="fa fa-play"></i></button>
            <button id="pause" hidden><i class="fa fa-pause"></i></button>
            <button id="mb-5s"><i class="fa fa-fast-backward"></i></button>
            <button id="fwd-5s"><i class="fa fa-fast-forward"></i></button>
          </div>

          <div class="time elements">
            <time id="time-elapsed">00:00</time>
            <span>/</span>
            <time id="duration">00:00</time>
          </div>
        </div>

        <div class="control-bar-right">
          <div class="volume-setting elements">
            <button id="v-on"><i class="fa fa-volume-up"></i></button>
            <button id="v-off" hidden>
              <i class="fa fa-volume-off"></i>
            </button>
            <div class="volumebar">
              <input
                type="range"
                class="custom-slider"
                title="volume"
                min="0"
                max="1"
                step="0.01"
                value="0.5"
              />
            </div>
          </div>
          <div class="elements">
            <button id="fullscreen" aria-label="fullscreen">
              <i class="fa fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="video-progress">
        <div class="video-progress-filled"></div>
      </div>
    </div>
  </div>

  <div class="video-list">
    <div class="vid active">
      <video
        src="https://media.w3.org/2010/05/sintel/trailer.mp4"
        preload
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Sintel</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://cdn.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Raindrops_Videvo_preview.mp4"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Raindrops</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://cdn.videvo.net/videvo_files/video/free/2016-01/large_watermarked/1_fireworks_preview.mp4"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Fireworks</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Big buck bunny</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://cdn.videvo.net/videvo_files/video/free/2021-11/large_watermarked/211106_01_COP26%20Saturday_4k_009_preview.mp4"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Climate Change Protests</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://player.vimeo.com/external/586228759.sd.mp4?s=d35b9b32851db86dde64302bd696390232105dd2&profile_id=165"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Demon slayer</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://player.vimeo.com/external/135713851.mobile.mp4?s=32fd870d9904fa80d74b58aacb95ec545fb0e3f6&profile_id=116"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">cars sound</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>

    <div class="vid">
      <video
        src="https://player.vimeo.com/external/406256528.hd.mp4?s=450be55592accb19beb0f5b0da2ce97cc0e613d4&profile_id=174"
        muted
      ></video>
      <div class="h3">
        <div>
          <h3 class="video-data title">Veritable grill</h3>
        </div>
        <div>
          <p class="video-data author">By Abdelrazak</p>
        </div>
        <div class="duree">
          <p class="video-data lv-duration">00:00</p>
        </div>
      </div>
    </div>
  </div>
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
    this.listVideo = this.shadowRoot.querySelectorAll('.vid');
    this.listVideoDuration = this.shadowRoot.querySelectorAll('.lv-duration');

    this.videoContainer = this.getSDom('.video-container');
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

    this.video.onloadedmetadata = () => {
      this.initializeVideo();
    }

    this.listVideo.forEach(video => {
      const durationC = video.children[1].children[2];
      video.children[0].onloadedmetadata = () => {
        let videoDuration = Math.round(video.children[0].duration);
        let time = this.formatTime(videoDuration);
        let textnode = document.createTextNode(`${time.minutes}:${time.seconds}`);
        durationC.replaceChild(textnode, durationC.children[0]);
      }
    });

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
    console.log(val);
  }

  handleInputProgress(e) {
    const progressTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    this.video.currentTime = progressTime;
  }

  handleRangeUI(element, value) {
    if(value < 0.1) {
      this.volumeOn.hidden = true;
      this.volumeOff.hidden = false;
    }else {
      this.volumeOn.hidden = false;
      this.volumeOff.hidden = true;
    }
    element.style.backgroundSize = (value - element.min) * 100 / (element.max - element.min) + '% 100%';
  }
}

customElements.define('my-component', MyVideoPlayer);

