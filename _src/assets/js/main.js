'use strict';

console.log('>> Ready :)');


//VARIABLES ALL PROECT
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const main = document.querySelector('#main')
const section = document.querySelector('.section')
const favouriteContainerList = document.querySelector('#favourites-series');



let serieList = null;
const selectedSeries = readLocalStorage();


//CONNECT TO API

function connectToApi() {
  let url = 'http://api.tvmaze.com/search/shows?q=' + searchInput.value;
  fetch(url)
    .then(response => response.json())
    .then(data => {

      serieList = data;
      renderSeries(serieList);

    })
};

//RENDER SERIES SEARCHED


function renderSeries(serieList) {

  main.innerHTML = ''

  for (let serie of serieList) {
    if (serie.show.image !== null) {
      main.innerHTML += `<section id='${serie.show.id}' class='section'><div><img src=${serie.show.image.medium} alt=${serie.show.name} class='image'></div><h3 class='section-title'>${serie.show.name}</h3></section>`
    } else {
      main.innerHTML += `<section id='${serie.show.id}' class='section'><div><img src='https://via.placeholder.com/210x295/ffffff/666666/?
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
  let changeColor = event.currentTarget;
  changeColor.classList.add("section-favourite");

  const favourite = event.currentTarget.id;
  const objectSerie = getSerieId(favourite);

  if (selectedSeries.map(serie => serie.id).indexOf(objectSerie.show.id) === -1) {

    selectedSeries.push(objectSerie.show);



    setLocalStorage()
    renderFavourites(selectedSeries);
  } else {
    alert('Esa serie ya está en favoritos')
  }

}







function getSerieId(id) { 
  return serieList.find(serie => serie.show.id === parseInt(id)) 
}




function renderFavourites(favouriteArray) {

  favouriteContainerList.innerHTML = '';
  for (let favourite of favouriteArray) {
    if (favourite.image !== null) {
      favouriteContainerList.innerHTML += `<li><img src=${favourite.image.medium} alt=${favourite.name} </img> <p  class='li-title'>${favourite.name}</p><li>`;
    } else {
      favouriteContainerList.innerHTML += `<li><img src='https://via.placeholder.com/210x295/ffffff/666666/?
    text=TV' alt=${favourite.name} </img> <p  class='li-title'>${favourite.name}</p><li>`;
    }
  }

}






renderFavourites(selectedSeries)

//LISTENERS ALL PROJECT
searchButton.addEventListener('click', connectToApi)
