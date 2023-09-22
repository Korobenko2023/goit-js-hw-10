import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const searchForm = document.getElementById('search-form');
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

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const selectedBreedId = breedSelect.value; 
     
fetchCatByBreed(selectedBreedId)
 .then((catData) => {   
    catInfo.innerHTML = `
                <p>Breed: ${catData[0].breeds[0].name}</p>
                <p>Description: ${catData[0].breeds[0].description}</p>
                <p>Temperament: ${catData[0].breeds[0].temperament}</p>
                <img src="${catData[0].url}" alt="${catData[0].breeds[0].name}">
            `;
})
 .catch(error => {
  Notiflix.Notify.failure('Error fetching cat info:', error);
})
});

