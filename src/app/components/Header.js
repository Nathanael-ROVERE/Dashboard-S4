import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'

export default () =>
  <header>
    <div id="title">
      <Link to='/'>
        <img src="/img/POKEDASH.png"/>
      </Link>
    </div>
    <div id="menuSizeKeeper">
      <div id="menu">
        <Link to='/pokedex'> Pokedex </Link>
        <Link to='/team'> Equipe </Link>
      </div>
    </div>
  </header>
