const style = `
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
  background: #000;
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

export { style };