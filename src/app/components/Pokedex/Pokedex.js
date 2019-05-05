import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'
import { types } from '../../../../assets/types'

export default ({match, getPokedex, setTeamOverlay, filterPokedex}) => (state) =>
  <pokedex id='pokedex' oncreate={() => getPokedex({page: match.params.page, limit: 70})}>

    <form id='pokemon-filter' onsubmit={(e) => {
      e.preventDefault()
      const name = e.target.elements[0].value
      const types = [...e.target.elements].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
      filterPokedex({name: name, types: types})
      console.log(state.pokedex)
    }}>
      <input id='pokemon-filter-name' type='search' placeholder='Enter Pokemon name or id'></input>
      <div id='pokemon-filter-types'>
        {types.map(type =>
          <div class='pokemon-filter-type'>
            <input type='checkbox' value={type}></input>
            <label>{type}</label>
          </div>
        )}
      </div>
      <input type='submit' value='Search'></input>
    </form>
    <div id='pokedex-content'>
      {
        state.pokedex && Object.entries(state.pokedex).map(pokemon =>
          <PokemonPreview
            data={pokemon[1]}
            setTeamOverlay={setTeamOverlay}
          >
          </PokemonPreview>
        )
      }
    </div>
    <div class="buttons">
      <Link to={'/pokedex/' + Math.max(1, parseInt(match.params.page, 10) - 1)}>
        <button class='change-page' onclick={() => getPokedex(Math.max(1, parseInt(match.params.page, 10) - 1))}>Previous page</button>
      </Link>

      <Link to={'/pokedex/' + Math.min(41, parseInt(match.params.page, 10) + 1)}>
        <button class='change-page next' onclick={() => getPokedex(Math.min(41, parseInt(match.params.page, 10) + 1))}>Next page</button>
      </Link>
    </div>
  </pokedex>
