import { h } from 'hyperapp'
import TeamSelectPokemonPreview from '../SelectOverlay/TeamSelectPokemonPreview'

export default ({data, toAdd, addToTeam, setTeamOverlay}) =>
  <teamselect class='overlay'>
    {console.log('team select')}
    {console.log(data)}
    {
      data && Object.entries(data).map((pokemon, index) =>
        <button onclick={() => {
          addToTeam({data: toAdd, slot: (index + 1)})
          setTimeout(() => {
            setTeamOverlay({display: false, toAdd: {}})
          }, 1000)
        }}>
          <TeamSelectPokemonPreview
            data={pokemon[1]}
            select={true}>
          </TeamSelectPokemonPreview>
        </button>
      )
    }
    <button onclick={() => setTeamOverlay({display: false, toAdd: {}})}>Cancel</button>
  </teamselect>
