import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({name, data, loadAbility}) =>
  <ability oncreate={() => loadAbility(name)} >
    {console.log(data)}
    {console.log(name)}
    <h2> {data && data.names && utils.titleCase(data.name)} </h2>
  </ability>
