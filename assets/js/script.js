async function showApi(n) {
  let musiclink = await fetch(n);
  let responseText = await musiclink.json();
  let music = responseText.data;
  console.log(music);

  function card() {
    let showcard = document.getElementById("artists");
    showcard.innerHTML += `<div id="resultCard" class="card border-0">
            <img src="${music[0].artist.picture_medium}" class="card-img-top rounded-circle" alt="artista">
             <audio id='player-album'>
            <source src="${music[2].preview}" type='audio/mpeg'>
            </audio>
            <button class='btn_audio-preview' onclick="togglePlay()"><i id="playIcon" class="bi bi-play-circle-fill d-block"></i></button>
            <div class="card-body">
            <h5 class="card-title text-white">${music[0].artist.name}</h5>
            <h6>Artists</h6>
            </div>`;
  }
  card();

  // for (let i=0; i<music.length; i++){
  //     let showcard = document.getElementById('cards')
  //     showcard.innerHTML += `<div class="card bg-transparent border-0">
  //     <img src="${music[i].album.cover_medium}" class="card-img-top rounded-circle" alt="cover album Maneskin">
  //     <div class="card-body">
  //     <h5 class="card-title bg-white bg-opacity-25 rounded-pill ">${music[i].title}</h5>
  //     <audio controls style="width: 180px;"><source src="${music[i].preview}" type="audio/ogg"></audio>
  //     <a href="${music[i].artist.link}" class="btn btn-primary">Go to link</a></div>`
  // }
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

let arrayArtists = ["Night Skinny", "Radiohead", "Lazza", "Lizzo", "Maneskin", "Noyz Narcos", "Salmo", "Gemitaiz", "Twenty one Pilots", "Madonna"];

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
