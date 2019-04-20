import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'

export default ({data}) =>
  <pokedex>
    {
      data && Object.entries(data).map(pokemon =>
        <PokemonPreview
          data={pokemon[1]}>
        </PokemonPreview>
      )
    }
  </pokedex>
