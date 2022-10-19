async function showApi(n) {
  let musiclink = await fetch(n);
  let responseText = await musiclink.json();
  let music = responseText.data;
  console.log(music);
  i=Number(Math.floor(Math.random()*25))

  function card() {
    let showcard = document.getElementById("artists");
    showcard.innerHTML += `<div  class="card border-0 resultCard">
            <div class="position-relative">
            <img src="${music[i].artist.picture_medium}" class="card-img-top rounded-circle" alt="artista" onclick="artistPage('${music[i].artist.name}')">
            <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${music[i].preview}')">
            </div>
            <div class="card-body">
            <h5 class="card-title text-white">${music[i].artist.name}</h5>
            <h6>Artists</h6>
            </div>`;
  }
  card();

  function albums() {
    let showAlbum = document.getElementById("albums");
    showAlbum.innerHTML += `<div class="card border-0 bg-dark resultCard">
        <div class="position-relative">
        <img src="${music[i].album.cover_medium}" class="card-img-top" alt="album">  
            <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${music[i].preview}')">
        </div>
        <div class="card-body">
        <h5 class="card-title text-white">${music[i].album.title}</h5>
        <p>${music[i].artist.name}</p>
        </div>`;
  }
  albums();


}

async function returnApi(newA) {
  let musicLink = await fetch(newA);
  let respText = await musicLink.json();
  let artista = respText.data;
  console.log(artista);
  let i=Number(Math.floor(Math.random()*25))
  let mn=Number(Math.floor(Math.random()*4+1))
  let sc=Number(Math.floor(Math.random()*5))
  let s=Number(Math.floor(Math.random()*9))
  let nr=Number(Math.floor(Math.random()*700000+100000))
  

  function fillArtistPage() {
  let showArtist = document.getElementById("headArtist");
  showArtist.innerHTML = `<img src="${artista[i].artist.picture_xl}" alt="">
    <p><img src="./assets/img/artist-verified-png.png" alt="" width="50px"><span>Verified artist</span></p>
    <h1>${artista[i].artist.name}</h1> 
    <p>18,375,540 monthly listener</p>`
    console.log(showArtist)
let follow = document.getElementById('follow');
  follow.innerHTML += `<p><img class="w-25 position-absolute preview" src="" alt="" onclick="playA('${artista[i].preview}')">
    <button>Follow</button>`
let showSongs = document.getElementById('artistSongs');
console.log(showSongs);
for (let i = 1; i < 4; i++) {
  showSongs.innerHTML += `<tr><th scope="row" onclick="playA('${artista[i].preview}')>${i}</th><td><img src="${artista[i].album.cover_small}" class="card-img-top" alt="album"></td>
    <td>${artista[i].title}</td>
    <td>${nr}</td>
    <td>${mn}:${sc}${s}</td>
    <td></td>
  </tr>`  
  }
}
fillArtistPage()
}
function artistPage(a) {
  if(a==='Måneskin'){a='Maneskin'};
  let newUrl3 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${a}`;
  artista=returnApi(newUrl3)
  console.log(artista);
  fillArtistPage(artista)
}



function playA(a) {
  let aux = document.querySelector(".player");
      if (aux.paused || aux.currentTime === 0 || aux.ended) {
        aux.src = a 
        aux.play()
      } else { 
        aux.pause()
      }
    }

const searchBar = document.getElementById("searchBar");
console.log(searchBar);
const urlBase = "q=radiohead";
function searchArtist() {
  let params = new URLSearchParams(urlBase);
  let query = params.get("q");
  let input = searchBar.value;
  console.log(query);
  params.set("q", input);
  let data = params.toString();
  let newUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?${data}`;
  console.log(newUrl);
  showApi(newUrl);
}

let arrayArtists = ["Radiohead", "Lazza", "Lizzo", "Maneskin"];

for (let i = 0; i < arrayArtists.length; i++) {
  let newUrl2 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${arrayArtists[i]}`;
  showApi(newUrl2);
}

// for (let i=0; i<music.length; i++){
//     let showcard = document.getElementById('cards')
//     showcard.innerHTML += `<div class="card bg-transparent border-0">
//     <img src="${music[i].album.cover_medium}" class="card-img-top rounded-circle" alt="cover album Maneskin">
//     <div class="card-body">
//     <h5 class="card-title bg-white bg-opacity-25 rounded-pill ">${music[i].title}</h5>
//     <audio controls style="width: 180px;"><source src="${music[i].preview}" type="audio/ogg"></audio>
//     <a href="${music[i].artist.link}" class="btn btn-primary">Go to link</a></div>`
// }

// const searchBar = document.getElementById('searchBar');

// console.log(searchBar);
// searchBar.addEventListener('keyup',(e) =>{
//     const searchString = e.target.value;
//     const filteredAlbum = music.filter( song =>{
//     return song.title.toLowerCase().includes(searchString.toLowerCase())
// });
//     console.log(filteredSongs)
//     let showcard = document.getElementById('cards')
//     showcard.innerHTML=''
//     for (let i=0; i<filteredSongs.length; i++){
//         let scheda = document.createElement('div');
//         scheda.classList.add('card', 'bg-transparent', 'border-0')
//         scheda.innerHTML += `<img src="${filteredSongs[i].album.cover_medium}" class="card-img-top rounded-circle" alt="cover album Maneskin">
//         <div class="card-body"><h5 class="card-title bg-white bg-opacity-25 rounded-pill ">${filteredSongs[i].title}</h5>
//         <audio controls style="width: 180px;"><source src="${filteredSongs[i].preview}" type="audio/ogg"></audio>
//         <a href="${filteredSongs[i].artist.link}" class="btn btn-primary">Go to link</a>`
//         showcard.appendChild(scheda);
//     }
// })

// }

// showApi()

// PLAYER

function selectedHeart() {
  let btnHeart = document.getElementById("heart");
  let btnHeartFill = document.getElementById("heart-fill");

  btnHeart.classList.toggle("d-none");
  btnHeartFill.classList.toggle("d-none");
}

function selectedPlayPause() {
	let btnPlay = document.getElementById("btn_play");
	let btnPause = document.getElementById("btn_pause");

	btnPlay.classList.toggle("d-none");
	btnPause.classList.toggle("d-none");
}

function selectedBtnAudioColorizeGreen(event) {
	console.log(event);
}
