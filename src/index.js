import { app } from 'hyperapp'

import { actions } from './app/actions'
import state from './app/state'
import view from './app/components/views/Pokedash'

app(
  state,
  actions,
  view,
  document.body
)
