import { h } from 'hyperapp'
import { Route, Switch, Redirect } from '@hyperapp/router'

import Header from '../Header'
import Pokemon from '../Pokemon'
import Pokedex from '../Pokedex'

export default (state, actions) =>
  <app>
    <Header></Header>
    <Switch>
      <Route path='/' render={() => <Redirect from='/' to='pokedex/1'/>}/>
      <Route parent path="/pokedex/:page" render={({match}) => Pokedex({match: match, data: state.pokedex, getPokedex: actions.getPokedex})}/>
      <Route path="/pokemon/:id" render={({match}) => Pokemon({match: match, data: state.pokemon, getPokemon: actions.getPokemon})}/>
      <Route render={() => <div>PAGE NOT FOUND</div>}/>
    </Switch>
  </app>
