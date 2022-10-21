// fetch + card e pagine: Home e Search

async function showApi(n) {
  let musiclink = await fetch(n);
  let responseText = await musiclink.json();
  let music = responseText.data;
  console.log(music);
  i = Number(Math.floor(Math.random() * 25));

  // Homepage

  let hero = document.getElementById("imgHero");
  hero.innerHTML = `<img onclick="albumPage('${music[i].artist.name}')" src="${music[i].album.cover_medium}" class="img-fluid rounded-start" alt="cover">`;
  let cardtitle = document.getElementById("cardTitle");
  cardtitle.innerHTML = `${music[i].album.title}`;
  let cardArtist = document.getElementById("cardArtist");
  cardArtist.innerHTML = `${music[i].artist.name}`;
  let cardtext = document.getElementById("cardtext");
  cardtext.innerHTML = `${music[i].artist.name}`;
  let playSaveBtn = document.getElementById("playSaveBtn");
  playSaveBtn.innerHTML = `<button class="heroBtnGreen me-3" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist.name}', '${music[i].title}', '${music[i].album.cover_medium}'); getAudioObj('${music[i].preview}')">Play</button>
  <button class="heroBtnTran" onclick="albumPage('${music[i].artist.name}')">Save</button>`;
  let row1 = document.getElementById("rows");
  row1.innerHTML += `<div class="card mb-3 homeCard" onclick="artistPage('${music[i].artist.name}')">
  <div class="cardContent">
    <div>
      <img src="${music[i].album.cover_small}" class="w-100 rounded-start homeImg" alt="cover small">
      <div class=" position-absolute homePreview" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist}')">
      <i class="bi bi-play-fill"></i>
       </div>
    </div>
    <div class="cardTitle">
      <div class="card-body">
        <p class="card-title cardText">${music[i].artist.name}</p>
      </div>
  </div>
</div>`;

  // searchPage
  function SearchPage() {
    document.getElementById("search").addEventListener("click", () => {
      let onSearchPage = document.getElementById("searchPage");
      onSearchPage.classList.remove("d-none");
      let homep = document.querySelector("#Homepage");
      homep.classList.add("d-none");
    });

    let showcard = document.getElementById("artists");
    showcard.innerHTML += `<div  class="card border-0 resultCard">
            <div class="position-relative">
            <img src="${music[i].artist.picture_medium}" class="card-img-top rounded-circle" alt="artista" onclick="artistPage('${music[i].artist.name}')">
            <div class="position-absolute preview" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist.name}', '${music[i].title}', '${music[i].album.cover_medium}'); getAudioObj('${music[i].preview}')">
            <i class="bi bi-play-fill"></i>
            </div>
            </div>
            <div class="card-body">
            <h5 class="card-title text-white">${music[i].artist.name}</h5>
            <h6>Artists</h6>
            </div>`;

    let showAlbum = document.getElementById("albums");

    showAlbum.innerHTML += `<div class="card border-0 bg-dark resultCard">
        <div class="position-relative">
        <img src="${music[i].album.cover_medium}" class="card-img-top" alt="album" onclick="albumPage('${music[i].artist.name}')">  
            <div class=" position-absolute preview" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist}')">
            <i class="bi bi-play-fill"></i>
            </div>
        </div>
        <div class="card-body">
        <h5 class="card-title text-white">${music[i].album.title}</h5>
        <p>${music[i].artist.name}</p>
        </div>`;
  }
  SearchPage();
}

