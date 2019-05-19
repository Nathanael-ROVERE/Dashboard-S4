import { h } from 'hyperapp'
import PokemonPreview from './PokemonPreview'
import { Link } from '@hyperapp/router'
import { types } from '../../../../assets/types'
import { pokedexes } from '../../../../assets/pokedexes'

export default ({match, data, version, page, setTeamOverlay, search, filterPokedex}) =>

  <pokedex id='pokedex'>

    <form id='pokemon-filter'>
      <select id='pokemon-select-region' oninput={(event) => version.set(event.target.value)}>
        {
          Object.entries(pokedexes).map(pokedex =>
            <option value={pokedex[0]} selected={version.value === pokedex[0]}>
              {pokedex[1].name}
            </option>)
        }
      </select>

      <input id='pokemon-filter-name' type='search' placeholder='Enter pokemon name...' oninput={event => {
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
                const name = [...event.target.form][1].value
                console.log(name)
                const types = [...event.target.form].filter(element => element.type === 'checkbox').filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
                search({name: name, types: types})
                filterPokedex()
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
    <div class='navigation'>
      <select id='items-per-page' oninput={(event) => page.setItems(event.target.value)}>
        {
          (new Array(10)).fill(null).map((element, index) => {
            const number = 10 * (index + 1)
            return (<option value={number} selected={page.items === number}>{number}</option>)
          })
        }
      </select>
      <div class="buttons">
        <Link to={'/pokedex/' + Math.max(1, parseInt(match.params.page, 10) - 1)} class={((page.value > 1) ? '' : ' disabled')}>
          <button class='change-page' onclick={() => {
            page.previous()
            document.body.scrollTop = 0 // For Safari
            document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
          }}>
            Previous page
          </button>
        </Link>

        <Link to={'/pokedex/' + Math.min(41, parseInt(match.params.page, 10) + 1)} class={((page.value < page.max) ? '' : ' disabled')}>
          <button class='change-page' onclick={() => {
            page.next()
            document.body.scrollTop = 0 // For Safari
            document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
          }}>
            Next page
          </button>
        </Link>
      </div>
    </div>
  </pokedex>
