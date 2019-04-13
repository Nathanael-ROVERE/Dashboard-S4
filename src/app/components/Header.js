import { h } from 'hyperapp'

export default ({languages, setLanguage}) =>
  <header>
    <h1> Pokedash </h1>
    <h2> Your Pokemon companion </h2>
    <h3> Version 1.0 </h3>
    <select onchange={(event) => setLanguage(event.target.value)}>
      {languages && languages.map(language => <option>{language.name}</option>)}
    </select>
  </header>
