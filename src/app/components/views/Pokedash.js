import { h } from 'hyperapp'
import Header from '../Header'
import Navigation from '../Navigation'
import Pokemon from '../Pokemon'
import requests from '../../actions/requests'

export default () =>
  <app>
    <Header></Header>
    <Navigation></Navigation>
    <Pokemon data={requests.getPokemon('Rattata')}></Pokemon>
  </app>
