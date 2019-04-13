import { h } from 'hyperapp'
import Header from '../Header'
import Navigation from '../Navigation'
import Pokemon from '../Pokemon'

export default (state, actions) =>
  <app oncreate={() => actions.getLanguages()}>
    <p>{console.log(state)}</p>
    <Header
      languages={state.languages}
      setLanguage={(language) => actions.set({entry: 'language', data: language})}>
    </Header>

    <Navigation></Navigation>
    <Pokemon
      language={state.language}
      name='16'
      data={state.pokemon}
      abilities={state.abilities}
      loadPokemon={(name) => actions.getPokemon(name)}
      loadAbility={(name) => actions.getAbility(name)}>
    </Pokemon>
  </app>
