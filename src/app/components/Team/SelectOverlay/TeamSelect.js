import { h } from 'hyperapp'
import TeamSelectPokemonPreview from '../SelectOverlay/TeamSelectPokemonPreview'

export default ({data, toAdd, addToTeam, setTeamOverlay, colors}) =>
  <div class='fixedbackground'>
    <teamselect class='overlay'>
      <h1>Votre équipe</h1>
      {console.log('team select')}
      {console.log(data)}
      <pokemons>
        {
          data && Object.entries(data).map((pokemon, index) =>
            <button class='clickable' onclick={() => {
              addToTeam({data: toAdd, slot: (index + 1)})
              setTimeout(() => {
                setTeamOverlay({display: false, toAdd: {}})
              }, 1000)
            }}>
              <TeamSelectPokemonPreview
                data={pokemon[1]}
                color={pokemon.types && pokemon.types.length > 0 && colors[pokemon.types[0].type.name].light}
                select={true}>
              </TeamSelectPokemonPreview>
            </button>
          )
        }
      </pokemons>
      <button class="cancel" onclick={() => setTeamOverlay({display: false, toAdd: {}})}>Cancel</button>
    </teamselect>
  </div>
