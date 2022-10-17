let artist = ["maneskin", "gemitaiz"];

const searchBar = document.getElementById("search-value");

async function showApi() {
	let musiclink = await fetch(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist[0]}`
	);
	let responseText = await musiclink.json();

	let music = responseText.data;
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
