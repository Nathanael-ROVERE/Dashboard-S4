import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({data}) => {
  return (
    <pokemon>
      <h2> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>

      <sprites>
        <img src={data && data.sprites && data.sprites.front_default}></img>
        <img src={data && data.sprites && data.sprites.front_shiny}></img>
      </sprites>

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

      <types>
        <h3> Types </h3>
        {data && data.types && data.types.map((entry) =>
          <type>
            <p>{utils.titleCase(entry.type.name)}</p>
          </type>
        )}
      </types>

      <stats>
        <h3> Stats </h3>
        {data && data.stats && data.stats.map((entry) =>
          <stat>
            <h4> {entry && entry.stat.name && utils.titleCase(entry.stat.name)} </h4>
            <p> Base Stat : {entry && entry.base_stat}</p>
            <p> Effort : {entry && entry.effort}</p>
          </stat>
        )}
      </stats>

      <abilities>
        <h3> Abilities </h3>
        {data && data.abilities && data.abilities.map((entry) =>
          <ability>
            <p>{utils.titleCase(entry.ability.name)}</p>
          </ability>
        )}
      </abilities>
    </pokemon>
  )
}
