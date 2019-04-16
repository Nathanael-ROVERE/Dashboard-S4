import { h } from 'hyperapp'
import Header from '../Header'
import Pokemon from '../Pokemon'

export default (state, actions) =>
  <app>
    <Header></Header>

    <div oncreate={() => actions.getPokemon({id: '6', location: 'pokemon'})}>
      <Pokemon
        data={state.pokemon}>
      </Pokemon>
    </div>
  </app>
