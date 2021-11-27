//buil an equalizer with multiple biquad filters

class visualize2d {
  constructor() {
    let audioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

    let canvas;
    let audioContext, canvasContext;
    let analyser;
    let width, height;

    let dataArray, bufferLength;
  }

  buildAudioGraph(media) {
    media.onplay = (e) => { audioContext.resume(); }

    // fix for autoplay policy
    media.addEventListener('play', () => audioContext.resume());

    let sourceNode = audioContext.createMediaElementSource(media);

    // Create an analyser node
    analyser = audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  visualize() {
    // clear the canvas
    canvasContext.clearRect(0, 0, width, height);

    // Or use rgba fill to give a slight blur effect
    //canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    //canvasContext.fillRect(0, 0, width, height);

    // Get the analyser data
    analyser.getByteFrequencyData(dataArray);

    let barWidth = width / bufferLength;
    let barHeight;
    let x = 0;

    // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    heightScale = height / 128;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];


      canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      barHeight *= heightScale;
      canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

      // 2 is the number of pixels between bars
      x += barWidth + 1;
    }

    // call again the visualize function at 60 frames/s
    requestAnimationFrame(visualize);

  }
}

export { visualize2d };