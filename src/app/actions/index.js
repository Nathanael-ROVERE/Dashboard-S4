import { location } from '@hyperapp/router'
import { charts } from './charts'
import { utils } from './utils'
import { types as typesNames } from '../../../assets/types'

const API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON_PATH = 'pokemon/'

const getURL = (url) => fetch(url).then(response => response.json()).catch((error) => console.error('ERROR : ', error))
const get = (query) => getURL(API_URL + query)

export const actions = {
  location: location.actions,
  getState: () => (state) => state,

  getPokedex: () => (state, actions) => {
    get(POKEMON_PATH + '?limit=800').then(response =>
      response.results.map((result) =>
        get(POKEMON_PATH + result.name).then(pokemon =>
          Promise.all(pokemon.moves.slice(0, 4).map(entry => getURL(entry.move.url))).then(moves => {
            actions.set({
              entry: 'pokedex',
              data: {
                ...actions.getState().pokedex,
                [pokemon.id]: {
                  id: pokemon.id,
                  name: pokemon.name,
                  sprites: pokemon.sprites,
                  types: utils.flip(pokemon.types),
                  stats: pokemon.stats,
                  moves: moves
                }
              }
            })
            actions.filterPokedex()
            actions.set({
              entry: 'page',
              data: {
                ...actions.getState().page,
                max: Object.entries(actions.getState().pokedex).length / 20
              }
            })
          })
        )
      )
    )
  },

  /**
   * ***********************************************************************************
   * Charts handlers, using chart.js library (see /actions/charts.js for chart.js calls)
   * ***********************************************************************************
   */

  pokemonStatsChart: ({data, id, onCreate}) => (state, actions) => {
    if (onCreate === false || onCreate === !state['first-pokemon-stats-chart-created'] === true) {
      charts['horizontal-bar-stats-chart']({
        id: 'stats' + id,
        labels: data.map(stats => stats.stat.name),
        data: data.map(stats => stats.base_stat)
      })
    } else if (onCreate === !state['first-pokemon-stats-chart-created'] === true) {
      actions.set({
        entry: 'first-pokemon-stats-chart-created',
        data: true
      })
    }
  },

  teamAverageStats: () => (state) => {
    const stats = Object.entries(state.team).map(entry => entry[1].stats).filter(entry => (entry !== null && entry !== undefined))
    const average = stats.reduce((accumulator, current) => accumulator.map((stat, index) => (current) ? stat + current[index].base_stat : stat), Array(6).fill(0)).map(stat => Math.round(stat / stats.length, 1).toFixed())
    return average
  },

  teamStatsChart: ({onCreate}) => (state, actions) => {
    if (onCreate === false || onCreate === !state['first-team-stats-chart-created'] === true) {
      charts['radar-stats-chart']({
        id: 'team-stats',
        labels: ['speed', 'sepcial-defense', 'special-attack', 'defense', 'attack', 'hp'],
        data: actions.teamAverageStats()
      })
    } else if (onCreate === !state['first-team-stats-chart-created'] === true) {
      actions.set({
        entry: 'first-team-stats-chart-created',
        data: true
      })
    }
  },

  teamTypesCount: () => (state) => {
    const types = Object.entries(state.team)
      .map(entry => entry[1].types && entry[1].types.reduce((accumulator, current) => [...accumulator, current.type.name], []))
      .filter(entry => (entry !== null && entry !== undefined))
      .reduce((accumulator, current) => [...accumulator, ...current], [])
    const count = typesNames.map(typeName => types.filter(type => type === typeName).length)
    return count
  },

  teamTypesChart: ({onCreate}) => (state, actions) => {
    if (onCreate === false || onCreate === !state['first-team-stats-chart-created'] === true) {
      charts['pie-types-chart']({
        id: 'team-types',
        labels: typesNames,
        data: actions.teamTypesCount()
      })
    } else if (onCreate === !state['first-team-stats-chart-created'] === true) {
      actions.set({
        entry: 'first-team-types-chart-created',
        data: true
      })
    }
  },

  /**
   * ***********************************************************************************
   * Setter used to change state
   * ***********************************************************************************
   */

  set: ({entry, data}) => (state) => ({
    ...state,
    [entry]: data
  }),

  shiny: (value) => (state, actions) => (value !== undefined && value !== null) && actions.set({entry: 'shiny', data: value}),

  /**
   * ***********************************************************************************
   * Team handlers
   * ***********************************************************************************
   */

  addToTeam: ({data, slot}) => (state, actions) => {
    if (data && !data.stats) {
      console.log(data)
      actions.getPokemon({id: data.name}).then(response => console.log('response', response) && actions.set({
        entry: 'team',
        data: {
          ...state.team,
          [slot]: response
        }
      }))
    } else {
      actions.set({
        entry: 'team',
        data: {
          ...state.team,
          [slot]: data
        }
      })
    }
  },

  removeFromTeam: ({slot}) => (state, actions) => {
    actions.set({
      entry: 'team',
      data: {
        ...state.team,
        [slot]: {}
      }
    })
  },

  setTeamOverlay: ({display, toAdd}) => (state, actions) => {
    actions.set({
      entry: 'teamOverlay',
      data: {
        display: display,
        toAdd: toAdd
      }
    })
  },

  /**
   * ***********************************************************************************
   * Navigation handlers
   * ***********************************************************************************
   */

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
        value: Math.min(state.page.value + 1, Math.round(Object.entries(state.pokedex).length / 20))
      }
    })
    console.log(actions.getState().page)
  },

  previousPage: () => (state, actions) => {
    actions.set({
      entry: 'page',
      data: {
        ...state.page,
        value: Math.max(state.page.value - 1, 0)
      }
    })
    console.log(actions.getState().page)
  },

  filterPokedex: () => (state, actions) => {
    actions.set({
      entry: 'pokedex',
      data: Object.keys(state.pokedex)
        .filter(key => state.pokedex[key].name.includes(state.searched.name) /* && state.searched.types.reduce((accumulator, type) => accumulator && state.pokedex[key].types.includes(type), true) */)
        .reduce((accumulator, key) => ({...accumulator, [key]: state.pokedex[key]}), {})
    })
  }
}
