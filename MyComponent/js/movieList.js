let videoList = [
  'MyComponent/assets/video/Overtaken.mp4',
  'MyComponent/assets/video/FREE_Guitar_Beat_2.mp4',
  'MyComponent/assets/video/FREE_Guitar_Beat.mp4',
  'MyComponent/assets/video/Demon_slayer.mp4',
  'MyComponent/assets/video/big_buck_bunny.mp4',
  'MyComponent/assets/video/Climate_Change_Protests.mp4',
  'MyComponent/assets/video/fireworks.mp4',
  'MyComponent/assets/video/Grills.mp4',
  'MyComponent/assets/video/Raindrops.mp4',
  'MyComponent/assets/video/Sintel_trailer.mp4',
  'MyComponent/assets/video/trafficjam_sounds.mp4',
];

let addVideo = (source) => {
  videoList.push(source);
};

let deleteVideo = (item) => {
  videoList.forEach(video => {
    if (video === item) {
      arr.splice(videoList.indexOf(video), 1);
    }
  });
};

let initPlayList = (shadow) => {
  let listVideoDiv = shadow.querySelector('.video-list');
  videoList.forEach(source => {
    let vidDiv = document.createElement('div');
    vidDiv.classList.add('vid', 'active');

    let video = document.createElement('video');
    video.src = source;

    let infoVideo = document.createElement('div');
    infoVideo.classList.add("video-info-div");
    

    let videoInfoDivChild1 = document.createElement('div');
    let title = document.createElement('h3');
    title.innerText = "TEST Titre";
    title.classList.add("video-data", "title");
    videoInfoDivChild1.appendChild(title);

    let videoInfoDivChild2 = document.createElement('div');
    let pAuthor = document.createElement('p');
    pAuthor.innerText = "TEST AUTHor";
    pAuthor.classList.add("video-data", "author");
    videoInfoDivChild2.appendChild(pAuthor);


    let videoInfoDivChild3 = document.createElement('div');
    videoInfoDivChild3.classList.add("duree");
    let pDuree = document.createElement('p');
    pDuree.classList.add("video-data");
    videoInfoDivChild3.appendChild(pDuree);

    infoVideo.appendChild(videoInfoDivChild1);
    infoVideo.appendChild(videoInfoDivChild2);
    infoVideo.appendChild(videoInfoDivChild3);

    vidDiv.appendChild(video);
    vidDiv.appendChild(infoVideo);
    listVideoDiv.appendChild(vidDiv);
  });
};

/*<div class="vid active">
  <video
    src="MyComponent/assets/video/FREE_Guitar_Beat.mp4">
  </video>
  <div class="video-info-div">
    <div>
      <h3 class="video-data title">sintel</h3>
    </div>
    <div>
      <p class="video-data author">By Author</p>
    </div>
    <div class="duree">
      <p class="video-data">00:00</p>
    </div>
  </div>
</div>*/

export { videoList, initPlayList, addVideo };