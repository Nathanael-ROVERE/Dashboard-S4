import { h } from 'hyperapp'
import { Route, Switch, Redirect } from '@hyperapp/router'
import TeamSelect from '../Team/SelectOverlay/TeamSelect'

import Header from '../Header'
import Pokemon from '../Pokemon'
import Pokedex from '../Pokedex/Pokedex'
import Team from '../Team/Team'

export default (state, actions) =>
  <app>
    <Header></Header>
    {
      () => state.teamOverlay.display &&
        <TeamSelect
          data={state.team}
          toAdd={state.teamOverlay.toAdd}
          addToTeam={actions.addToTeam}
          setTeamOverlay={actions.setTeamOverlay}
        >
        </TeamSelect>
    }
    <Switch>
      <Route path='/' render={() => <Redirect from='/' to='pokedex/1'/>}/>
      <Route parent path='/pokedex/:page' render={({match}) => Pokedex(
        {
          match: match,
          data: state.pokedex,
          getPokedex: actions.getPokedex,
          getStatePokedex: actions.getStatePokedex,
          addToTeam: actions.addToTeam,
          teamOverlay: state.teamOverlay,
          setTeamOverlay: actions.setTeamOverlay,
          filterPokedex: actions.filterPokedex
        }
      )}/>
      <Route path='/pokemon/:id' render={({match}) => Pokemon(
        {
          match: match,
          data: state.pokemon,
          getPokemon: actions.getPokemon,
          setTeamOverlay: actions.setTeamOverlay
        }
      )}/>
      <Route path='/team' render={() => Team({data: state.team, removeFromTeam: actions.removeFromTeam})}></Route>
      <Route render={() => <div>PAGE NOT FOUND</div>}/>
    </Switch>
  </app>
