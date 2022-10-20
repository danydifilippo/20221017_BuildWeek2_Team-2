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
            <img class="w-25 position-absolute preview" src="./assets/img/play-button.png" alt="" onclick="playA('${music[i].preview}'); setNameArtistSong('${music[i].artist.name}', '${music[i].title}', '${music[i].album.cover_medium}'); getAudioObj('${music[i].preview}')">
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

async function returnApi(newA) {
	let musicLink = await fetch(newA);
	let respText = await musicLink.json();
	let artista = respText.data;
	console.log(artista);
	let i = Number(Math.floor(Math.random() * 25));
	let mn = Number(Math.floor(Math.random() * 4 + 1));
	let sc = Number(Math.floor(Math.random() * 5));
	let s = Number(Math.floor(Math.random() * 9));
	let nr = Number(Math.floor(Math.random() * 700000 + 100000));

	function fillArtistPage() {
		let showArtist = document.getElementById("headArtist");
		showArtist.innerHTML = `<img src="${artista[i].artist.picture_xl}" alt="">
    <p><img src="./assets/img/artist-verified-png.png" alt="" width="50px"><span>Verified artist</span></p>
    <h1>${artista[i].artist.name}</h1> 
    <p>18,375,540 monthly listener</p>`;
		console.log(showArtist);
		let follow = document.getElementById("follow");
		follow.innerHTML += `<p><img class="w-25 position-absolute preview" src="" alt="" onclick="playA('${artista[i].preview}')">
    <button>Follow</button>`;
		let showSongs = document.getElementById("artistSongs");
		console.log(showSongs);
		for (let i = 1; i < 4; i++) {
			showSongs.innerHTML += `<tr><th scope="row" onclick="playA('${artista[i].preview}')>${i}</th><td><img src="${artista[i].album.cover_small}" class="card-img-top" alt="album"></td>
    <td>${artista[i].title}</td>
    <td>${nr}</td>
    <td>${mn}:${sc}${s}</td>
    <td></td>
  </tr>`;
		}
	}
	fillArtistPage();
}
function artistPage(a) {
	if (a === "Måneskin") {
		a = "Maneskin";
	}
	let newUrl3 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${a}`;
	artista = returnApi(newUrl3);
	console.log(artista);
	fillArtistPage(artista);
}

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
