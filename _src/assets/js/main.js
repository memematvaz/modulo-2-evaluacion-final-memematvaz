'use strict';

console.log('>> Ready :)');


//VARIABLES ALL PROJECT
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const main = document.querySelector('#main')
const favouriteContainerList = document.querySelector('#favourites-series');




let series = [];
let favouriteList = [];


//CONNECT TO API

function searchSeries() {
  let url = 'http://api.tvmaze.com/search/shows?q=' + searchInput.value;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      series = data
      renderSeries(series)

    })
};


function getSerieFromAPI(serieID) {
    let url = 'http://api.tvmaze.com/shows/' + serieID;
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(serieID, data)
        renderFavoriteShow(data);
        
      })
  };
  
  
//RENDER SERIES SEARCHED


function renderSeries(series) {

  main.innerHTML = ''

  for (let item of series) {
    if (item.show.image !== null) {
      main.innerHTML += `<section id='${item.show.id.toString()}' class='section'><div><img src=${item.show.image.medium} alt=${item.show.name} class='image'></div><h3 class='section-title'>${item.show.name}</h3></section>`
    } else {
      main.innerHTML += `<section id='${item.show.id.toString()}' class='section'><div><img src='https://via.placeholder.com/210x295/ffffff/666666/?
    text=TV' alt=${item.show.name} class='image container'></div><h3 class='section-title'>${item.show.name}</h3></section>`
    }
  }
  addClickListeners();
}

function addClickListeners() {
  const section = document.querySelectorAll('.section');
  for (let serie of section) {
    serie.addEventListener('click', saveFavourites)
  }
}

//FAVOURITES


function addToFavorites(serieID) {
    let favoriteList = JSON.parse(localStorage.getItem('favouriteIDsList'));
    if(favoriteList === null) {
        favoriteList = [];
    }
    if (favoriteList.indexOf(serieID) === -1) {
        favoriteList.push(serieID);
        localStorage.setItem('favouriteIDsList', JSON.stringify(favoriteList));
    }
}

function saveFavourites(event) {
  const serieID = event.currentTarget.id;
  if (favouriteList.indexOf(favourite) === -1) {
 
    // guardar ID en localStorage
    addToFavorites(serieID);
    // renderizar todos las series
    renderAllSavedShows()

    } else {
        alert('Esa serie ya está en favoritos')
    }
}



function renderAllSavedShows() {
    favouriteContainerList.innerHTML = '';
    const favoriteList = JSON.parse(localStorage.getItem('favouriteIDsList'))
    if(favoriteList !== null) {
        for( let serieID of favoriteList){
            getSerieFromAPI(serieID)
        }
    }
}


function renderFavoriteShow(serieObjet) {
    favouriteContainerList.innerHTML += `<li class='li-title'>${serieObjet.name}<li>`;
}


//LISTENERS ALL PROJECT
searchButton.addEventListener('click', searchSeries)

//LOAD PREVIUS SAVED SHOWS
renderAllSavedShows()