//fetch di un unico artista per funzioni su pagine specifiche
async function returnApi(newA) {
  let musicLink = await fetch(newA);
  let respText = await musicLink.json();
  let artista = respText.data;
  console.log(artista);

  function fillArtistPage() {
    let onPageArtist = document.getElementById("artistPage");
    onPageArtist.classList.remove("d-none");
    document.getElementById("searchPage").classList.add("d-none");
    document.getElementById("albumPage").classList.add("d-none");
    document.getElementById("Homepage").classList.add("d-none");
    let showArtist = document.getElementById("headArtist");
    showArtist.style.backgroundImage = `url(${artista[i].artist.picture_xl})`;
    showArtist.innerHTML = `
    <p><img src="./assets/img/artist-verified-png.png" alt="" width="50px"><span>Verified artist</span></p>
    <h1 id="artistPageTitle">${artista[i].artist.name}</h1> 
    <p class="fs-6 mt-5">18,375,540 monthly listener</p>`;
    let follow = document.getElementById("follow");
    follow.innerHTML += `<p><img class="w-25 position-absolute preview" src="" alt="" onclick="playA('${artista[i].preview}')">
    <button id="followBtn">Follow</button>`;
    let showSongs = document.getElementById("artistSongs");
    for (let i = 1; i < 6; i++) {
      let mn = Number(Math.floor(Math.random() * 3 + 3));
      let sc = Number(Math.floor(Math.random() * 5));
      let s = Number(Math.floor(Math.random() * 9));
      let nr = Number(Math.floor(Math.random() * 700000 + 1000000));
      showSongs.innerHTML += `<tr>
      <th scope="row" onclick="playA('${artista[i].preview}')">${[i]}</th>
      <td><img src="${artista[i].album.cover_medium}" alt=""></td>
      <td>${artista[i].title}</td>
      <td>${nr}</td>
      <td>${mn}:${sc}${s}</td>
    </tr>`;
    }
    let showDisco = document.getElementById("discography");
    for (let i = 0; i < 5; i++) {
      let anno = Number(Math.floor(Math.random() * 20 + 2000));
      showDisco.innerHTML += `<div class="card border-0 bg-dark resultCard p-3">
    <div class="position-relative">
    <img src="${artista[i].album.cover_medium}" class="card-img-top" alt="album" onclick="albumPage('${artista[i].artist.name}')">  
        <div class="position-absolute preview" onclick="playA('${artista[i].preview}')">
        <i class="bi bi-play-fill"></i>
        </div>
    </div>
    <div class="card-body">
    <h5 class="card-title text-white">${artista[i].album.title}</h5>
    <p>${anno} &#183; Album</p>
    </div>`;
    }
    let showFeat = document.getElementById("feature");
    showFeat.innerHTML += `<h2 class="px-1 mb-4 mt-4 fs-4 fw-bold">Featuring ${artista[i].artist.name}</h2>`;

    let showAbout = document.getElementById("about");
    showAbout.style.backgroundImage = `url(${artista[i].artist.picture_big})`;
    showAbout.innerHTML += `<div>
    <h5 class="card-title text-white px-1 mb-4 fs-4 fw-bold">18,375,540 monthly listener</h5>
    <p class="fs-6">Throughout ${artista[i].artist.name}'s career, vocalist/guitarist's notorious public image has overshadowed her band's music. 
    In their original incarnation, Hole was one of the noisiest, most abrasive alternative bands performing in the early '90s.</p>
    </div>`;
  }
  fillArtistPage();
}

