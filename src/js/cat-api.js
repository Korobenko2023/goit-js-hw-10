import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_AjlxCbLIu6QxMy1La6yi4tYaWd7WEJMxrplNzXLhmLw0KTUQp9bBtpZcf4znrVR6";

export function fetchBreeds() {
    const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
    return axios.get(BASE_URL)
.then(response => {  
       return response.data;
    })
.catch(error => {
        throw error;
    });
}

export function fetchCatByBreed(breedId) {
    const API_KEY = "live_AjlxCbLIu6QxMy1La6yi4tYaWd7WEJMxrplNzXLhmLw0KTUQp9bBtpZcf4znrVR6";
    const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(BASE_URL, {
        headers: {
            'x-api-key': API_KEY
        }
    })
    .then(response => { 
        console.log(response);
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}


// export function fetchCatByBreed(breedId) {
//     const BASE_URL = 'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';
//     return axios.get(BASE_URL)
// .then(response => { 
//     console.log(response);
//     return response.data;
//   })
// .catch(error => {
//     throw error;
//   });
// }


