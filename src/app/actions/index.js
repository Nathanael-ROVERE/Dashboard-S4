import { location } from '@hyperapp/router'
import Chart from 'chart.js'

const API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON_PATH = 'pokemon/'
const POKEMON_SPECIES_PATH = 'pokemon-species/'

const getURL = (url) => fetch(url).then(response => response.json()).catch((error) => console.error('ERROR : ', error))
const get = (query) => getURL(API_URL + query)

export const utils = {
  titleCase: (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(),
  flip: (array) => array.reduce((accumulator, current) => ([current, ...accumulator]), []),
  color: (value) => {
    const hue = ((value / 200) * 1.1 * 120).toString(10)
    return ['hsl(', hue, ',100%,50%)'].join('')
  },
  chart: ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: utils.flip(labels),
        datasets: [{
          label: 'Stats',
          data: utils.flip(data),
          backgroundColor: utils.flip(data).map(value => utils.color(value)),
          borderWidth: 1
        }]
      },
      options: {
        tooltips: {
          enabled: false
        },
        events: false,
        responsive: true,
        legend: {
          position: 'bottom'
        },
        hover: {
          mode: 'label'
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 200
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 100
            }
          }]
        }
      }
    })
  }
}

export const actions = {
  location: location.actions,

  getState: () => (state) => state,

  getPokedex: () => (state, actions) => {
    get(POKEMON_PATH + '?limit=802').then(response => {
      response.results.map((result, index) =>
        get(POKEMON_PATH + result.name).then(pokemon =>
          actions.setToPokedex({
            id: index,
            data: {
              id: pokemon.id,
              name: pokemon.name,
              sprites: pokemon.sprites
            }
          })
        )
      )
    })
  },

  getPokemon: ({id, location}) => (state, actions) => {
    get(POKEMON_PATH + id.toLowerCase()).then(pokemon => {
      get(POKEMON_SPECIES_PATH + id.toLowerCase()).then(species => {
        actions.set({
          entry: location,
          data: {
            ...pokemon,
            ...species
          }
        })
      })
    })
  },
  set: ({entry, data}) => (state) => {
    return ({
      ...state,
      [entry]: data
    })
  },

  setToPokedex: ({id, data}) => (state, actions) =>
    actions.set({
      entry: 'pokedex',
      data: {
        ...state.pokedex,
        [id]: data
      }
    })
}
