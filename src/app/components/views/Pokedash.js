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
      <Route path="/pokedex" render={Pokedex}/>
      <Route path="/pokemon/:id" render={Pokemon}/>
      <Route render={() => <div>PAGE NOT FOUND</div>}/>
      {console.log(state)}
    </Switch>
  </app>
