import { location } from '@hyperapp/router'

export default {
  location: location.state,
  teamOverlay: {
    display: false,
    toAdd: {}
  },
  version: 'g1',
  pokedex: {},
  pokemon: {
  },
  team: {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {}
  },
  searched: {
    name: '',
    types: []
  },
  shiny: false,
  page: {
    value: 1
  },
  'first-pokemon-stats-chart-created': false,
  'first-team-stats-chart-created': false,
  'first-team-types-chart-created': false
}
