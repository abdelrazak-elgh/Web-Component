const template = /*html*/`
<script src=".lib/webaudio-controls.js"></script>
<div class="container">
    <div class="main-video-container">
      <div class="sub-mvc-1">
        <div class="video-container">
          <video class="currentVideo"></video>
          <div class="video-controls">
            <div class="control-items">
              <div class="control-bar-left elements">
                  <button class="btooltip" id="play">
                    <span class="tooltiptext">play</span
                    ><i class="fa fa-play"></i>
                  </button>
                  <button class="btooltip" id="pause" hidden>
                    <span class="tooltiptext">pause</span
                    ><i class="fa fa-pause"></i>
                  </button>
                  <button class="btooltip" id="replay" hidden>
                    <span class="tooltiptext">replay</span
                    ><i class="fa fa-undo"></i>
                  </button>
                  <button class="btooltip" id="previous" hidden>
                    <span class="tooltiptext">previous</span
                    ><i class="fa fa-step-backward"></i>
                  </button>
                  <button class="btooltip" id="next">
                    <span class="tooltiptext">next</span
                    ><i class="fa fa-step-forward"></i>
                  </button>
                  <button class="btooltip" id="mb-5s">
                    <span class="tooltiptext">move back 5s</span
                    ><i class="fa fa-fast-backward"></i>
                  </button>
                  <button class="btooltip" id="fwd-5s">
                    <span class="tooltiptext">move forward 5s</span
                    ><i class="fa fa-fast-forward"></i>
                  </button>

                <div class="time elements">
                  <time id="time-elapsed">00:00</time>
                  <span>/</span>
                  <time id="duration">00:00</time>
                </div>
              </div>

              <div class="control-bar-right">
                <div class="volume-setting elements">
                  <button class="btooltip" id="v-on">
                    <span class="tooltiptext">mute (m)</span
                    ><i class="fa fa-volume-up"></i>
                  </button>
                  <button class="btooltip" id="v-off" hidden>
                    <span class="tooltiptext">unmute (m)</span>
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
                  <button
                    class="btooltip"
                    id="fullscreen"
                    aria-label="fullscreen"
                  >
                    <span class="tooltiptext">fullscreen (f)</span>
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
        <h3 class="video-data title" id="main-video-title"></h3>
      </div>
      <div class="sub-mvc-2">
        <button id="hide-knobs" hidden>
          <i class="fa fa-caret-down"></i>
          <span>Knobs Equalizer</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="knobs-div">
          <div class="knobs-controls">
            <label>60Hz</label>
            <webaudio-knob id="knb1"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain0">0 dB</output>
          </div>
          <div class="knobs-controls">
            <label>170Hz</label>
            <webaudio-knob id="knb2"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain1">0 dB</output>
          </div>
          <div class="knobs-controls">
            <label>350Hz</label>
            <webaudio-knob id="knb3"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain2">0 dB</output>
          </div>
          <div class="knobs-controls">
            <label>1000Hz</label>
            <webaudio-knob id="knb4"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain3">0 dB</output>
          </div>
          <div class="knobs-controls">
            <label>3500Hz</label>
            <webaudio-knob id="knb5"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain4">0 dB</output>
          </div>
          <div class="knobs-controls">
            <label>10000Hz</label>
            <webaudio-knob id="knb6"
              src="MyComponent/assets/knobs/LittlePhatty.png" diameter="64"
              sprites="100" value="0"
              min="-30" max="30" step="1">
            </webaudio-knob>
            <output id="gain5">0 dB</output>
          </div>
        </div>
        <button id="display-knobs">
        <i class="fa fa-caret-up"></i>
        <span>Knobs Equalizer</span>
        <i class="fa fa-caret-up"></i>
        </button>
      </div>
    </div>

    <div class="video-list-container">
      <div class="sub-vlc-1">
        <div class="header-video-list">
          Playlist
        </div>
        <div class="video-list">
        </div>
      </div>
      <div class="sub-vlc-2">
        <button id="hide-sound-graph" hidden>
          <i class="fa fa-caret-down"></i>
          <span>2D audio vizualization</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="canvas-div" hidden>
          <canvas id="myCanvas" ></canvas>
        </div>
        <button id="display-sound-graph">
          <i class="fa fa-caret-up"></i>
          <span>2D audio vizualization</span>
          <i class="fa fa-caret-up"></i>
        </button>
      </div>
    </div>
  </div>
`;

export { template };