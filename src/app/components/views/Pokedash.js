import { h } from 'hyperapp'
import Header from '../Header'
import Navigation from '../Navigation'
import Pokemon from '../Pokemon'

export default (state, actions) =>
  <app>
    <p id="consolelog"><h3>Log state</h3>{console.log(state)}</p>
    <Header></Header>

    <Navigation></Navigation>

    <div oncreate={() => actions.getPokemon({id: '101', location: 'pokemon'})}>
      <Pokemon
        data={state.pokemon}>
      </Pokemon>
    </div>
  </app>