//fetch di un unico album per funzioni su pagine specifiche
async function returnAlbumApi(newA) {
  let albumLink = await fetch(newA);
  let responsText = await albumLink.json();
  let album = responsText.data;
  console.log(album);

  function fillAlbumPage() {
    let onPageAlbum = document.getElementById("albumPage");
    onPageAlbum.classList.remove("d-none");
    document.getElementById("searchPage").classList.add("d-none");
    document.getElementById("Homepage").classList.add("d-none");
    document.getElementById("artistPage").classList.add("d-none");
    let anno = Number(Math.floor(Math.random() * 20 + 2000));
    let showAlbum = document.getElementById("headAlbum");
    showAlbum.innerHTML = `<div id="coverContainer"><img id="albumCover" src="${album[i].album.cover_medium}" alt="Album"></div>
  <div id="albumContent" class="ms-4"><h1 id="albumTitle">${album[i].artist.name}</h1>
  <p><img class="rounded-circle coverArtist me-2" src="${album[i].artist.picture_small}" alt="Artista"><span class="fw-bold"> ${album[i].artist.name}</span> &#183; ${anno} &#183; 24 songs,<span id="text-gray">49 min 15 sec</span></p></div>`;
    let listen = document.getElementById("listen");
    listen.innerHTML += `<div class="d-flex align-items-center mt-3"> 
    <div class=" albumPreview" onclick="playA('${album[1].preview}')">
        <i class="bi bi-play-fill"></i>
        </div>
      <div id="heart">  
    <img src="./assets/img/heart_spotify.png"  alt="heart" class="text-white w-100"></div></div>`;
    let songsList = document.getElementById("songsList");
    for (let i = 1; i < album.length; i++) {
      let mn = Number(Math.floor(Math.random() * 3 + 3));
      let sc = Number(Math.floor(Math.random() * 5));
      let s = Number(Math.floor(Math.random() * 9));
      songsList.innerHTML += `<tr>
    <th scope="row" onclick="playA('${album[i].preview}')">${[i]}</th>
    <td><p>${album[i].title}</p>
    <p>${album[i].artist.name}</p></td>
    <td>${mn}:${sc}${s}</td>
  </tr>`;
    }
    let more = document.getElementById("moreAlbum");
    more.innerHTML += `<h2 id="moreBy">More by ${album[i].artist.name}</h2>`;
    for (let i = 0; i < 5; i++) {
      let anno = Number(Math.floor(Math.random() * 20 + 2000));
      more.innerHTML += `<div class="card border-0 bg-dark resultCard p-3">
  <div class="position-relative">
  <img src="${album[i].album.cover_medium}" class="card-img-top" alt="album" onclick="albumPage('${album[i].artist.name}')">  
      <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${album[i].preview}')">
  </div>
  <div class="card-body">
  <h5 class="card-title text-white">${album[i].album.title}</h5>
  <p>${anno}</p>
  </div>`;
    }
  }
  fillAlbumPage();
}

//creazione pagina Artista
function artistPage(a) {
  if (a === "Måneskin") {
    a = "Maneskin";
  }
  let newUrl3 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${a}`;
  artista = returnApi(newUrl3);
  console.log(artista);
  fillArtistPage();
}

//creazione pagina Album
function albumPage(b) {
  if (b === "Måneskin") {
    b = "Maneskin";
  }
  let newUrl4 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${b}`;
  album = returnAlbumApi(newUrl4);
  console.log(album);
  fillAlbumPage();
}
// funzione per play
function playA(a) {
  let aux = document.querySelector(".player");
  if (aux.paused || aux.currentTime === 0 || aux.ended) {
    aux.src = a;
    aux.play();

    setStartFillerBar();
    // setNameArtistSong();
  } else {
    aux.pause();
    setPauseFillerBar();
  }
}

// URLSearchParams per cambio query
const searchBar = document.getElementById("searchBar");
console.log(searchBar);
const urlBase = "q=radiohead";

