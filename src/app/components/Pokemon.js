import { h } from 'hyperapp'
import { utils } from '../actions/index'
import Ability from './Ability'

export default ({language, name, data, abilities, loadPokemon, loadAbility}) =>
  <pokemon oncreate={() => loadPokemon(name)} >
    {console.log(data)}

    <h2> {data.names && utils.titleCase(data.names.find(name => name.language.name === language).name)} </h2>

    <img src={data.sprites && data.sprites.front_default}></img>

    <div>
      <h3> Abilities </h3>
      <ul>
        {data.abilities && data.abilities.map((entry, index) => <Ability name={entry.ability.name} data={abilities[index]} loadAbility={loadAbility}></Ability>)}
      </ul>
    </div>
  </pokemon>
