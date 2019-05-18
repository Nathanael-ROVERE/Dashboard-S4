import { h } from 'hyperapp'
import TeamPokemonPreview from './TeamPokemonPreview'

export default ({data, removeFromTeam, statsChart, typesChart}) =>
  <team>
    <pokemons>
      {
        data && Object.entries(data).map((pokemon, index) =>
          <TeamPokemonPreview
            data={pokemon[1]}
            slot={index + 1}
            removeFromTeam={removeFromTeam}
            updateCharts={() => {
              statsChart({onCreate: false})
              typesChart({onCreate: false})
            }}
          >
          </TeamPokemonPreview>
        )
      }
    </pokemons>
    <div class='chart-container' style="position: relative; width:50vw">
      {() => data && (
        <canvas
          class='data-box'
          id='team-stats'
          oncreate={() => statsChart({onCreate: true})}>
        </canvas>
      )}
    </div>
    <div class='chart-container' style="position: relative; width:50vw">
      {() => data && (
        <canvas
          class='data-box'
          id='team-types'
          oncreate={() => typesChart({onCreate: true})}>
        </canvas>
      )}
    </div>
  </team>
