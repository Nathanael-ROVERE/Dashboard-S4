import { h } from 'hyperapp'
import { utils } from '../actions/utils'
import { strengths, weaknesses, colors } from '../../../assets/types'
import { Link } from '@hyperapp/router'

const getPokemonMainColor = (pokemon) => pokemon && pokemon.types && pokemon.types.length > 0 && colors[pokemon.types[0].type.name].light

export default({data, setTeamOverlay, statsChart, shiny}) =>

  <pokemon oncreate={() => shiny.set(false)}>

    <Link to={location.previous}>
      <img class='image back-image clickable' src="/img/previous.png"/>
    </Link>

    <div id="line1">

      <strengths class='data-box types'>
        <h2>
          Strengths
        </h2>
        {data && data.types && strengths(data.types.map(entry => entry.type.name)).map(strength =>
          <type style={'background-color:' + colors[strength].dark}>
            <h3>
              {strength.toUpperCase()}
            </h3>
            <div class='color' style={'background-color:' + colors[strength].light}>
            </div>
          </type>
        )}
      </strengths>

      <identity class='data-box' style={'background-color:' + getPokemonMainColor(data)}>

        <h2>
          {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)}
        </h2>

        <sprites>
          <div id='shiny-selector'>
            <label>Shiny</label>
            <input type='checkbox' id='shiny-selector-checkbox' autocomplete='off' onchange={(event) => shiny.set(event.target.checked)}></input>
          </div>
          {() => data && data.sprites && (shiny.value)
            ? <img class='pokemon-image' src={data.sprites.front_shiny}></img>
            : <img class='pokemon-image' src={data.sprites.front_default}></img>
          }
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
        {data && data.types && weaknesses(data.types.map(entry => entry.type.name)).map(weakness =>
          <type style={'background-color:' + colors[weakness].dark}>
            <h3>
              {weakness.toUpperCase()}
            </h3>
            <div class='color' style={'background-color:' + colors[weakness].light}>
            </div>
          </type>
        )}
      </weaknesses>
    </div>

    <div id="line2">
      <div id="moves" class='data-box'>
        <h2>
          Attacks
        </h2>
        <div>
          {data.moves && data.moves.map((move) =>
            <div class="move" style={'background-color:' + colors[move.type.name].light}>
              <h3 style={'background-color:' + colors[move.type.name].dark}>{move.name}</h3>
              <p>Power: {move.power}</p>
              <p>Accuracy: {move.accuracy}</p>
              <p>PP: {move.pp}</p>
            </div>
          )}
        </div>
      </div>

      <div class='chart-container data-box' style={'position: relative; width:50vw;'}>
        <h2>
          Statistics for {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)}
        </h2>
        {() => data.stats && <canvas
          style='background-color: transparent'
          class='data-box'
          id={'stats' + data.id}
          onupdate={() => statsChart({data: data.stats, id: data.id, onCreate: false})}
          oncreate={() => statsChart({data: data.stats, id: data.id, onCreate: true})}>
        </canvas>
        }
      </div>
    </div>
  </pokemon>
