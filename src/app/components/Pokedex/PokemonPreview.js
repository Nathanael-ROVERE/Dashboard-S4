import { h } from 'hyperapp'
import { utils } from '../../actions/index'
import { Link } from '@hyperapp/router'

export default ({data}) => {
  if (data) {
    return (
      <pokemonpreview class='data-box'>
        <Link to={'/pokemon/' + data.id}>
          <h2 id='pokemon_name'> {data && data.name && '#' + data.id + ' ' + utils.titleCase(data.name)} </h2>
          <img src={data && data.sprites && data.sprites.front_default}></img>
        </Link>
      </pokemonpreview>
    )
  }
}
