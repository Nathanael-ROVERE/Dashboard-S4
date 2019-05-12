import { h } from 'hyperapp'
import { utils } from '../../../actions/index'
import { colors } from '../../../../../assets/types'
import { Link } from '@hyperapp/router'

export default ({data, removeFromTeam, slot}) => {
  if (data && Object.keys(data).length > 0) {
    const color = (data.types && data.types.length > 0 && colors[data.types[0].type.name])
    return (
      <pokemonpreview class='data-box' style={ 'background-color: ' + (color && color.light) }>
        <h2 style={ 'background-color: ' + (color && color.dark) }> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>
        <img src={data && data.sprites && data.sprites.front_default}></img>
        <img onclick={() => removeFromTeam({slot})} class='image del-image clickable' src="/img/cancel.png"/>
      </pokemonpreview>
    )
  } else {
    return (
      <pokemonpreview class='data-box empty'>
        <Link to='/pokedex/1'> <img class='image add-image clickable' src="/img/add.png"/> </Link>
      </pokemonpreview>
    )
  }
}
