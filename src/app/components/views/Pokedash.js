import { h } from 'hyperapp'
import { Route, Switch } from '@hyperapp/router'

import Header from '../Header'
import Pokemon from '../Pokemon'
import Pokedex from '../Pokedex'

export default (state, actions) =>
  <app oncreate={() => actions.getPokedex()}>
    <Header></Header>
    <Switch>
      <Route path='/' render={() => <div> Welcome to pokedash </div>}/>
      <Route path="/pokedex" render={() => Pokedex({data: state.pokedex})}/>
      <Route path="/pokemon" render={() => actions.getPokemon({id: '6', location: 'pokemon'} && Pokemon({data: state.pokemon}))}/>
      <Route render={() => <div>PAGE NOT FOUND</div>}/>
    </Switch>
  </app>
