// fetch + card e pagine

async function showApi(n) {
	let musiclink = await fetch(n);
	let responseText = await musiclink.json();
	let music = responseText.data;
	console.log(music);
	i = Number(Math.floor(Math.random() * 25));

	function card() {
		let stringTitleAlbum = String(music[i].album.title);
		let stringMusicTitle = String(music[i].artist.name);
		// indexOf();
		// replace();
		if (stringTitleAlbum.indexOf("'") !== -1) {
			stringTitleAlbum.replace("'", " ");
		}

		if (stringMusicTitle.indexOf("'") !== -1) {
			stringMusicTitle.replace("'", " ");
		}

		console.log(stringTitleAlbum);

		let showcard = document.getElementById("artists");
		showcard.innerHTML += `<div  class="card border-0 resultCard">
            <div class="position-relative">
            <img src="${music[i].artist.picture_medium}" class="card-img-top rounded-circle" alt="artista" onclick="artistPage('${music[i].artist.name}')">
            <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist.name}', '${stringMusicTitle}', '${music[i].album.cover_medium}','${music[i].preview}', '${stringTitleAlbum}'); getAudioObj('${music[i].preview}')">
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
            <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist}')">
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
		onPageArtist.classList.remove("d-none");
		document.getElementById("searchPage").classList.add("d-none");
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
			showDisco.innerHTML += `<div class="card border-0 bg-dark resultCard p-3">
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
		showFeat.innerHTML += `<h2>Featuring ${artista[i].artist.name}</h2>`;
		console.log(showFeat);
		let showAbout = document.getElementById("about");
		showAbout.innerHTML += `<div><img src="${artista[i].artist.picture_big}" alt="artista">
    <h5 class="card-title text-white">18,375,540 monthly listener</h5>
    <p>Throughout ${artista[i].artist.name}'s career, vocalist/guitarist's notorious public image has overshadowed her band's music. 
    In their original incarnation, Hole was one of the noisiest, most abrasive alternative bands performing in the early '90s.</p>
    </div>`;
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

		setStartFillerBar(a);
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
let arrayArtists = [
	"Radiohead",
	"Lizzo",
	"Maneskin",
	"Night Skinny",
	"Nirvana",
];

for (let i = 0; i < arrayArtists.length; i++) {
	let newUrl2 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${arrayArtists[i]}`;
	showApi(newUrl2);
}

// PLAYER
let clickedHeart = false;

function selectedHeart() {
	let btnHeart = document.getElementById("heart");
	let btnHeartFill = document.getElementById("heart-fill");
	let modalPlaceholder = document.getElementById("modal-placeholder");
	let replaceTxtAdded = document.querySelector("#replace-txt-added");
	let replaceTxtRemoved = document.querySelector("#replace-txt-removed");

	!clickedHeart;

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
let elementSrcAudio;

function setStartFillerBar(previewAudio) {
	const progressTimeElement = document.querySelector("#progress-time");
	const fillerBarElement = document.querySelector("#filler_bar-time");
	const audioPlayer = document.querySelector(".player");

	fillerBarElement.classList.add("animation_filler-bar");
	console.log("preview Audio", previewAudio);

	// logica if che permette di resettare sia l'animazione che il cronometro
	// cliccando brani diversi
	if (elementSrcAudio !== previewAudio && elementSrcAudio !== undefined) {
		fillerBarElement.classList.remove("animation_filler-bar");
		void fillerBarElement.offsetWidth;
		fillerBarElement.classList.add("animation_filler-bar");
		progressTimeElement.innerHTML = `0:00`;
		seconds = 1;
	}

	elementSrcAudio = previewAudio;

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

class SongsFavorite {
	constructor(artist, song, coverImg, audioPreview, titleAlbum) {
		this.artist = artist;
		this.song = song;
		this.coverImg = coverImg;
		this.audioPreview = audioPreview;
		this.titleAlbum = titleAlbum;
	}
}

let arrFavoriteSongs = [];

function setNameArtistSong(artist, song, coverImg, audioPreview, titleAlbum) {
	console.log(artist, song, coverImg);

	let coverImgPlayer = document.querySelector("#cover-player");
	let nameArtistPlayer = document.querySelector("#sub-test_player");
	let titleSongPlayer = document.querySelector("#title-song");

	coverImgPlayer.src = `${coverImg}`;
	nameArtistPlayer.innerHTML = `${artist}`;
	titleSongPlayer.innerHTML = `${song}`;

	addTracksTail(artist, song, coverImg, audioPreview, titleAlbum);

	// 	arrFavoriteSongs.push(
	// 		new SongsFavorite(artist, song, coverImg, audioPreview)
	// 	);

	// 	console.log(arrFavoriteSongs);
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

// creare una funzione che avvia e stoppa l'audio

function playPausePlayer() {
	let aux = document.querySelector(".player");
	if (aux.paused || aux.currentTime === 0 || aux.ended) {
		aux.src = a;
		aux.play();

		setStartFillerBar(a);
		// setNameArtistSong();
	} else {
		aux.pause();
		setPauseFillerBar();
	}
}

// crea funzione coda
// al click del cuoricino, aggiunge in un array il brano selezionato
// carica nella sezione html CODA il brano selezionato

function addTracksTail(artist, song, coverImg, audioPreview, titleAlbum) {
	console.log("Avviata la addTracksTail");

	let stringTitleAlbum = String(titleAlbum);
	// indexOf();
	// replace();
	if (stringTitleAlbum.indexOf("'") !== -1) {
		stringTitleAlbum.replace("'", " ");
	}

	console.log(stringTitleAlbum);
	arrFavoriteSongs.push(
		new SongsFavorite(
			artist,
			song,
			coverImg,
			audioPreview,
			stringTitleAlbum
		)
	);

	console.log(arrFavoriteSongs);
	// else {
	// 		arrFavoriteSongs.pop();
	// 		console.log(arrFavoriteSongs);
	// 	}
}

function showFavoriteSongs() {
	let searchPage = document.querySelector("#searchPage");
	let favoriteSongsPage = document.querySelector("#tracksTail");
	let showTracks = document.querySelector("#show-tracks");
	let numberSongs = 1;

	showTracks.innerHTML = "";

	searchPage.classList.toggle("d-none");
	favoriteSongsPage.classList.toggle("d-none");

	console.log(arrFavoriteSongs);

	arrFavoriteSongs.map((song) => {
		console.log(song);

		showTracks.innerHTML += `
	          <div class="row-tracks">

	            <div class="col">
	              <div class="songs d-flex justify-content-left align-items-center">
	                <div class="number-song">${numberSongs++}</div>
	                <div class="favorite_cover-img">
	                  <img class="tail-coverImg" src="${song.coverImg}" alt="">
	                </div>
	                <div class="favorite_artiste-title--txt">
	                  <h3>${song.song}</h3>
	                  <p class="txt-color-grey">${song.artist}</p>
	                </div>
	              </div>
	            </div>

	            <div class="col">
	              <div class="heart_time">
	                <p class="txt-color-grey">${song.titleAlbum}</p>
	                <div class="hearts">
	                  <i class="bi bi-heart-fill" id="heart-fill"></i>
	                  <div class="time">2:53</div>
	                </div>

	              </div>
	            </div>

	          </div>
		`;
	});
}
