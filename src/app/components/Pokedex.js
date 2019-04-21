import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'

export default ({match, data, getPokedex}) =>
  <pokedex oncreate={() => getPokedex(match.params.page)}>
    {
      data && Object.entries(data).map(pokemon =>
        <PokemonPreview
          data={pokemon[1]}>
        </PokemonPreview>
      )
    }

    <Link to={(match.params.page + 1)}>
      <button>Next page</button>
    </Link>
  </pokedex>
