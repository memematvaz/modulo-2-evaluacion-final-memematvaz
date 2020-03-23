


'use strict';

console.log('>> Ready :)');


//VARIABLES ALL PROECT
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const main = document.querySelector('#main')
const favouriteContainerList = document.querySelector('#favourites-series');



let serieList = null;
const selectedSeries = readLocalStorage();
let favouriteArray = []


//CONNECT TO API

function connectToApi() {
  let url = 'http://api.tvmaze.com/search/shows?q=' + searchInput.value;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      serieList = data;
      renderSeries(serieList);
      renderFavourites(selectedSeries);
    })
};

//RENDER SERIES SEARCHED


function renderSeries(series) {

  main.innerHTML = ''

  for (let serie of serieList) {
    if (serie.show.image !== null) {
      main.innerHTML += `<section id='${serie.show.id.toString()}' class='section'><div><img src=${serie.show.image.medium} alt=${serie.show.name} class='image'></div><h3 class='section-title'>${serie.show.name}</h3></section>`
    } else {
      main.innerHTML += `<section id='${serie.show.id.toString()}' class='section'><div><img src='https://via.placeholder.com/210x295/ffffff/666666/?
      text=TV' alt=${serie.show.name} class='image container'></div><h3 class='section-title'>${serie.show.name}</h3></section>`
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



//LOCALSTORAGE

function setLocalStorage() {
  localStorage.setItem('serieInfo', JSON.stringify(selectedSeries))
}


function readLocalStorage() {
  
  let localInfo = JSON.parse(localStorage.getItem('serieInfo'))
  if (localInfo !== null) {
    return localInfo
  } else {
    return localInfo = []
  }
}

//FAVOURITES


function saveFavourites(event) {
  const favourite = event.currentTarget;
  if (selectedSeries.indexOf(favouriteArray) === -1) {
    
    selectedSeries.push(favouriteArray);
    
    setLocalStorage()
    renderFavourites();

  } else {
    alert('Esa serie ya está en favoritos')
  }
}
console.log(favouriteArray)


function getSerieObject() {
  return serieList.find(serie => serie.show === parseInt())
}




function renderFavourites(favouriteArray) {

  favouriteContainerList.innerHTML = '';
  for (let favourite of favouriteArray) {
    const serie = getSerieObject(favourite);

    if (favourite === serie.show.id) {
      favouriteContainerList.innerHTML += `<li class='li-title'>${serie.show.name}<button type="button">Borrar</button><li>`;
      addFavouriteListeners();
    }
  }
}










function addFavouriteListeners() {
  const liList = document.querySelectorAll('button');
  for (let li of liList) {
    li.addEventListener('click', removeSerie);
  }
}


function removeSerie(event) {
  const elemId = event.currentTarget.parentElement.id;
  const elemIndex = selectedSeries.indexOf(elemId);
  selectedSeries.splice(elemIndex, 1);
  setLocalStorage();
  renderFavourites(selectedSeries);
}



//LISTENERS ALL PROJECT
searchButton.addEventListener('click', connectToApi)