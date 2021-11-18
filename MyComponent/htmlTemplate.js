const template = /*html*/`
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

export { template };