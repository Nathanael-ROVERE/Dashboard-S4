import { h } from 'hyperapp'
import TeamPokemonPreview from '../Team/SelectOverlay/TeamPokemonPreview'
import { utils } from '../../actions/index'
import { colors } from '../../../../assets/types'

export default ({data, removeFromTeam}) =>
  <team>
    <pokemons>
      {
        data && Object.entries(data).map((pokemon, index) =>
          <TeamPokemonPreview
            data={pokemon[1]}
            slot={index + 1}
            removeFromTeam={removeFromTeam}>
          </TeamPokemonPreview>
        )
      }
    </pokemons>
    <div class='chart-container' style="position: relative; width:50vw">
      {() => data && (
        <canvas
          class='data-box'
          id={'stats' + data.id}
          oncreate={() => utils.chart({
            id: 'stats' + data.id,
            labels: data.stats.map(stats => stats.stat.name),
            data: data.stats.map(stats => stats.base_stat),
            colors: colors,
            type: 'horizontalBar'
          })}>
        </canvas>
      )}
    </div>
  </team>
