import { h } from 'hyperapp'

export default (data) =>
  <pokemon>
    {console.log('pokemon', data)}
    <h2> {data.name} </h2>
    <ul>
      <p> Abilities </p>
      {data.abilities.map(ability => <li> {ability.name} </li>)}
    </ul>
  </pokemon>
