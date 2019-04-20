import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'

export default () => (state) =>
  <pokedex>
    {
      state.pokedex && Object.entries(state.pokedex).map(pokemon =>
        <PokemonPreview
          data={pokemon[1]}>
        </PokemonPreview>
      )
    }
  </pokedex>
