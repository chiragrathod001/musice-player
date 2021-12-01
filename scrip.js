const wrapper = document.querySelector('.wrapper');
const musName = document.querySelector('.name');
const musArtist = document.querySelector('.artist');
const mainmusic = document.querySelector('#main-audio');
const playpushbtn = document.querySelector('#play')
const prevbtn = document.querySelector('#prev')
const nextbtn = document.querySelector('#next')
const progress = document.querySelector('.progress-bar')
const progressarea = document.querySelector('.progress')
const repeatbtn = document.querySelector('.repeat')
const musiclist = document.querySelector('.music-list')
let showlist = document.querySelector('#list');
const closelist = document.querySelector('#close');

showlist.addEventListener('click',()=>{
      musiclist.classList.toggle('show');
});


closelist.addEventListener('click',()=>{
      musiclist.classList.remove('show');
});


let songindex = 1;

window.addEventListener('load',()=>{
      loadmusic(songindex);
      playingNow();
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
      playingNow(songindex);
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
      playingNow(songindex);
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
});


// repeatbtn.addEventListener('click',()=>{
//       let gettax = repeatbtn.src;
//       console.log(repeatbtn.src);

//       gettax = `image/shuffil.svg`;
// });

const ultag = document.querySelector('ul');

for(let i = 0; i < allmusic.length; i++){
      let liteg = ` <li li-index="${i + 1}" >
      <div class="row">
            <span>${allmusic[i].name}</span>
            <p>${allmusic[i].artist}</p>
      </div>
      <audio  class="${allmusic[i].src}" src="image/${allmusic[i].src}.mp3"></audio>
      
      <span id="${allmusic[i].src}" class="name" >3:00</span>
      </li>`;

      ultag.insertAdjacentHTML("beforeend",liteg);

      let litegaudiotag = ultag.querySelector(`.${allmusic[i].src}`); 
      let liaudioduretion = ultag.querySelector(`#${allmusic[i].src}`);
      
      
      litegaudiotag.addEventListener('loadeddata',()=>{
                  //end time duration
                  const audioduration = litegaudiotag.duration;
                  const totalmini = Math.floor(audioduration / 60);
                  let totalsec = Math.floor(audioduration % 60);
                  if(totalsec < 10){
                         totalsec = `0${totalsec}`;
                  }
                  liaudioduretion.innerText = `${totalmini}:${totalsec}`;
                  liaudioduretion.setAttribute('t-duration',`${totalmini}:${totalsec}`);
            });
};



let alllitag = ultag.querySelectorAll('li');
function playingNow(index){
      for(let j =0; j < alllitag.length; j++){

            let getIndexs = alllitag[j].querySelector('.name')
            if(alllitag[j].classList.contains("playing")){
                  alllitag[j].classList.remove("playing");
                  let adduration = getIndexs.getAttribute('t-duration');
                  getIndexs.innerText = adduration;
            }

            if(alllitag[j].getAttribute('li-index') == index){
                  alllitag[j].classList.add('playing');
                  getIndexs.innerText = "playing";
            }
            alllitag[j].setAttribute("onclick","clicked(this)");
      }
}


function clicked(elem){
      let getindex = elem.getAttribute('li-index');
      musicindex = getindex;
      playingNow(musicindex);
      loadmusic(musicindex);
      playmusic();
}