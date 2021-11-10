import './lib/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
  button {
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    background-color: seagreen;
    color: white;
  }
`;
let template = /*html*/`
    <video id="player" >
    </video>
    <br>
    <button id="play">PLAY</button>
    <button id="pause" hidden>PAUSE</button>
    <button id="info">GET INFO</button>
    <button id="fwd-10s">+10S</button>
    <button id="spd-x4" >VIT X4</button>
   `;
export default class MyVideoPlayer extends HTMLElement {
  constructor() {
    super();
    console.log("BaseURL = " + getBaseURL());
    const shadow = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;

    this.player = this.shadowRoot.querySelector("#player");
    this.playButton = this.shadowRoot.querySelector("#play");
    //this.playButton.hidden = false;
    this.pauseButton = this.shadowRoot.querySelector("#pause");

    // récupération de l'attribut HTML
    this.player.src = this.getAttribute("src");

    this.listenerConfiguration();

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
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
}

customElements.define('my-component', MyVideoPlayer);
