import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'

export default ({match, data, getPokedex, setTeamOverlay}) =>
  <pokedex oncreate={() => getPokedex(match.params.page)}>
    {
      data && Object.entries(data).map(pokemon =>
        <PokemonPreview
          data={pokemon[1]}
          setTeamOverlay={setTeamOverlay}
        >
        </PokemonPreview>
      )
    }

    <Link to={'/pokedex/' + Math.max(1, parseInt(match.params.page, 10) - 1)}>
      <button class='change_page' onclick={() => getPokedex(Math.max(1, parseInt(match.params.page, 10) - 1))}>Previous page</button>
    </Link>

    <Link to={'/pokedex/' + Math.min(41, parseInt(match.params.page, 10) + 1)}>
      <button class='change_page next' onclick={() => getPokedex(Math.min(41, parseInt(match.params.page, 10) + 1))}>Next page</button>
    </Link>
  </pokedex>
