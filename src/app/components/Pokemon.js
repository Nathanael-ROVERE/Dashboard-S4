import { h } from 'hyperapp'
import { utils } from '../actions/index'
import { strengths, weaknesses, colors } from '../../../assets/types'
import { Link } from '@hyperapp/router'

const getPokemonMainColor = (pokemon) => pokemon && pokemon.types && pokemon.types.length > 0 && colors[pokemon.types[0].type.name].light

export default({match, data, getPokemon, setTeamOverlay}) =>

  <pokemon oncreate={() => getPokemon({id: match.params.id, location: 'pokemon'})}>
    <Link to={location.previous}>
      <img class='image back-image clickable' src="/img/previous.png"/>
    </Link>
    <div id="line1">
      <strengths class='data-box types'>
        <h2>
          Strengths
        </h2>
        {data && data.types && strengths(data.types.map(entry => entry.type.name)).map(strength => <type style={'background-color:' + colors[strength].dark}>{strength.toUpperCase()}</type>)}
      </strengths>
      <identity class='data-box' style={'background-color:' + getPokemonMainColor(data)}>
        <h2>
          {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)}
        </h2>

        <sprites>
          <img class='pokemon-image' src={data && data.sprites && data.sprites.front_default}></img>
          <img class='pokemon-image' src={data && data.sprites && data.sprites.front_shiny}></img>
        </sprites>
        <types class='types'>
          <h3>
            Types
          </h3>
          <div id="typeList">
            {data && data.types && data.types.map((entry) =>
              <type style={'background-color:' + colors[entry.type.name].dark}>
                {entry.type.name.toUpperCase()}
              </type>
            )}
          </div>
        </types>
        <img class='image add-image clickable' src="/img/add.png" onclick={() => setTeamOverlay({display: true, toAdd: data})}/>
      </identity>

      <weaknesses class='data-box types'>
        <h2>
          Weaknesses
        </h2>
        {data && data.types && weaknesses(data.types.map(entry => entry.type.name)).map(weakness => <type style={'background-color:' + colors[weakness].dark}>{weakness.toUpperCase()}</type>)}
      </weaknesses>
    </div>
    <div id="line2">
      <div class='chart-container data-box' style={'position: relative; width:50vw;'}>
        <h2>
          Statistics for {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)}
        </h2>
        {() => {
          const getChart = () => utils.chart({
            id: 'stats' + data.id,
            labels: data.stats.map(stats => stats.stat.name),
            data: data.stats.map(stats => stats.base_stat),
            type: 'horizontalBar'
          })
          return (
            data.stats && <canvas
              style='background-color: transparent'
              class='data-box'
              id={'stats' + data.id}
              oncreate={getChart}
              onupdate={getChart}>
            </canvas>
          )
        }}
      </div>
    </div>
  </pokemon>
