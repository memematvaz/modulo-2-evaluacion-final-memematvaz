'use strict';

console.log('>> Ready :)');


//VARIABLES ALL PROECT
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const main = document.querySelector('#main')
const favouriteContainerList = document.querySelector('#favourites-series');



let series = [];

let favouriteList = [];

//const favouritesList = localStorage();


//CONNECT TO API

function connectToApi() {

  let url = 'http://api.tvmaze.com/search/shows?q=' + searchInput.value;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      series = data
      console.log(series)

      renderSeries(series)

    })




};

connectToApi()


//RENDER SERIES SEARCHED


function renderSeries(series) {

  main.innerHTML = ''

  for (let item of series) {
    if (item.show.image !== null) {
      main.innerHTML += `<section id='${item.show.id.toString()}' class='section'><div><img src=${item.show.image.medium} alt=${item.show.name} class='image container'></div><h3 class='section-title'>${item.show.name}</h3></section>`
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


function saveFavourites(event) {
  const favourite = event.currentTarget.id;
  if (favouriteList.indexOf(favourite) === -1) {
    favouriteList.push(favourite);
    // setLocalStorage(favouriteList);
    renderFavourites(favouriteList);
  } else {
    alert('Esa serie ya está en favoritos')
  }

}


function getIdSerie(idSerie) {
    console.log(idSerie)
  for (let serie of series) {
    if (idSerie === parseInt(serie.show.id))
    
    
    
    {
      return serie;
    }
  }
}


function renderFavourites(favouriteList) {
    
    favouriteContainerList.innerHTML = '';

  for (let element of favouriteList) {
    let serie = getIdSerie(element);

    if (serie) {
        favouriteContainerList.innerHTML += `<li class='li-title'>${item.show.name}`
    }
  }
}




//LOCALSTORAGE




//LISTENERS ALL PROJECT 


searchButton.addEventListener('click', connectToApi)
