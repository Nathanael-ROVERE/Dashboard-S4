import { h } from 'hyperapp'
import { utils } from '../../actions/index'
import { Link } from '@hyperapp/router'
import { colors } from '../../../../assets/types'

export default ({data, setTeamOverlay}) => {
  if (data) {
    return (
      <pokemonpreview class='pokemon-preview' style={ ('background-color:' + colors[data.types[0].type.name].light)}>
        <Link class='preview-link' to={'/pokemon/' + data.id}>
          <h2 id='pokemon-name'> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>
          <img src={data && data.sprites && data.sprites.front_default}></img>
        </Link>
        <img class='image add-image clickable' src="/img/add.png" onclick={() => setTeamOverlay({display: true, toAdd: data})}/>
      </pokemonpreview>
    )
  }
}
