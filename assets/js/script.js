// fetch + card e pagine

async function showApi(n) {
  let musiclink = await fetch(n);
  let responseText = await musiclink.json();
  let music = responseText.data;
  console.log(music);
  i = Number(Math.floor(Math.random() * 25));

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



//fetch di un unico artista per funzioni su pagine specifiche
async function returnApi(newA) {
  let musicLink = await fetch(newA);
  let respText = await musicLink.json();
  let artista = respText.data;
  console.log(artista);
  

  function fillArtistPage() {
    let onPageArtist = document.getElementById("artistPage");
    onPageArtist.classList.remove("d-none")
    document.getElementById("searchPage").classList.add("d-none")
    let showArtist = document.getElementById("headArtist");
    showArtist.innerHTML = `<div id="imgBox" ><img src="${artista[i].artist.picture_xl}" alt=""></div>
    <p><img src="./assets/img/artist-verified-png.png" alt="" width="50px"><span>Verified artist</span></p>
    <h1>${artista[i].artist.name}</h1> 
    <p>18,375,540 monthly listener</p>`;
    let follow = document.getElementById("follow");
    follow.innerHTML += `<p><img class="w-25 position-absolute preview" src="" alt="" onclick="playA('${artista[i].preview}')">
    <button>Follow</button>`;
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
    showDisco.innerHTML +=`<div class="card border-0 bg-dark resultCard p-3">
    <div class="position-relative">
    <img src="${artista[i].album.cover_medium}" class="card-img-top" alt="album" onclick="albumPage('${artista[i].artist.name}')">  
        <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${artista[i].preview}')">
    </div>
    <div class="card-body">
    <h5 class="card-title text-white">${artista[i].album.title}</h5>
    <p>${anno} &#183; Album</p>
    </div>`;
    }
    let showFeat = document.getElementById("feature");
    showFeat.innerHTML +=`<h2>Featuring ${artista[i].artist.name}</h2>`
    console.log(showFeat);
    let showAbout = document.getElementById("about");
    showAbout.innerHTML +=`<div><img src="${artista[i].artist.picture_big}" alt="artista">
    <h5 class="card-title text-white">18,375,540 monthly listener</h5>
    <p>Throughout ${artista[i].artist.name}'s career, vocalist/guitarist's notorious public image has overshadowed her band's music. 
    In their original incarnation, Hole was one of the noisiest, most abrasive alternative bands performing in the early '90s.</p>
    </div>`
    console.log(showFeat);
  }
  fillArtistPage();
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

// funzione per play
function playA(a) {
  let aux = document.querySelector(".player");
  if (aux.paused || aux.currentTime === 0 || aux.ended) {
    aux.src = a;
    aux.play();
  } else {
    aux.pause();
  }
}

// URLSearchParams per cambio query
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

// array artisti di default
let arrayArtists = ["Radiohead", "Lizzo", "Maneskin","Night Skinny","Nirvana"];

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

  // quando clicco di nuovo sul cuoricino, deve comparire il placeholder
  // con la scritta "rimosso"
  if (replaceTxtRemoved.classList === "") {
    modalPlaceholder.classList.remove("d-none");

    replaceTxtAdded.classList.toggle("d-none");
    replaceTxtRemoved.classList.toggle("d-none");

    const showRemoveTxt = setTimeout(() => {
      modalPlaceholder.classList.add("d-none");
    }, 3000);
  }

  // CHIEDERE A LIDIA PERCHE FUNZIONA QUESTA MIA LOGICA
  replaceTxtAdded.classList.toggle("d-none");
  replaceTxtRemoved.classList.toggle("d-none");
}

function selectedPlayPause() {
  let btnPlay = document.getElementById("btn_play");
  let btnPause = document.getElementById("btn_pause");

  btnPlay.classList.toggle("d-none");
  btnPause.classList.toggle("d-none");
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
