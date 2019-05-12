import { h } from 'hyperapp'
import { utils } from '../../actions/index'
import { Link } from '@hyperapp/router'
import { colors } from '../../../../assets/types'

export default ({data, setTeamOverlay}) => {
  if (data) {
    const color = (data.types && data.types.length > 0 && colors[data.types[0].type.name])
    return (
      <pokemonpreview class='pokemon-preview' style={ 'background-color:' + (color && color.light)}>
        <Link class='preview-link' to={'/pokemon/' + data.id}>
          <h2 id='pokemon-name'> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>
          <img src={data && data.sprites && data.sprites.front_default}></img>
        </Link>
        <div class="img clickable" onclick={() => setTeamOverlay({display: true, toAdd: data})} style={ 'background-color:' + (color && color.dark)}>
          <img class='image add-image ' src="/img/add.png"/>
        </div>
      </pokemonpreview>
    )
  }
}
