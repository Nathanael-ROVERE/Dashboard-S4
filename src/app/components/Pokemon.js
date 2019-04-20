import { h } from 'hyperapp'
import { utils } from '../actions/index'
import { strengths, weaknesses, colors } from '../../../assets/types'

export default ({match}) => (state, actions) =>
  <pokemon oncreate={() => actions.getPokemon({id: match.params.id, location: 'pokemon'})}>
    {console.log('path', match)}
    {console.log('data', state.pokemon)}
    <strengths class='data-box types'>
      <h2> Strengths </h2>
      {state.pokemon && state.pokemon.types && strengths(state.pokemon.types.map(entry => entry.type.name)).map(strength => <type style={'background-color:' + colors[strength]}> {strength.toUpperCase()} </type>)}
    </strengths>

    <identity class='data-box'>
      <h2> {state.pokemon && state.pokemon.name && '#' + state.pokemon.id + ' ' + utils.titleCase(state.pokemon.name)} </h2>

      <sprites>
        <img src={state.pokemon && state.pokemon.sprites && state.pokemon.sprites.front_default}></img>
        <img src={state.pokemon && state.pokemon.sprites && state.pokemon.sprites.front_shiny}></img>
      </sprites>

      <types class='types'>
        <h3> Types </h3>
        {state.pokemon && state.pokemon.types && state.pokemon.types.map((entry) =>
          <type style={'background-color:' + colors[entry.type.name]}>
            <p> {entry.type.name.toUpperCase()} </p>
          </type>
        )}
      </types>
    </identity>

    <weaknesses class='data-box types'>
      <h2> Weaknesses </h2>
      {state.pokemon && state.pokemon.types && weaknesses(state.pokemon.types.map(entry => entry.type.name)).map(weakness => <type style={'background-color:' + colors[weakness]}> {weakness.toUpperCase()} </type>)}
    </weaknesses>

    <div class='data-box'>
      <experience>
        <h3> Base Experience : {state.pokemon.base_experience} </h3>
      </experience>

      <hapiness>
        <h3> Base Hapiness : {state.pokemon.base_happiness + '/255'}</h3>
      </hapiness>

      <capture>
        <h3> Capture Rate : {(100 * state.pokemon.base_happiness / 255).toFixed(2) + ' %'} </h3>
      </capture>

      <gender>
        <h3> Gender Rate : {(100 * state.pokemon.gender_rate / 8).toFixed(2) + ' % female'} </h3>
      </gender>

      <abilities>
        <h3> Abilities </h3>
        {state.pokemon && state.pokemon.abilities && state.pokemon.abilities.map((entry) =>
          <ability>
            <p>{utils.titleCase(entry.ability.name)}</p>
          </ability>
        )}
      </abilities>
    </div>

    { () => state.pokemon && state.pokemon.stats && (
      <canvas class='data-box' id={'stats' + state.pokemon.name.toLowerCase()} oncreate={() => utils.chart(
        {
          id: 'stats' + state.pokemon.name.toLowerCase(),
          labels: state.pokemon.stats.map(stats => stats.stat.name),
          data: state.pokemon.stats.map(stats => stats.base_stat)
        }
      )}>
      </canvas>)
    }
  </pokemon>
