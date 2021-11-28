import { style } from './js/cssTemplate.js';
import { template } from './js/htmlTemplate.js';
import { videoList, initPlayList, addVideo } from './js/movieList.js';
import { visualize2d } from './js/webAudioVisualiseur.js'
import './js/lib/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

export default class MyVideoPlayer extends HTMLElement {
  constructor() {
    super();
    console.log("BaseURL = " + getBaseURL());
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;
    initPlayList(this.shadowRoot);

    // recuperation des elements du shadow
    this.listVideo = this.shadowRoot.querySelectorAll('.vid');
    this.listVideoDuration = this.shadowRoot.querySelectorAll('.lv-duration');

    this.videoContainer = this.getSDom('.video-container');
    this.videoControls = this.getSDom('.video-controls');
    this.video = this.getSDom('.currentVideo');
    this.videoTitle = this.getSDom('#main-video-title');
    this.timeElapsed = this.getSDom('#time-elapsed');
    this.duration = this.getSDom('#duration');
    this.rangeInput = this.getSDom('.custom-slider');
    this.progress = this.getSDom('.video-progress');
    this.progressBar = this.getSDom('.video-progress-filled');

    this.playButton = this.getSDom('#play');
    this.pauseButton = this.getSDom('#pause');
    this.replayButton = this.getSDom('#replay');
    this.nextButton = this.getSDom('#next');
    this.fwd5sButton = this.getSDom('#fwd-5s');
    this.mb5sButton = this.getSDom('#mb-5s');
    //this.spdButton = this.getSDom('#speed');
    this.volumeOn = this.getSDom('#v-on');
    this.volumeOff = this.getSDom("#v-off");
    this.fullScreenButton = this.getSDom('#fullscreen');

    this.displayKnobsButton = this.getSDom('#display-knobs');
    this.hideKnobsButton = this.getSDom('#hide-knobs');
    this.subMVC1 = this.getSDom('.sub-mvc-1');
    this.subMVC2 = this.getSDom('.sub-mvc-2');

    this.displaySoundGraph = this.getSDom('#display-sound-graph');
    this.hideSoundGraph = this.getSDom('#hide-sound-graph');
    this.subVLC1 = this.getSDom('.sub-vlc-1');
    this.subVLC2 = this.getSDom('.sub-vlc-2');

    // récupération de l'attribut HTML
    // this.video.src = this.getAttribute("src");

    // initialisation du volume de la video par default
    this.video.volume = this.rangeInput.value;

    this.filters = [];

    this.audioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    this.audioContext = new this.audioCtx();

    this.knobsDiv = this.getSDom('.knobs-div');;
    this.knob1 = this.getSDom('#knb1');
    this.knob2 = this.getSDom('#knb2');
    this.knob3 = this.getSDom('#knb3');
    this.knob4 = this.getSDom('#knb4');
    this.knob5 = this.getSDom('#knb5');
    this.knob6 = this.getSDom('#knb6');

    this.canvasDiv = this.getSDom('.canvas-div');
    this.canvas = this.getSDom('#myCanvas');
    this.canvasContext = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.addFirstVideoToPlayer();

    // configuration des ecouteurs sur les boutons
    this.listenerConfiguration();

    this.buildAudioGraph();

    this.visualizeFrequencies = () => {
      requestAnimationFrame(this.visualizeFrequencies);
      this.canvasContext.fillStyle = 'rgb(0,0,0)';
      this.canvasContext.fillRect(0, 0, this.width, this.height);

      this.analyser.getByteFrequencyData(this.dataArray)

      var barWidth = this.width / this.bufferLength;
      var barHeight;
      var x = 0;

      // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
      // before drawing. This is the scale factor
      let heightScale = this.height / 128;

      for (var i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];


        this.canvasContext.fillStyle = 'rgb(252, 194, ' + (barHeight) + ')';
        barHeight *= heightScale;
        this.canvasContext.fillRect(x, this.height - barHeight / 2, barWidth, barHeight / 2);

        // 2 is the number of pixels between bars
        x += barWidth + 1;
      }
    }
    requestAnimationFrame(this.visualizeFrequencies);
  }

  buildAudioGraph() {
    this.video.onplay = (e) => { this.audioContext.resume(); }

    // fix for autoplay policy
    this.video.addEventListener('play', () => this.audioContext.resume());

    let sourceNode = this.audioContext.createMediaElementSource(this.video);

    // Create an analyser node
    this.analyser = this.audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    this.analyser.fftSize = 512;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    // sourceNode.connect(this.analyser);

    // create the equalizer. It's a set of biquad Filters


    // Set filters
    [60, 170, 350, 1000, 3500, 10000].forEach((freq, i) => {
      let eq = this.audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      this.filters.push(eq);
    });

    // Connect filters in serie
    sourceNode.connect(this.filters[0]);
    for (let i = 0; i < this.filters.length - 1; i++) {
      this.filters[i].connect(this.filters[i + 1]);
    }

    // connect the last filter to the speakers
    this.filters[this.filters.length - 1].connect(this.analyser);

    this.analyser.connect(this.audioContext.destination);
  }

  changeGain(sliderVal, nbFilter) {
    let value = sliderVal;
    this.filters[nbFilter].gain.value = value;

    // update output labels
    let output = this.getSDom("#gain" + nbFilter);
    output.value = value + " dB";
  }

  getSDom(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  listenerConfiguration() {
    window.onkeydown = function (e) {
      return !(e.keyCode == 32 && e.target == document.body);
    };

    this.playButton.onclick = () => {
      this.handlePlayButtonChange();
    }

    this.pauseButton.onclick = () => {
      this.handlePlayButtonChange();
    }

    this.replayButton.onclick = () => {
      this.resetVideo();
      this.handlePlayButtonChange();
    }

    this.nextButton.onclick = () => {
      console.log('next');
      this.handleNextVideo();
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

    this.displayKnobsButton.onclick = () => {
      this.displayKnobsButton.hidden = true;
      this.hideKnobsButton.hidden = false;
      this.hideKnobsButton.style.height = "auto";
      this.hideKnobsButton.style.borderRadius = "initial";
      this.subMVC1.style.height = "80%";
      this.subMVC2.style.height = "19%";
      this.knobsDiv.style.visibility = "visible";
    }

    this.hideKnobsButton.onclick = () => {
      this.displayKnobsButton.hidden = false;
      this.hideKnobsButton.hidden = true;
      this.subMVC1.style.height = "96%";
      this.subMVC2.style.height = "3%";
      this.knobsDiv.style.visibility = "hidden"
    }

    this.displaySoundGraph.onclick = () => {
      this.displaySoundGraph.hidden = true;
      this.hideSoundGraph.hidden = false;
      this.hideSoundGraph.style.height = "auto";
      this.hideSoundGraph.style.borderRadius = "initial";
      this.subVLC1.style.height = "80%";
      this.subVLC2.style.height = "19%";
      this.canvasDiv.hidden = false;
    }

    this.hideSoundGraph.onclick = () => {
      this.displaySoundGraph.hidden = false;
      this.hideSoundGraph.hidden = true;
      this.canvasDiv.hidden = true;
      this.subVLC1.style.height = "96%";
      this.subVLC2.style.height = "3%";
    }

    this.listVideo.forEach(video => {
      //console.log(video);
      video.onclick = () => {
        //console.log(video)
        this.listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        this.handleMainVideoChange(video.childNodes);
        let x = video.childNodes;
        if (video.classList.contains('active')) {
          //this.handleMainVideoInfo(video.children)
          //let src = video.children[0].getAttribute('src'); 
          //this.video.src = src;
        }
      }
    });

    this.progress.onclick = (e) => {
      this.handleInputProgress(e);
    }

    this.video.onloadedmetadata = () => {
      this.initializeVideo();
      this.resetKnobs();
    }

    this.video.onended = () => {
      this.handlePlayButtonChange();
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

    this.knob1.oninput = () => {
      this.changeGain(this.knob1.value, 0);
    }

    this.knob2.oninput = () => {
      this.changeGain(this.knob2.value, 1);
    }

    this.knob3.oninput = () => {
      this.changeGain(this.knob3.value, 2);
    }

    this.knob4.oninput = () => {
      this.changeGain(this.knob4.value, 3);
    }

    this.knob5.oninput = () => {
      this.changeGain(this.knob5.value, 4);
    }

    this.knob6.oninput = () => {
      this.changeGain(this.knob6.value, 5);
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

  addFirstVideoToPlayer() {
    //console.log(this.listVideo[0].childNodes);
    this.listVideo[0].classList.add('active');
    let firstChild = this.listVideo[0].childNodes;
    firstChild.forEach(node => {
      //console.log(node.nodeName);
      if (node.nodeName.toLowerCase() == 'video') {
        this.video.src = node.src;
      }
      if (node.nodeName.toLowerCase() == 'div') {
        //console.log(node.childNodes);
        node.childNodes.forEach(nodeElement => {
          //console.log(nodeElement.childNodes);
          nodeElement.childNodes.forEach(node => {
            if (node.nodeName.toLowerCase() == 'h3') {
              console.log(node.innerText);
              this.videoTitle.innerText = node.innerText;
            }
          });
        });
      }
    });
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
    this.handlePlayButtonChange();
  }

  handleMainVideoChange(element) {
    element.forEach(node => {
      //console.log(node.nodeName);
      if (node.nodeName.toLowerCase() == 'video') {
        this.video.src = node.src;
      }
      if (node.nodeName.toLowerCase() == 'div') {
        //console.log(node.childNodes);
        node.childNodes.forEach(nodeElement => {
          //console.log(nodeElement.childNodes);
          nodeElement.childNodes.forEach(node => {
            if (node.nodeName.toLowerCase() == 'h3') {
              console.log(node.innerText);
              this.videoTitle.innerText = node.innerText;
            }
          });
        });
      }
    });
  }

  handleNextVideo() {
    this.currentIndexActive = 0;
    let i = 0;

    this.listVideo.forEach(vid => {
      if(vid.classList.contains('active')){
        this.currentIndexActive = i;
        console.log(this.currentIndexActive);
      }
      i++;
    });
    this.listVideo.forEach(vid => vid.classList.remove('active'));

    if(this.currentIndexActive < this.listVideo.length-1) {
      this.listVideo[this.currentIndexActive+1].classList.add('active');
      this.handleMainVideoChange(this.listVideo[this.currentIndexActive+1].childNodes);
    }else if(this.currentIndexActive == this.listVideo.length-1){
      this.listVideo[0].classList.add('active');
      this.handleMainVideoChange(this.listVideo[0].childNodes);
    }
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
      //console.log('pause ou end');
      if (this.video.currentTime == this.video.duration) {
        console.log('end')
        this.pauseButton.hidden = true;
        this.playButton.hidden = true;
        this.replayButton.hidden = false;
      } else {
        //console.log('pause');
        this.video.play();
        setTimeout(() => {
          this.hideControls();
        }, 3000);
        this.replayButton.hidden = true;
        this.playButton.hidden = true;
        this.pauseButton.hidden = false;
      }
    } else {
      this.video.pause();
      this.showControls();
      this.pauseButton.hidden = true;
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

  resetKnobs() {
    let allKnobs = this.shadowRoot.querySelectorAll('.knobs-controls');
    this.filters.forEach(filter => {
      filter.gain.value = 0;
    })
    allKnobs.forEach(knobs => {
      let knobChilds = knobs.childNodes;
      knobChilds.forEach(child => {
        if (child.nodeName.toLowerCase() == 'webaudio-knob') {
          child.value = 0;
        }
        if (child.nodeName.toLowerCase() == 'output') {
          child.value = 0;
        }
      });
    });
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
      case 'f':
        this.fullScreen();
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
      case 'w':
        //this.slowDown();
        break;
      case 'x':
        //this.speedUp();
        break;
    }
  }
}

customElements.define('my-component', MyVideoPlayer);

