import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'
import { types } from '../../../../assets/types'

export default ({match, getPokedex, getStatePokedex, setTeamOverlay, filterPokedex}) =>
  <pokedex id='pokedex' oncreate={() => getPokedex({page: match.params.page, limit: 40})}>

    <form id='pokemon-filter' onsubmit={(e) => {
      e.preventDefault()
      const name = e.target.elements[0].value
      const types = [...e.target.elements].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
      filterPokedex({name: name, types: types})
      console.log(getStatePokedex())
    }}>
      <input id='pokemon-filter-name' type='search' placeholder='Enter Pokemon name or id'></input>
      <div id='pokemon-filter-types'>
        {types && types.map(type =>
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
        getStatePokedex() && Object.entries(getStatePokedex()).map(pokemon =>
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
        <button class='change-page' onclick={() => {
          getPokedex({page: Math.max(1, parseInt(match.params.page, 10) - 1), limit: 40})
          document.body.scrollTop = 0 // For Safari
          document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
        }}>
          Previous page
        </button>
      </Link>

      <Link to={'/pokedex/' + Math.min(41, parseInt(match.params.page, 10) + 1)}>
        <button class='change-page next' onclick={() => {
          getPokedex({page: Math.max(1, parseInt(match.params.page, 10) + 1), limit: 40})
          document.body.scrollTop = 0 // For Safari
          document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
        }}>
          Next page
        </button>
      </Link>
    </div>
  </pokedex>
