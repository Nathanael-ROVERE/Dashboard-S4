const API_URL = 'https://pokeapi.co/api/v2/'

const getRequest = (url) => fetch(url)
  .then(response => response.json())
  .catch((error) => console.error('ERROR : ', error))

const get = (query) => getRequest(API_URL + query.toLowerCase())

export default {
  get: (query) => get(query),
  getAll: () => get(''),
  getPokedex: (id) => get('pokedex/' + id),
  getPokemon: (idOrName) => get('pokemon/' + idOrName)
}
