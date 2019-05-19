import { h } from 'hyperapp'
import TeamPokemonPreview from './TeamPokemonPreview'

export default ({data, removeFromTeam, charts}) =>
  <team>
    <pokemons>
      {
        data && Object.entries(data).map((pokemon, index) =>
          <TeamPokemonPreview
            data={pokemon[1]}
            slot={index + 1}
            removeFromTeam={removeFromTeam}
            updateCharts={() => {
              charts.statsChart()
              charts.typesChart()
              charts.regionsChart()
            }}
          >
          </TeamPokemonPreview>
        )
      }
    </pokemons>
    { data && Object.entries(data).reduce((accumulator, current) => accumulator || Object.keys(current[1]).length !== 0, false) &&
      <div id='team-charts'>
        <div class='chart-container data-box' style="position: relative;">
          <h2>
            Team average statistics
          </h2>
          {() => data && (
            <canvas
              id='team-stats'
              oncreate={() => charts.statsChart()}>
            </canvas>
          )}
        </div>
        <div class='chart-container data-box' style="position: relative;">
          <h2>
            Team types
          </h2>
          {() => data && (
            <canvas
              id='team-types'
              oncreate={() => charts.typesChart()}>
            </canvas>
          )}
        </div>
        <div class='chart-container data-box' style="position: relative;">
          <h2>
            Team regions
          </h2>
          {() => data && (
            <canvas
              id='team-regions'
              oncreate={() => charts.regionsChart()}>
            </canvas>
          )}
        </div>
      </div>
    }
  </team>