function searchArtist(eventObject) {
  console.log(eventObject);
  if (eventObject.which == 13 || eventObject.keyCode == 13) {
    eventObject.preventDefault();
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
}

// array artisti di default
let arrayArtists = ["Radiohead", "Lizzo", "Maneskin", "Night Skinny", "Nirvana"];

for (let i = 0; i < arrayArtists.length; i++) {
  let newUrl2 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${arrayArtists[i]}`;
  showApi(newUrl2);
}

// PLAYER

function selectedHeart() {
  let btnHeart = document.getElementById("heart");
  let btnHeartFill = document.getElementById("heart-fill");
  let modalPlaceholder = document.getElementById("modal-placeholder");
  let replaceTxtAdded = document.querySelector("#replace-txt-added");
  let replaceTxtRemoved = document.querySelector("#replace-txt-removed");

  btnHeart.classList.toggle("d-none");
  btnHeartFill.classList.toggle("d-none");

  // Al primo click, mi deve apparire il placeholder con la scritta "aggiunto"
  modalPlaceholder.classList.toggle("d-none");
  // Dopo pochi secondi, mi deve sparí il placeholder
  const showPlaceholdet = setTimeout(() => {
    modalPlaceholder.classList.add("d-none");
  }, 3000);

  console.log(replaceTxtRemoved.className);

  // quando clicco di nuovo sul cuoricino, deve comparire il placeholder
  // con la scritta "rimosso"

  replaceTxtAdded.classList.toggle("d-none");
  replaceTxtRemoved.classList.toggle("d-none");
}

function selectedPlayPause() {
  let btnPlay = document.getElementById("btn_play");
  let btnPause = document.getElementById("btn_pause");

  btnPlay.classList.toggle("d-none");
  btnPause.classList.toggle("d-none");
}

function selectedBtnMuteAudio() {
  let btnVolumeUp = document.querySelector("#btn_volume-up");
  let btnVolumeMute = document.querySelector("#btn_volume-mute");

  btnVolumeMute.classList.toggle("d-none");
  btnVolumeUp.classList.toggle("d-none");
}

function selectedBtnAudioColorizeGreen(event) {
  console.log(event);
  let btnSelected = event.querySelector(".bi");

  console.log(btnSelected);

  btnSelected.classList.toggle("btn_colorize-green");
}

function selectedModalControlDevic() {
  let modalElement = document.getElementById("modal_control-device");

  modalElement.classList.toggle("d-none");
}

// creare una funzione che, al click del preview-audio, parte il play, scorre il tempo
// sulla sinistra, la barra si riempie in 30s, si ferma il loop,
// l'hover deve far diventare la barra in verde ed aggiungere (se ci riesci), una pallina bianca

let seconds = 1;
let stopAudioPreview = false;
let clearIntervalID = 0;

function setStartFillerBar() {
  const progressTimeElement = document.querySelector("#progress-time");
  const fillerBarElement = document.querySelector("#filler_bar-time");
  const audioPlayer = document.querySelector(".player");

  console.log(audioPlayer);

  // console.log(progressTimeElement, fillerBarElement);

  // console.log(
  // 	fillerBarElement.className.includes("paused-animation_filler-bar")
  // );

  fillerBarElement.classList.add("animation_filler-bar");

  const changeSeconds = setInterval(() => {
    if (seconds < 10) {
      seconds = "0" + `${seconds}`;
    }

    progressTimeElement.innerHTML = `0:${seconds}`;
    seconds++;

    clearIntervalID = changeSeconds;

    if (seconds === 31) {
      clearInterval(changeSeconds);
      seconds = 1;
    }
    // console.log(typeof progressTimeElement.innerHTML);
  }, 1000);

  if (fillerBarElement.className.includes("paused-animation_filler-bar")) {
    fillerBarElement.classList.remove("paused-animation_filler-bar");
  }
}

// Devi fare in modo che l'animazione e il tempo si fermino

// L'animazione ora si deve fermare, senza toccare il tempo.
// Devo trovare un modo per passare l'ID del clearInterval in modo dinamico

function setPauseFillerBar() {
  let fillerBarElement = document.querySelector("#filler_bar-time");

  fillerBarElement.classList.toggle("paused-animation_filler-bar");

  console.log(clearIntervalID);

  clearInterval(clearIntervalID);
}

// ora devi fare in modo che il titolo e l'artista cambi di testo al click

function setNameArtistSong(artist, song, coverImg) {
  console.log(artist, song, coverImg);

  let coverImgPlayer = document.querySelector("#cover-player");
  let nameArtistPlayer = document.querySelector("#sub-test_player");
  let titleSongPlayer = document.querySelector("#title-song");

  coverImgPlayer.src = `${coverImg}`;
  nameArtistPlayer.innerHTML = `${artist}`;
  titleSongPlayer.innerHTML = `${song}`;
}

let newObj;

// Funzione che recupera l'url dell'audio cliccato
function getAudioObj(audioPreview) {
  let audioObj = new Audio(audioPreview);
  console.log(audioObj);

  newObj = audioObj;
}

// Funzione che cambia il volume dell'audio cliccato
function changeVolume(rangeValue) {
  let playerElement = document.querySelector(".player");
  playerElement.volume = rangeValue;
}

// Funzione che al click muta e smuta l'audio
let audioState = false;
function mutedAudio() {
  let playerElement = document.querySelector(".player");

  if (audioState === false) {
    playerElement.muted = true;
    audioState = true;
    console.log(audioState);
  } else {
    playerElement.muted = false;
    audioState = false;
    console.log(audioState);
  }
}

// creare una funzione che resetta
