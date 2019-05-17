import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'
import { types } from '../../../../assets/types'

export default ({match, getPokedex, data, page, setTeamOverlay, search, filterPokedex}) =>
  <pokedex id='pokedex' oncreate={() => getPokedex({page: match.params.page, limit: 40})}>

    <form id='pokemon-filter' onsubmit={(e) => {
      e.preventDefault()
      const name = e.target.elements[0].value
      const types = [...e.target.elements].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
      search({name: name, types: types})
      filterPokedex()
    }}>
      <input id='pokemon-filter-name' type='search' placeholder='Enter Pokemon name or id'></input>
      <div id='pokemon-filter-types'>
        {types && types.map(type =>
          <div class='pokemon-filter-type'>
            <input id='checkbox_type' type='checkbox' value={type}></input>
            <label>{type}</label>
          </div>
        )}
      </div>
      <input type='submit' value='Search'></input>
    </form>

    <div id='pokedex-content'>
      {
        data && data.map(pokemon =>
          <PokemonPreview
            data={pokemon[1]}
            setTeamOverlay={setTeamOverlay}
          >
          </PokemonPreview>
        )
      }
    </div>
    <div class="buttons">
      {
        () => (page.value !== 1) &&
          <Link to={'/pokedex/' + Math.max(1, parseInt(match.params.page, 10) - 1)}>
            <button class='change-page' onclick={() => {
              page.previous()
              document.body.scrollTop = 0 // For Safari
              document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
            }}>
              Previous page
            </button>
          </Link>
      }

      {
        () => (page.value <= Math.round(data.length / 20)) &&
          <Link to={'/pokedex/' + Math.min(41, parseInt(match.params.page, 10) + 1)}>
            <button class='change-page next' onclick={() => {
              page.next()
              document.body.scrollTop = 0 // For Safari
              document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
            }}>
              Next page
            </button>
          </Link>
      }

    </div>
  </pokedex>
