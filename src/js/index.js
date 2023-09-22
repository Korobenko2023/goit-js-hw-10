import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
.then((breeds) => {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);               
    });
}) 
.catch(error => {
    Notiflix.Notify.failure('Error fetching breeds:', error);
});

breedSelect.addEventListener('change', event => {
    event.preventDefault();
    const selectedBreedId = breedSelect.value; 
     
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
  Notiflix.Notify.failure('Error fetching cat info:', error);
})
});

