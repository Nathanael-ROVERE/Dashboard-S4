import { h } from 'hyperapp'
import { utils } from '../actions/index'
import { strengths, weaknesses, colors } from '../../../assets/types'

export default ({data}) => {
  if (data) {
    return (
      <pokemon>
        <strengths class='data-box types'>
          <h2> Strengths </h2>
          {data && data.types && strengths(data.types.map(entry => entry.type.name)).map(strength => <type style={'background-color:' + colors[strength]}> {strength.toUpperCase()} </type>)}
        </strengths>

        <identity class='data-box'>
          <h2> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>

          <sprites>
            <img src={data && data.sprites && data.sprites.front_default}></img>
            <img src={data && data.sprites && data.sprites.front_shiny}></img>
          </sprites>

          <types class='types'>
            <h3> Types </h3>
            {data && data.types && data.types.map((entry) =>
              <type style={'background-color:' + colors[entry.type.name]}>
                <p>
                  {entry.type.name.toUpperCase()}
                </p>
              </type>
            )}
          </types>
        </identity>

        <weaknesses class='data-box types'>
          <h2> Weaknesses </h2>
          {data && data.types && weaknesses(data.types.map(entry => entry.type.name)).map(weakness => <type style={'background-color:' + colors[weakness]}> {weakness.toUpperCase()} </type>)}
        </weaknesses>

        <div class='data-box'>
          <experience>
            <h3> Base Experience : {data.base_experience} </h3>
          </experience>

          <hapiness>
            <h3> Base Hapiness : {data.base_happiness + '/255'}</h3>
          </hapiness>

          <capture>
            <h3> Capture Rate : {(100 * data.base_happiness / 255).toFixed(2) + ' %'} </h3>
          </capture>

          <gender>
            <h3> Gender Rate : {(100 * data.gender_rate / 8).toFixed(2) + ' % female'} </h3>
          </gender>

          <abilities>
            <h3> Abilities </h3>
            {data && data.abilities && data.abilities.map((entry) =>
              <ability>
                <p>{utils.titleCase(entry.ability.name)}</p>
              </ability>
            )}
          </abilities>
        </div>

        { () => data && data.stats && (
          <canvas class='data-box' id={'stats' + data.name.toLowerCase()} oncreate={() => utils.chart(
            {
              id: 'stats' + data.name.toLowerCase(),
              labels: data.stats.map(stats => stats.stat.name),
              data: data.stats.map(stats => stats.base_stat)
            }
          )}>
          </canvas>)
        }
      </pokemon>
    )
  }
}
