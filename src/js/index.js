import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css";

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

  
fetchBreeds()
.then((breeds) => {       
    const markup = breeds.map(({id, name}) => {                
        return `<option value="${id}">${name}</option>`
    }).join("");
   
    breedSelect.insertAdjacentHTML('afterbegin', markup);

    breedSelect.classList.remove('is-hidden'); 
     
    // new SlimSelect({
    //     select: '#breed-select'
    //   })
})
.catch(error => {
    Notiflix.Notify.failure('Error fetching cat info: ', error);         
})
.finally(() => {        
    loader.style.display = 'none';  
});

breedSelect.addEventListener('change', event => {
    event.preventDefault();
    const selectedBreedId = breedSelect.value;  
    loader.classList.remove('is-hidden');  
    loader.style.display = 'block';  
    catInfo.innerHTML = '';
          
fetchCatByBreed(selectedBreedId)
 .then((catData) => { 
    if (catData.length > 0) {   
    const breedInfo = catData[0].breeds[0];  
    catInfo.innerHTML = `
        <img class= "cat-info-img" src="${catData[0].url}" width="300" alt="${breedInfo.name}">
        <div class= "cat">
        <h2>${breedInfo.name}</h2>
        <p class= "cat-info-text">${breedInfo.description}</p>
        <p class= "cat-info-text-bold">Temperament: <span class= "cat-info-text-temp">${breedInfo.temperament}</span></p>
        </div>                
    `;
    catInfo.classList.remove('is-hidden'); 
    } else {
        error.style.display = 'block'; 
        breedSelect.style.display = 'none'; 
    }      
})
 .catch(error => {
    Notiflix.Notify.failure('Error fetching cat info: ', error);
    
 })
.finally(() => {    
   loader.style.display = 'none';    
    });
});

