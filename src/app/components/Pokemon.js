import { h } from 'hyperapp'
import { utils } from '../actions/index'
import Ability from './Ability'
import Move from './Move'
import Stat from './Stat'

export default ({data}) =>
  <pokemon>
    <h2> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>

    <img src={data && data.sprites && data.sprites.front_default}></img>
    <img src={data && data.sprites && data.sprites.front_shiny}></img>

    <div>
      <h3> Stats </h3>
      <ul>
        {
          data && data.stats && data.stats.map((entry) =>
            <li>
              <Stat data={entry}></Stat>
            </li>
          )
        }
      </ul>
    </div>

    <div>
      <h3> Abilities </h3>
      <ul>
        {
          data && data.abilities && data.abilities.map((entry) =>
            <li>
              <Ability data={entry}></Ability>
            </li>
          )
        }
      </ul>
    </div>

    <div>
      <h3> Moves </h3>
      <ul>
        {
          data && data.moves && data.moves.map((entry) =>
            <li>
              <Move data={entry}></Move>
            </li>
          )
        }
      </ul>
    </div>
  </pokemon>
