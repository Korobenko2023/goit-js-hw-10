import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css";

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function showError() {
    error.style.display = 'block';
  }
  
fetchBreeds()
.then((breeds) => {      
    const markup = breeds.map(({id, name}) => {              
        return `<option value="${id}">${name}</option>`
    }).join("");
   
    breedSelect.insertAdjacentHTML('afterbegin', markup);
    
    new SlimSelect({
        select: '#breed-select'
      })
})
.catch(error => {
    Notiflix.Notify.failure('Error fetching breeds: ', error);
    showError();    
})
.finally(() => {     
    loader.style.display = 'none';      
});

breedSelect.addEventListener('change', event => {
    event.preventDefault();
    const selectedBreedId = breedSelect.value;   
    loader.style.display = 'block';   
      
fetchCatByBreed(selectedBreedId)
 .then((catData) => { 
    const breedInfo = catData[0].breeds[0];  
    catInfo.innerHTML = `
        <img class= "cat-info-img" src="${catData[0].url}" width="300" alt="${breedInfo.name}">
        <div class= "cat">
        <h2>${breedInfo.name}</h2>
        <p class= "cat-info-text">${breedInfo.description}</p>
        <p class= "cat-info-text-bold">Temperament: <span class= "cat-info-text-temp">${breedInfo.temperament}</span></p>
        </div>                
    `;
})
 .catch(error => {
  Notiflix.Notify.failure('Error fetching cat info: ', error);
    showError(); 
 })
.finally(() => {
   loader.style.display = 'none';         
    });
});
