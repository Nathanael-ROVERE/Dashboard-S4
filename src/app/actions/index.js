import { location } from '@hyperapp/router'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

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
  chart: ({
    id,
    labels,
    data,
    type
  }) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: type,
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
        events: true,
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
      },
      plugins: {
        datalabels: {
          color: '#36A2EB',
          anchor: 'end',
          align: 'end',
          clamp: 'true',
          textAlign: 'end'
        }
      }
    })
  }
}

export const actions = {
  location: location.actions,

  getState: () => (state) => state,

  getPokedex: () => (state, actions) => {
    get(POKEMON_PATH + '?limit=800').then(response => {
      response.results.map((result) =>
        get(POKEMON_PATH + result.name).then(pokemon => {
          actions.set({
            entry: 'pokedex',
            data: {
              ...actions.getState().pokedex,
              [pokemon.id]: {
                id: pokemon.id,
                name: pokemon.name,
                sprites: pokemon.sprites,
                types: utils.flip(pokemon.types)
              }
            }
          })
          actions.filterPokedex()
        })
      )
    })
  },
  getPokemon: ({
    id,
    location
  }) => (state, actions) => {
    get(POKEMON_PATH + id.toLowerCase()).then(pokemon => {
      get(POKEMON_SPECIES_PATH + id.toLowerCase()).then(species => {
        const moves = pokemon.moves.slice(0, 4).map(entry => getURL(entry.move.url))
        Promise.all(moves).then(moves => {
          actions.set({
            entry: location,
            data: {
              id: pokemon.id,
              name: pokemon.name,
              types: utils.flip(pokemon.types),
              sprites: pokemon.sprites,
              experience: species.base_experience,
              hapiness: species.base_hapiness,
              capture: species.capture_rate,
              gender: species.gender_rate,
              abilities: pokemon.abilities,
              stats: pokemon.stats,
              moves: moves
            }
          })
        })
      })
    })
  },
  set: ({
    entry,
    data
  }) => (state) => ({
    ...state,
    [entry]: data
  }),

  addToTeam: ({
    data,
    slot
  }) => (state, actions) => {
    actions.set({
      entry: 'team',
      data: {
        ...state.team,
        [slot]: data
      }
    })
  },

  removeFromTeam: ({
    slot
  }) => (state, actions) => {
    actions.set({
      entry: 'team',
      data: {
        ...state.team,
        [slot]: {}
      }
    })
  },

  setTeamOverlay: ({
    display,
    toAdd
  }) => (state, actions) => {
    actions.set({
      entry: 'teamOverlay',
      data: {
        display: display,
        toAdd: toAdd
      }
    })
  },

  search: ({name, types}) => (state, actions) => {
    actions.set({
      entry: 'searched',
      data: {
        name: name,
        types: types
      }
    })
    actions.getPokedex()
  },

  nextPage: () => (state, actions) => {
    actions.filterPokedex()
    actions.set({
      entry: 'page',
      data: {
        ...state.page,
        value: Math.min(state.page.value + 1, Object.entries(state.pokedex).length / 20)
      }
    })
  },

  previousPage: () => (state, actions) => {
    actions.set({
      entry: 'page',
      data: {
        ...state.page,
        value: Math.max(state.page.value - 1, 0)
      }
    })
  },

  filterPokedex: () => (state, actions) => {
    actions.set({
      entry: 'pokedex',
      data: Object.keys(state.pokedex)
        .filter(key => state.pokedex[key].name.includes(state.searched.name) /* && types.reduce((accumulator, type) => accumulator && state.pokedex[key].types.includes(type), true) */)
        .reduce((accumulator, key) => ({...accumulator, [key]: state.pokedex[key]}), {})
    })
  }
}
