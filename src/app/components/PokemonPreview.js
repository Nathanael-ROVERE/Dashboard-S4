import { h } from 'hyperapp'
import { utils } from '../actions/index'

export default ({data}) => {
  if (data) {
    return (
      <pokemonpreview class='data-box'>
        <h2> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>
        <img src={data && data.sprites && data.sprites.front_default}></img>
      </pokemonpreview>
    )
  }
}
