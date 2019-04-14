const API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON_PATH = 'pokemon/'
const POKEMON_SPECIES_PATH = 'pokemon-species/'
const ABILITY_PATH = 'ability/'
const MOVE_PATH = 'move/'

const get = (query) => fetch(API_URL + query).then(response => response.json()).catch((error) => console.error('ERROR : ', error))

export const utils = {
  titleCase: (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const actions = {
  getState: () => (state) => state,
  getPokedex: () => (state, actions) => {
    get(POKEMON_PATH + '?limit=10').then(response => {
      console.log(response.results)
      response.results.map((pokemon, index) => {
        actions.getPokemon({id: pokemon.name, location: 'pokemon'})
        actions.setPokedexPokemon({source: state.pokemon, index: index})
      })
    })
  },
  getPokemon: ({id, location}) => (state, actions) => {
    get(POKEMON_PATH + id.toLowerCase()).then(pokemon => {
      actions.set({
        entry: location,
        data: pokemon
      })

      const abilities = pokemon.abilities.map(ability => get(ABILITY_PATH + ability.ability.name))
      Promise.all(abilities).then(result =>
        actions.set({
          entry: location,
          data: {
            ...actions.getState()[location],
            abilities: result.map(ability => ({
              name: ability.name,
              description: ability.effect_entries[0].effect
            }))
          }
        })
      )

      const moves = pokemon.moves.map(move => get(MOVE_PATH + move.move.name))
      const movesLearnings = pokemon.moves.map(move => move.version_group_details.map(version => ({
        name: version.version_group.name,
        level: version.level_learned_at
      })))
      Promise.all(moves).then(result =>
        actions.set({
          entry: location,
          data: {
            ...actions.getState()[location],
            moves: result.map((move, index) => ({
              name: move.name,
              accuracy: move.accuracy,
              pp: move.pp,
              priority: move.priority,
              power: move.power,
              type: move.type.name,
              learning: movesLearnings[index]
            }))
          }
        })
      )
    })

    console.log(POKEMON_SPECIES_PATH)
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
      pokedex: Object.assign([...state.pokedex], {[index]: source})
    })
  }
}
