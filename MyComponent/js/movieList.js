/**
 * Playlist
 */
let videoList = [
  {
    src: 'MyComponent/assets/video/Overtaken.mp4',
    title: 'Overtaken',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/FREE_Guitar_Beat_2.mp4',
    title: 'Guitar Beat 2',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/FREE_Guitar_Beat.mp4',
    title: 'Guitar Beat 1',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/Demon_slayer.mp4',
    title: 'Demon slayer',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/big_buck_bunny.mp4',
    title: 'Big buck bunny',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/Climate_Change_Protests.mp4',
    title: 'Climate change Protests',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/fireworks.mp4',
    title: 'Fireworks',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/Grills.mp4',
    title: 'Veritable grills',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/Sintel_trailer.mp4',
    title: 'Sintel trailer',
    author: 'Author'
  },
  {
    src: 'MyComponent/assets/video/trafficjam_sounds.mp4',
    title: 'Traffic jam sound',
    author: 'Author'
  },
];

/*
let addVideo = (source) => {
  videoList.push(source);
};

let deleteVideo = (item) => {
  videoList.forEach(video => {
    if (video === item) {
      arr.splice(videoList.indexOf(video), 1);
    }
  });
};*/

/**
 * Manage to create dynamicaly the playlist
 * @param {*} shadow 
 */
let initPlayList = (shadow) => {
  let listVideoDiv = shadow.querySelector('.video-list');
  videoList.forEach(source => {
    let vidDiv = document.createElement('div');
    vidDiv.classList.add('vid');

    let video = document.createElement('video');
    video.src = source.src;

    let infoVideo = document.createElement('div');
    infoVideo.classList.add("video-info-div");


    let videoInfoDivChild1 = document.createElement('div');
    let title = document.createElement('h3');
    title.innerText = source.title;
    title.classList.add("video-data", "title");
    videoInfoDivChild1.appendChild(title);

    let videoInfoDivChild2 = document.createElement('div');
    let pAuthor = document.createElement('p');
    pAuthor.innerText = source.author;
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

export { videoList, initPlayList};