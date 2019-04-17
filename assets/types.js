export const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
]

export const colors = {
  bug: '#8d9b11',
  dark: '#3c2d23',
  dragon: '#775ee1',
  electric: '#fcbf1a',
  fairy: '#f8c3f8',
  fighting: '#86371f',
  fire: '#f0430d',
  flying: '#9daef7',
  ghost: '#6262b5',
  grass: '#68bb2c',
  ground: '#d8b862',
  ice: '#a9e9fe',
  normal: '#d0cbc4',
  poison: '#924593',
  psychic: '#ec4780',
  rock: '#bca358',
  steel: '#b1b1c0',
  water: '#3193f6'

}

export const effectivenesses = {
  bug: {'normal': 1, 'fire': 2, 'water': 1, 'electric': 1, 'grass': 0.5, 'ice': 1, 'fighting': 0.5, 'poison': 1, 'ground': 0.5, 'flying': 2, 'psychic': 1, 'bug': 1, 'rock': 2, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1},
  dark: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 2, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 0, 'bug': 2, 'rock': 1, 'ghost': 0.5, 'dragon': 1, 'dark': 0.5, 'steel': 1, 'fairy': 2},
  dragon: {'normal': 1, 'fire': 0.5, 'water': 0.5, 'electric': 0.5, 'grass': 0.5, 'ice': 2, 'fighting': 1, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 1, 'dragon': 2, 'dark': 1, 'steel': 1, 'fairy': 2},
  electric: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 0.5, 'grass': 1, 'ice': 1, 'fighting': 1, 'poison': 1, 'ground': 2, 'flying': 0.5, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 0.5, 'fairy': 1},
  fairy: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 0.5, 'poison': 2, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 0.5, 'rock': 1, 'ghost': 1, 'dragon': 0, 'dark': 0.5, 'steel': 2, 'fairy': 1},
  fighting: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 1, 'poison': 1, 'ground': 1, 'flying': 2, 'psychic': 2, 'bug': 0.5, 'rock': 0.5, 'ghost': 1, 'dragon': 1, 'dark': 0.5, 'steel': 1, 'fairy': 2},
  fire: {'normal': 1, 'fire': 0.5, 'water': 2, 'electric': 1, 'grass': 0.5, 'ice': 0.5, 'fighting': 1, 'poison': 1, 'ground': 2, 'flying': 1, 'psychic': 1, 'bug': 0.5, 'rock': 2, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 0.5, 'fairy': 0.5},
  flying: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 2, 'grass': 0.5, 'ice': 2, 'fighting': 0.5, 'poison': 1, 'ground': 0, 'flying': 1, 'psychic': 1, 'bug': 0.5, 'rock': 2, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1},
  ghost: {'normal': 0, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 0, 'poison': 0.5, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 0.5, 'rock': 1, 'ghost': 2, 'dragon': 1, 'dark': 2, 'steel': 1, 'fairy': 1},
  grass: {'normal': 1, 'fire': 2, 'water': 0.5, 'electric': 0.5, 'grass': 0.5, 'ice': 2, 'fighting': 1, 'poison': 2, 'ground': 0.5, 'flying': 2, 'psychic': 1, 'bug': 2, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1},
  ground: {'normal': 1, 'fire': 1, 'water': 2, 'electric': 0, 'grass': 2, 'ice': 2, 'fighting': 1, 'poison': 0.5, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 0.5, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1},
  ice: {'normal': 1, 'fire': 2, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 0.5, 'fighting': 2, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 2, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 2, 'fairy': 1},
  normal: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 2, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 0, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1},
  poison: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 0.5, 'ice': 1, 'fighting': 0.5, 'poison': 0.5, 'ground': 2, 'flying': 1, 'psychic': 2, 'bug': 0.5, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 0.5},
  psychic: {'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 0.5, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 0.5, 'bug': 2, 'rock': 1, 'ghost': 2, 'dragon': 1, 'dark': 2, 'steel': 1, 'fairy': 1},
  rock: {'normal': 0.5, 'fire': 0.5, 'water': 2, 'electric': 1, 'grass': 2, 'ice': 1, 'fighting': 2, 'poison': 0.5, 'ground': 2, 'flying': 0.5, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 2, 'fairy': 1},
  steel: {'normal': 0.5, 'fire': 2, 'water': 1, 'electric': 1, 'grass': 0.5, 'ice': 0.5, 'fighting': 2, 'poison': 0, 'ground': 2, 'flying': 0.5, 'psychic': 0.5, 'bug': 0.5, 'rock': 0.5, 'ghost': 1, 'dragon': 0.5, 'dark': 1, 'steel': 0.5, 'fairy': 0.5},
  water: {'normal': 1, 'fire': 0.5, 'water': 0.5, 'electric': 2, 'grass': 2, 'ice': 0.5, 'fighting': 1, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 0.5, 'fairy': 1}
}

export const strengths = (types) =>
  [...new Set(types.reduce((typesAcc, curType) =>
    typesAcc.concat((Object.entries(effectivenesses)
      .reduce((effectivenessesAcc, curEffectiveness) =>
        (curEffectiveness[1][curType] > 1) ? effectivenessesAcc.concat(curEffectiveness[0]) : effectivenessesAcc
        , [])))
    , []))].filter(type => !types.find(element => element === type))

export const weaknesses = (types) =>
  [...new Set(
    types.reduce((accumulator, current) => accumulator.map(entry => [entry[0], entry[1] * effectivenesses[current][entry[0]]]), Object.entries({'normal': 1, 'fire': 1, 'water': 1, 'electric': 1, 'grass': 1, 'ice': 1, 'fighting': 1, 'poison': 1, 'ground': 1, 'flying': 1, 'psychic': 1, 'bug': 1, 'rock': 1, 'ghost': 1, 'dragon': 1, 'dark': 1, 'steel': 1, 'fairy': 1}))
      .filter(type => type[1] > 1)
      .map(type => type[0]))
  ].filter(type => !types.find(element => element === type[1]))
