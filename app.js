const music = new Audio('web_music/m1.mp3');
// CREAT ARRAY

const songs = [
    {
        id:'1',
        songName:` m1 <br>
        <div class="subtitle">Ertugrul Gazi</div>` ,
        poster: "lm_thumbnail/mm1.png"
    },
    {
        id:'2',
        songName:` m2 <br>
        <div class="subtitle">Osman Gazi</div>` ,
        poster: "lm_thumbnail/mm2.png"
    },
    {
        id:'3',
        songName:` m3 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm3.png"
    },
    {
        id:'4',
        songName:` m4 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm4.png"
    },
    {
        id:'5',
        songName:` m5 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm5.png"
    },
    {
        id:'6',
        songName:` m6 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm6.png"
    },
    {
        id:'7',
        songName:` 7 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm7.png"
    },
    {
        id:'8',
        songName:` 8 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm8.png"
    },
    {
        id:'9',
        songName:` 9 <br>
        <div class="subtitle">arijit singh</div>` ,
        poster: "lm_thumbnail/mm9.png"
    },
    {
        id:'10',
        songName:` 10 <br>
        <div class="subtitle">Alan Walker</div>` ,
        poster: "lm_thumbnail/mm10.png"
    },
    {
        id: '11',
        songName: ` 11 <br><div class="subtitle">Arijit Singh</div>`,
        poster: "lm_thumbnail/mm11.png"
    },
    {
        id: '12',
        songName: ` 12 <br><div class="subtitle">Neha Kakkar</div>`,
        poster: "lm_thumbnail/mm12.png"
    },
    {
        id: '13',
        songName: ` 13 <br><div class="subtitle">Jubin Nautiyal</div>`,
        poster: "lm_thumbnail/mm13.png"
    },
    {
        id: '14',
        songName: ` 14 <br><div class="subtitle">Armaan Malik</div>`,
        poster: "lm_thumbnail/mm14.png"
    },
    {
        id: '15',
        songName: ` 15 <br><div class="subtitle">Badshah</div>`,
        poster: "lm_thumbnail/mm15.png"
    }    

]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})

playMusic(i+1);

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
       
        playMusic(i+1);
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);

    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);

    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})
seek.addEventListener('change', () =>{
    music.currentTime = seek.value * music.duration/100;
})
music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1 ){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `web_music/m${index}.mp3`;
    poster_master_play.src = `lm_thumbnail/mm${index}.png`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    

    playMusic(i+1);

})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    music.src = `web_music/m${index}.mp3`;
    poster_master_play.src = `lm_thumbnail/mm${index}.png`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
   
    playMusic(i+1);

})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})


// ========== Mobile Touch Support ==========
// Play/Pause Buttons
document.querySelectorAll('.playListPlay').forEach(button => {
  button.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Double-tap zoom se bachata hai
    const songId = this.getAttribute('id');
    // Yahan aapka existing play function call karna hai
    playMusic(songId); // Example: Replace with your actual function
  });
});

// Horizontal Scroll Buttons
document.getElementById('left_scroll').addEventListener('click', () => {
  document.querySelector('.pop_song').scrollBy({ left: -200, behavior: 'smooth' });
});

document.getElementById('right_scroll').addEventListener('click', () => {
  document.querySelector('.pop_song').scrollBy({ left: 200, behavior: 'smooth' });
});

function playMusic(index) {
    

    playMusic(i+1);
    
}
