import { h } from 'hyperapp'
import { utils } from '../actions/index'
import { strengths, weaknesses, colors } from '../../../assets/types'
import { Link } from '@hyperapp/router'

const getPokemonMainColor = (pokemon) => pokemon.types && pokemon.types.length > 0 && colors[pokemon.types[0].type.name].light
const getPokemonSecondColor = (pokemon) => (pokemon.types && pokemon.types.length > 1 && colors[pokemon.types[1].type.name].light) || getPokemonMainColor(pokemon)

export default({match, data, getPokemon, setTeamOverlay}) =>

  <pokemon oncreate={() => getPokemon({id: match.params.id, location: 'pokemon'})}>
    <Link to={location.previous}>
      <img class='image back-image clickable' src="/img/previous.png"/>
    </Link>
    <div id="line1">
      <strengths class='data-box types' style={'background-color:' + getPokemonSecondColor(data)}>
        <h2>
          Strengths
        </h2>
        {data.types && strengths(data.types.map(entry => entry.type.name)).map(strength => <type style={'background-color:' + colors[strength].dark}>{strength.toUpperCase()}</type>)}
      </strengths>
      <identity class='data-box' style={'background-color:' + getPokemonMainColor(data)}>
        <h2>
          {data.name && '#' + data.id + ' ' + utils.titleCase(data.name)}
        </h2>

        <sprites>
          <img class='pokemon-image' src={data.sprites && data.sprites.front_default}></img>
          <img class='pokemon-image' src={data.sprites && data.sprites.front_shiny}></img>
        </sprites>
        <types class='types'>
          <h3>
            Types
          </h3>
          <div id="typeList">
            {data.types && data.types.map((entry) =>
              <type style={'background-color:' + colors[entry.type.name].dark}>
                {entry.type.name.toUpperCase()}
              </type>
            )}
          </div>
        </types>
        <img class='image add-image clickable' src="/img/add.png" onclick={() => setTeamOverlay({display: true, toAdd: data})}/>
      </identity>

      <weaknesses class='data-box types' style={'background-color:' + getPokemonSecondColor(data)}>
        <h2>
          Weaknesses
        </h2>
        {data.types && weaknesses(data.types.map(entry => entry.type.name)).map(weakness => <type style={'background-color:' + colors[weakness].dark}>{weakness.toUpperCase()}</type>)}
      </weaknesses>
    </div>
    <div id="line2">
      <div class='data-box' style={'background-color:' + getPokemonSecondColor(data)}>
        <h2>
          Attacks
        </h2>
        <experience>
          <h3>
            Base Experience : {data.experience}
          </h3>
        </experience>

        <hapiness>
          <h3>
            Base Hapiness : {data.happiness + '/255'}</h3>
        </hapiness>

        <capture>
          <h3>
            Capture Rate : {(100 * data.gender / 255).toFixed(2) + ' %'}
          </h3>
        </capture>

        <gender>
          <h3>
            Gender Rate : {(100 * data.gender / 8).toFixed(2) + ' % female'}
          </h3>
        </gender>

        <abilities>
          <h3>
            Abilities
          </h3>
          {data.abilities && data
            .abilities
            .map((entry) => <ability>
              <p>{utils.titleCase(entry.ability.name)}</p>
            </ability>)}
        </abilities>
      </div>

      <div class='chart-container data-box' style={'position: relative; width:50vw; background-color:' + getPokemonSecondColor(data)}>
        <h2>
          Statistics
        </h2>
        {() => data.stats && (
          <canvas
            style='background-color: transparent'
            class='data-box'
            id={'stats' + data.id}
            oncreate={() => utils.chart({
              id: 'stats' + data.id,
              labels: data.stats.map(stats => stats.stat.name),
              data: data.stats.map(stats => stats.base_stat),
              type: 'horizontalBar'
            })}>
          </canvas>
        )}
      </div>
    </div>
  </pokemon>
