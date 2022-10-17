let artist = [
	"maneskin",
	"gemitaiz",
	"night skinny",
	"lazza",
	"lizzo",
	"salmo",
	"twenty one pilots",
	"madonna",
];

const searchBar = document.getElementById("search-value");

async function showApi() {
	let musiclink = await fetch(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=maneskin`
	);
	let responseText = await musiclink.json();

	let music = responseText.data;

	console.log(music);

	//    <div id="main-album">
	// 		<p>Album</p>
	// 		<div id="box-cover-md">
	// 			<div id="box-text"></div>
	// 		</div>
	// 	</div>;
	let coverImg = document.getElementById("box-cover-md");
	let textCard = document.getElementById("box-text");
	console.log(textCard);

	for (let i = 0; i < 1; i++) {
		coverImg.innerHTML = `<img src=${music[i].album.cover_medium} alt="kk">`;
		console.log(music[i].album.title);
		textCard.innerHTML = `<p>${music[i].title}</p>`;
	}
}

function selectedArtist(e) {
	const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist[0]}`;
	const urlObj = new URL(url).searchParams;
	const valueOfInput = searchBar.value;
	console.log(valueOfInput);

	const q = urlObj.get("q");
	console.log(q);

	urlObj.set("q", valueOfInput);

	console.log(urlObj.toString());

	let newParams = urlObj.toString();
	let newUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?${newParams}`;
	console.log(newUrl);

	getAlbum(newUrl);
}

async function getAlbum(urlAlbum) {
	let albumOfArtist = await fetch(urlAlbum);
	let albumOfArtistJSON = await albumOfArtist.json();
	console.log(albumOfArtistJSON.data);

	let arrAlbum = albumOfArtistJSON.data;
	let boxImgCover = document.getElementById("box-cover-md");

	for (let i = 0; i < arrAlbum.length; i++) {
		let imgCard = `<img src=${arrAlbum[i].album.cover_medium} alt="images of album">
        <p>${arrAlbum[i].album.title}</p>`;

		console.log(arrAlbum[i].album.cover_medium);
		boxImgCover.innerHTML += imgCard;
	}
}

showApi();
