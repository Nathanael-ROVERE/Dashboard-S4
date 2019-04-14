import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({data}) =>
  <move>
    <h2> {data && data.name && utils.titleCase(data.name)} </h2>
    <p> Power : {data.power}</p>
    <p> Accuracy : {data.accuracy}</p>
    <p> PP : {data.pp}</p>
    <p> Priority : {data.priority}</p>
    <p> Type : {data.type}</p>
    <p>Learned at : </p>
    <ul>
      {data && data.learning && data.learning.map(version =>
        <li>
          {utils.titleCase(version.name)} : level {version.level}
        </li>
      )}
    </ul>
  </move>
