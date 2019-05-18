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
          getPokedex: actions.getPokedex,
          data: Object.entries(state.pokedex).slice(20 * (state.page.value - 1), 20 * state.page.value),
          page: {
            value: state.page.value,
            next: actions.nextPage,
            previous: actions.previousPage,
            max: state.page.max
          },
          addToTeam: actions.addToTeam,
          teamOverlay: state.teamOverlay,
          setTeamOverlay: actions.setTeamOverlay,
          search: actions.search,
          filterPokedex: actions.filterPokedex
        }
      )}/>
      <Route path='/pokemon/:id' render={({match}) => Pokemon(
        {
          data: state.pokedex[match.params.id],
          setTeamOverlay: actions.setTeamOverlay,
          statsChart: actions.pokemonStatsChart
        }
      )}/>
      <Route path='/team' render={() => Team(
        {
          data: state.team,
          removeFromTeam: actions.removeFromTeam,
          statsChart: actions.teamStatsChart,
          typesChart: actions.teamTypesChart
        }
      )}>
      </Route>
      <Route render={() => <div>PAGE NOT FOUND</div>}/>
    </Switch>
  </app>
