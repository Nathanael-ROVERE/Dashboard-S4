import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({data}) =>
  <stat>
    <h4> {data && data.stat.name && utils.titleCase(data.stat.name)} </h4>
    <p> Base Stat : {data && data.base_stat}</p>
    <p> Effort : {data && data.effort}</p>
  </stat>
