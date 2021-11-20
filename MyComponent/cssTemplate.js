const style = `
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

/* ######### GLOBAL PROPERTY ######### */

* {
  box-sizing: border-box;
  text-transform: capitalize;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: thin;
}

button {
  background-color: transparent;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.btooltip:hover {
  background: rgba(0, 0, 0, 0.6);
}

i {
  color: #fff;
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

.title {
  font-size: 1vw;
}

.video-data {
  margin: 0;
}

.duree {
  display: flex;
  justify-content: flex-end;
  font-size: .8vw;
}

.author {
  font-style: italic;
  font-size: .8vw;
}

/* ######### END GLOBAL PROPERTY ######### */


/* ######### PARENT CONTAINER ######### */

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 100%;
  grid-gap: 1vw;
  padding: 2vw 5vw;
  height: 100%;
}

/* ######### END PARENT CONTAINER ######### */


/* ######### VIDEO CONTAINER ######### */

.container .main-video-container {
  grid-row: 1;
  grid-column: 1;
  grid-template-rows: fit-content 1fr;
  background: rgba(255,255,255,.8);
  //box-shadow: 0 0 5px 1px rgba(0, 0, 0, .8);
  padding: .2vw;
  border-radius: 5px;
  //height: auto;
}

.container .main-video-container .video-container {
  //display:flex;
  position: relative;
  overflow: hidden;
  grid-row: 1;
  width: 100%;
  //height: auto;
  background: #000;
  border-radius: 5px;
}

.container .main-video-container video {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.container .main-video-container h3{
  grid-row: 2;  
  height: 10%;
  padding: .5vw 0;
}

.container .main-video-container .video-container .video-controls {
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

.container .main-video-container .video-container:hover .video-controls{
  transform: translateY(0);
}

  /* ********* CONTROLS CONTAINER ********* */

.container .main-video-container .video-container 
.video-controls .control-items {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-left {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-start;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-left .time {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: felx;
  align-items: center;
  justify-content: center;
}

    /* --------- CONTROL BUTTON --------- */

#play, #pause, #fullscreen, #mb-5s, #fwd-5s {
  padding: 0.6vw;
}

#v-off {
  padding-right: 1vw;
}

.btooltip {
  position: relative;
}

.btooltip .tooltiptext {
  visibility: hidden;
  width: 10vw;
  font-size: .8vw;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5vw;
}

.btooltip:hover .tooltiptext {
  visibility: visible;
}

    /* --------- END CONTROL BUTTON --------- */

    /* --------- VOLUME INPUT RANGE --------- */

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting .volumebar {
  display: none;
  width: fit-content;
  overflow: hidden;
  padding: 0.4em 0;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting:hover .volumebar {
  display: flex;
  margin-left: -1em;
  animation-direction: reverse;
  -webkit-animation: fadeIn 0.1s linear;
  animation: fadeIn 0.5s linear;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting:hover {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting 
.volumebar .custom-slider {
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

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting 
.volumebar .custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 0.8em;
  width: 0.8em;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 2px 0.5px #000;
}

.container .main-video-container .video-container 
.video-controls .control-items .control-bar-right .volume-setting 
.volumebar .custom-slider::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

    /* --------- END VOLUME INPUT RANGE --------- */

    /* --------- VIDEO PROGRESS BAR --------- */

.container .main-video-container .video-container 
.video-controls .video-progress {
  position: relative;
  display: flex;
  width: 100%;
  height: 5%;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 1%;
  cursor: pointer;
}

.container .main-video-container .video-container 
.video-controls .video-progress .video-progress-filled {
  width: 0;
  background: white;
}

    /* --------- VIDEO PROGRESS BAR --------- */

  /* ********* END CONTROLS CONTAINER ********* */

/* ######### END VIDEO CONTAINER ######### */


/* ######### WEB AUDIO CONTAINER ######### */

.container .webaudio-container {
  grid-row: 2;
  grid-column: 1/3;
  background : blue;
  height: 100%;
}


/* ######### LIST VIDEO CONTAINER ######### */

.container .video-list-container {
  grid-column: 2;
  grid-row: 1;
  grid-template-columns: 1vw auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container .video-list-container .header-video-list {
  background: rgba(255,255,255,.8);
  border-radius: 5px 5px 0 0;
  padding: 2%;
}

.container .video-list-container .video-list {
  overflow-y: scroll;
  max-height: 100%;
  margin-top: .5vw;
}

.container .video-list-container .video-list::-webkit-scrollbar{
  width: .5vw;
}

.container .video-list-container .video-list::-webkit-scrollbar-track{
  background: rgba(255,255,255,.4);
  border-radius: 5px; 
}

.container .video-list-container .video-list::-webkit-scrollbar-thumb{
  background: rgba(255,255,255,.8);
  border-radius: 5px;
}

.container .video-list-container .video-list .vid-container{
  display:flex;
  grid-template-rows: auto au;
  margin: 2% 2% 2% 0;
  grid-gap: .1vw;
}

.container .video-list-container .video-list .vid video{
  width: 40%;
  //max-width: 40%;
}

.container .video-list-container .video-list .vid {
  display: flex;
  grid-gap:.5vw;
  background: rgba(255,255,255,.8);
  border-radius: 5px;
  padding: 1%;
  cursor: pointer;
  max-height: 20vh;
}

.container .video-list-container .video-list .vid-container .display-vid-fct {
  background: rgba(57, 68, 247, .8);
  display: flex;
  border-radius: 0 2vw 2vw 0;
}

.container .video-list-container .video-list .vid-container .display-vid-fct * {
  color: #000;
  font-size: 1.5vw;
}

.container .video-list-container .video-list .vid .h3 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 60%;
  color: #333;
  margin-right: .5vw;
}

.container .video-list-container .video-list .vid:hover {
  background: rgba(0,0,0,.3);
  color: white;
}

.container .video-list-container .video-list .vid.active {
  background: rgba(0,0,0,.8);
}

.container .video-list-container .video-list .vid.active *{
  color: white;
}

/* ######### END LIST VIDEO CONTAINER ######### */

/* ######### ANIMATIONS ######### */

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

/* ######### END ANIMATIONS ######### */ 

/* ######### RESPONSIVITY ######### */

@media (max-width:768px) {
  /* video container */

  .container {
    grid-template-columns: 1fr;
    grid-template-rows: auto 40vw 30vw;
    padding: 2% 10%;
    width: 100%;
    height: 100%;
  }
  
  .container .main-video-container {
    grid-column: 1;
    grid-row: 1;
    height: fit-content;
  }

  
  /* Video list */

  .container .video-list-container {
    background: red;
    grid-column: 1;
    grid-row: 2;
    overflow-y: scroll;
    width: 100%;
  }

  .video-list-container::-webkit-scrollbar {
    width: 1vw;
  }

  .title {
    font-size: 2vw;
  }
  
  .duree {
    font-size: 1.6vw;
  }
  
  .author {
    font-size: 1.6vw;
  }
  
  .container .webaudio-container {
    grid-row: 3;
  }
}

/* ######### END RESPONSIVITY ######### */
`;

export { style };