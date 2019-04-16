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
  chart: ({
    id,
    labels,
    data
  }) => {
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
        animation: {
          duration: 1,
          onComplete: () => {
            chart.datasets.forEach(function (dataset) {
              dataset.bars.forEach(function (bar) {
                ctx.fillText(bar.value, bar.x, bar.y - 5)
              })
            })
          }
        },
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
  getState: () => (state) => state,
  getPokedex: () => (state, actions) => {
    get(POKEMON_PATH + '?limit=10').then(response => {
      console.log(response.results)
      response.results.map((pokemon, index) => {
        actions.getPokemon({
          id: pokemon.name,
          location: 'pokemon'
        })
        actions.setPokedexPokemon({
          source: state.pokemon,
          index: index
        })
      })
    })
  },
  getPokemon: ({
    id,
    location
  }) => (state, actions) => {
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
  set: ({
    entry,
    data
  }) => (state) => {
    console.log('data in set', data)
    console.log('entry in set', entry)
    return ({
      ...state,
      [entry]: data
    })
  },

  setPokedexPokemon: (source, index) => (state) => {
    console.log('index in pokepoke', index)
    console.log('source in pokepoke', source)
    return ({
      ...state,
      pokedex: Object.assign([...state.pokedex], {
        [index]: source
      })
    })
  }
}
