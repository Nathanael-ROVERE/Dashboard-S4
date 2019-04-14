import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({data}) =>
  <ability>
    <h4> {data && data.name && utils.titleCase(data.name)} </h4>
    <p> {data && data.description && data.description}</p>
  </ability>
