import { location } from '@hyperapp/router'
import { charts } from './charts'
import { utils } from './utils'
import { types as typesNames } from '../../../assets/types'
import { pokedexes } from '../../../assets/pokedexes'

const API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON_PATH = 'pokemon/'

const getURL = (url) => fetch(url).then(response => response.json()).catch((error) => console.error('ERROR : ', error))
const get = (query) => getURL(API_URL + query)

export const actions = {
  location: location.actions,
  getState: () => (state) => state,

  getPokedex: () => (state, actions) => {
    actions.set({entry: 'pokedex', data: {}})
    get(POKEMON_PATH + '?limit=' + pokedexes[state.version].to + '&offset=' + (pokedexes[state.version].from - 1)).then(response =>
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
                  types: utils.flip(pokemon.types.map(type => type.type.name)),
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
      charts['horizontal-bar-chart']({
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

  teamStatsChart: () => (state, actions) => {
    charts['radar-chart']({
      id: 'team-stats',
      labels: ['Speed', 'Special-defense', 'Special-attack', 'Defense', 'Attack', 'Hp'],
      data: actions.teamAverageStats()
    })
  },

  teamTypesCount: () => (state) => {
    const types = Object.entries(state.team)
      .map(entry => entry[1].types && entry[1].types.reduce((accumulator, current) => [...accumulator, current], []))
      .filter(entry => (entry !== null && entry !== undefined))
      .reduce((accumulator, current) => [...accumulator, ...current], [])
    const count = typesNames.map(typeName => types.filter(type => type === typeName).length)
    return count
  },

  teamTypesChart: () => (state, actions) => {
    charts['polar-chart']({
      id: 'team-types',
      labels: typesNames.map(type => utils.titleCase(type)),
      data: actions.teamTypesCount()
    })
  },

  teamRegionsCount: () => (state) => {
    const ids = Object.entries(state.team)
      .map(entry => entry[1].id)
      .filter(entry => (entry !== null && entry !== undefined))
    const count = Object.entries(pokedexes).map(pokedex => ids.filter(id => id >= pokedex[1].from && id <= pokedex[1].to).length)
    return count
  },

  teamRegionsChart: () => (state, actions) => {
    charts['polar-chart']({
      id: 'team-regions',
      labels: Object.entries(pokedexes).map(entry => utils.titleCase(entry[1].name)),
      data: actions.teamRegionsCount()
    })
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

  setPokedexVersion: (name) => (state, actions) => {
    actions.set({entry: 'page', data: {...state.page, value: 1}})
    name && actions.set({entry: 'version', data: name})
    actions.getPokedex()
  },

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
        .filter(key => state.pokedex[key].name.includes(state.searched.name) && state.searched.types.reduce((accumulator, type) => {
          return accumulator && state.pokedex[key].types.includes(type)
        }, true))
        .reduce((accumulator, key) => ({...accumulator, [key]: state.pokedex[key]}), {})
    })
  }
}
