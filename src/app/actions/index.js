const API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON_PATH = 'pokemon/'
const POKEMON_SPECIES_PATH = 'pokemon-species/'
const ABILITY_PATH = 'ability/'

const get = (query) => fetch(API_URL + query).then(response => response.json()).catch((error) => console.error('ERROR : ', error))

export const utils = {
  titleCase: (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const actions = {
  getLanguages: () => (state, actions) => get('language').then(data => actions.set({entry: 'languages', data: data.results})),
  getPokemon: (id) => (state, actions) =>
    get(POKEMON_SPECIES_PATH + id.toLowerCase()).then(speciesInfo => {
      get(POKEMON_PATH + id.toLowerCase()).then(pokemonInfo => actions.set({entry: 'pokemon', data: {...pokemonInfo, ...speciesInfo}}))
    }),
  getAbility: (name) => (state, actions) => get(ABILITY_PATH + name.toLowerCase()).then(data => actions.set({entry: 'abilities', data: [...state.abilities, data]})),

  set: ({entry, data}) => (state) => ({
    ...state,
    [entry]: data
  })
}
