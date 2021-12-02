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
  //font-size: 1vw;
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
  font-size: 1vw;
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
  //background: rgba(255,255,255,1);
  //background: linear-gradient(#FF9F4A, #FF3C83); 
  background: linear-gradient(#FED54A, #FF9347);
  background-repeat: no-repeat;
}

/* ######### END PARENT CONTAINER ######### */


/* ######### VIDEO CONTAINER ######### */

.container .main-video-container {
  display: flex;
  flex-direction: column;
  grid-row: 1;
  grid-column: 1;
  grid-template-rows: fit-content auto;
  //background: rgba(255,255,255,.8);
  //box-shadow: 0 0 5px 1px rgba(0, 0, 0, .8);
  height: 100%;
}

.container .main-video-container .sub-mvc-1 {
  height: 96%;
  background: rgba(255,255,255,.8);
  border-radius: 5px;
  padding: .2vw;
}

.container .main-video-container .sub-mvc-2 {
  display: flex;
  flex-direction: column;
  height: 3%;
  margin-top: .5vw;
  background: rgba(255, 255, 255, .8);
  border-radius: 0 0 5px 5px;
}

.container .main-video-container .sub-mvc-2 .knobs-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
  height: 0;
  visibility: hidden;
}

.container .main-video-container .sub-mvc-2 .knobs-div .knobs-controls {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container .main-video-container .sub-mvc-2 button {
  border-radius: 0 0 5px 5px;
  background: rgba(91, 84, 250, 1); 
  width: 100%;
  height: 100%;
}

.container .main-video-container .sub-mvc-2 button * {
  color: #fff;
  font-size: 1vw;
}

.container .main-video-container .sub-mvc-1 .video-container {
  display:flex;
  position: relative;
  overflow: hidden;
  grid-row: 1;
  width: 100%;
  height: 90%;
  background: #000;
  border-radius: 5px;
}

.container .main-video-container video {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.container .main-video-container h3{
  //grid-row: 2;  
  height: auto;
  padding: .5vw 0;
  //background: green;
}

.container .main-video-container .sub-mvc-1 .video-container .video-controls {
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

.container .main-video-container .sub-mvc-1 .video-container:hover .video-controls{
  transform: translateY(0);
}

  /* ********* CONTROLS CONTAINER ********* */

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-left {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-start;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right {
  display: flex;
  flex-grow: 1;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-left .time {
  font-size: 1vw;
  color: #fff;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: felx;
  align-items: center;
  justify-content: center;
}

    /* --------- CONTROL BUTTON --------- */

#play, #pause, #replay, #fullscreen, #mb-5s, #fwd-5s, #v-on, #v-off, #next, #speed {
  padding: 0.6vw;
  font-size: 1vw;
}

#v-off {
  padding-right: 1vw;
}

.btooltip, .speed-menu {
  position: relative;
}

.btooltip .tooltiptext {
  visibility: hidden;
  width: 5vw;
  font-size: .8vw;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -2.5vw;
}

.btooltip:hover .tooltiptext {
  visibility: visible;
}

.speed-menu .speed-choice {
  visibility: hidden;
  width: 10vw;
  font-size: .8vw;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  bottom: 150%;
  left: 30%;
  margin-left: -5vw;
}

.speed-choice p{
  display: flex;
  width: 100%;
  self-align: flex-start;
  margin: 0;
  padding: 0.2vw 0.2vw 0.2vw 1vw;
}

.speed-choice p:hover{
  background-color: rgba(255,255,255,.4);
}

.speed-choice p.active{
  background: rgba(255,255,255,.8);
  color: #000;
}


    /* --------- END CONTROL BUTTON --------- */

    /* --------- VOLUME INPUT RANGE --------- */

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right .volume-setting .volumebar {
  display: none;
  width: fit-content;
  overflow: hidden;
  padding: 0.4em 0;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right .volume-setting:hover .volumebar {
  display: flex;
  margin-left: -1em;
  animation-direction: reverse;
  -webkit-animation: fadeIn 0.1s linear;
  animation: fadeIn 0.5s linear;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right .volume-setting:hover {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.container .main-video-container .sub-mvc-1 .video-container 
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

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right .volume-setting 
.volumebar .custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 0.8em;
  width: 0.8em;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 2px 0.5px #000;
}

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .control-items .control-bar-right .volume-setting 
.volumebar .custom-slider::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

    /* --------- END VOLUME INPUT RANGE --------- */

    /* --------- VIDEO PROGRESS BAR --------- */

.container .main-video-container .sub-mvc-1 .video-container 
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

.container .main-video-container .sub-mvc-1 .video-container 
.video-controls .video-progress .video-progress-filled {
  width: 0;
  background: white;
}

    /* --------- VIDEO PROGRESS BAR --------- */

  /* ********* END CONTROLS CONTAINER ********* */

/* ######### END VIDEO CONTAINER ######### */

/* ######### LIST VIDEO CONTAINER ######### */

.container .video-list-container {
  grid-column: 2;
  grid-row: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container .video-list-container .sub-vlc-1{
  display: flex;
  flex-direction: column;
  height: 96%;
}

.container .video-list-container .sub-vlc-2 {
  display: flex;
  flex-direction: column;
  height: 3%;
  margin-top: .5vw;
  background: rgba(255,255,255, .8);
  border-radius: 0 0 5px 5px;
  //border: 2px solid yellow;
}

.container .video-list-container .sub-vlc-2 button {
  border-radius: 0 0 5px 5px;
  //background: rgba(57, 68, 247, .8);
  background: rgba(91, 84, 250, 1);
  width: 100%;
  height: 100%;
}

.container .video-list-container .sub-vlc-2 button * {
  color: #fff;
  font-size: 1vw;
}

.container .video-list-container .sub-vlc-2 .canvas-div {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 0;
}

.container .video-list-container .sub-vlc-2 #myCanvas {
  width: 100%;
  border-radius: 5px;
  padding: .2vw;
}


.container .video-list-container .sub-vlc-1 .header-video-list {
  display: flex;
  justify-content: space-between;
  background: rgba(255,255,255,.8);
  border-radius: 5px 5px 0 0;
  padding: 2%;
  font-size: 1vw;
}

.container .video-list-container .sub-vlc-1 .video-list {
  overflow-y: scroll;
  height: 100%;
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

.container .video-list-container .video-list .vid video{
  //background: #000;
  width: 40%;
  height: 100%;
}

.container .video-list-container .video-list .vid {
  display: flex;
  margin: 2% 2% 2% 0;
  grid-gap: 1vw;
  background: rgba(255,255,255,.8);
  border-radius: 5px;
  padding: .2vw;
  cursor: pointer;
  height: 14vh;
}

.container .video-list-container .video-list .vid .video-info-div {
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