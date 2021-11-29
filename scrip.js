const wrapper = document.querySelector('.wrapper');
const musName = document.querySelector('.name');
const musArtist = document.querySelector('.artist');
const mainmusic = document.querySelector('#main-audio');
const playpushbtn = document.querySelector('#play')
const prevbtn = document.querySelector('#prev')
const nextbtn = document.querySelector('#next')
const progress = document.querySelector('.progress-bar')
const progressarea = document.querySelector('.progress')
console.log(mainmusic);
let songindex = 5;

window.addEventListener('load',()=>{
      loadmusic(songindex);
});

function loadmusic(indexnum){
      musName.innerText = allmusic[indexnum - 1].name;
      musArtist.innerText = allmusic[indexnum - 1].artist;
      mainmusic.src = `image/${allmusic[indexnum - 1].src}.mp3`;
};

//play music
function playmusic(){
      wrapper.classList.add('paused');
      playpushbtn.src = `image/pause.svg`;
      mainmusic.play();
}

//push music
function pushmusic(){
      wrapper.classList.remove('paused');
      playpushbtn.src = `image/play.svg`;
      mainmusic.pause();
}

playpushbtn.addEventListener("click",()=>{
      const ismusicpush = wrapper.classList.contains('paused');
      ismusicpush ? pushmusic() : playmusic();
})

//next music
function nextsong(){
      songindex++;
      songindex > allmusic.length ? songindex = 1 : songindex = songindex;
      loadmusic(songindex);
      playmusic();
};
nextbtn.addEventListener('click',()=>{
      nextsong();
});


//prev music
function presong(){
      songindex--;
      songindex < 1 ? songindex = allmusic.length : songindex = songindex;
      loadmusic(songindex);
      playmusic();
};
prevbtn.addEventListener('click',()=>{
      presong();
});

mainmusic.addEventListener('timeupdate',(e)=>{
     const currentTime = e.target.currentTime;
     const duration = e.target.duration;
     var progreswidth = (currentTime / duration) * 100;
     progress.style.width = `${progreswidth}%`;


     const currentTimeduration = document.querySelector('.current');
     const Timeduration = document.querySelector('.duration');

     mainmusic.addEventListener('loadeddata',()=>{
     

            //end time duration
            const audioduration = mainmusic.duration;
            const totalmini = Math.floor(audioduration / 60);
            let totalsec = Math.floor(audioduration % 60);
            if(totalsec < 10){
                   totalsec = `0${totalsec}`;
            }
            Timeduration.innerText = `${totalmini}:${totalsec}`;

     });
     
     
            //current time 
            const totalminicur = Math.floor(currentTime / 60);
            let totalseccur = Math.floor(currentTime % 60);
            if(totalseccur < 10){
                   totalseccur = `0${totalseccur}`;
            }
            currentTimeduration.innerText = `${totalminicur}:${totalseccur}`;
});

progressarea.addEventListener('click',(e)=>{
      var progreswidthval = progressarea.clientWidth;
      var clickedoffsetval = e.offsetX;
      var songduration = mainmusic.duration;

      mainmusic.currentTime = (clickedoffsetval / progreswidthval) * songduration;
      playmusic();
})