import './lib/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

let style = `
  button {
    width: fit-content;
    height: fit-content;
    border: none;
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
    <button id="pause">PAUSE</button>
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
  }
}

customElements.define('my-component', MyVideoPlayer);
