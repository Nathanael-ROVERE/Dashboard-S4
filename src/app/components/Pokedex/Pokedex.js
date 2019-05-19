import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'
import { types } from '../../../../assets/types'
import { pokedexes } from '../../../../assets/pokedexes'

export default ({match, data, version, page, setTeamOverlay, search, filterPokedex}) =>

  <pokedex id='pokedex'>

    <select oninput={(event) => version.set(event.target.value)}>
      {
        Object.entries(pokedexes).map(pokedex =>
          <option value={pokedex[0]} selected={version.value === pokedex[0]}>
            {pokedex[1].name}
          </option>)
      }
    </select>
    <form id='pokemon-filter'>

      <input id='pokemon-filter-name' type='search' placeholder='Enter Pokemon name or id' oninput={event => {
        const name = event.target.value
        const types = [...event.target.form].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
        search({name: name, types: types})
        filterPokedex()
      }}>
      </input>

      <div id='pokemon-filter-types'>
        <button id='pokemon-filter-types-dropdown-button' onclick={(event) => {
          event.preventDefault()
          document.getElementById('pokemon-filter-types-list').classList.toggle('show')
        }}>
          Types
        </button>
        <div id='pokemon-filter-types-list'>
          {types && types.map(type =>
            <div class='pokemon-filter-type'>
              <input id='checkbox-type' type='checkbox' value={type} onchange={event => {
                const name = [...event.target.form][0].value
                const types = [...event.target.form].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
                search({name: name, types: types}) && filterPokedex()
              }}></input>
              <label>{type}</label>
            </div>
          )}
        </div>
      </div>
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
        () => (page.value > 1) &&
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
        () => (page.value < page.max) &&
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
