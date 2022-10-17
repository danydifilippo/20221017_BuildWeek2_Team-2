// async function showApi() {
//     let musiclink = await fetch ('https://striveschool-api.herokuapp.com/api/deezer/search?q=maneskin');
//     let responseText = await musiclink.json();
//     console.log(responseText);
//     let music = responseText.data;
//     console.log(music);
    
//     for (let i=0; i<music.length; i++){
//         let showcard = document.getElementById('cards')
//         let scheda = document.createElement('div');
//         scheda.classList.add('card', 'bg-transparent', 'border-0')
//         scheda.innerHTML += `<img src="${music[i].album.cover_medium}" class="card-img-top rounded-circle" alt="cover album Maneskin">
//         <div class="card-body"><h5 class="card-title bg-white bg-opacity-25 rounded-pill ">${music[i].title}</h5>
//         <audio controls style="width: 180px;"><source src="${music[i].preview}" type="audio/ogg"></audio>
//         <a href="${music[i].artist.link}" class="btn btn-primary">Go to link</a>`
//         showcard.appendChild(scheda);
//     }
    
 
//     const searchBar = document.getElementById('searchBar');
 
//     console.log(searchBar);
//     searchBar.addEventListener('keyup',(e) =>{
//         const searchString = e.target.value;
//         const filteredSongs = music.filter( song =>{
//         return song.title.toLowerCase().includes(searchString.toLowerCase())
//     });
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