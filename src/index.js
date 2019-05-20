import { app } from 'hyperapp'
import { location } from '@hyperapp/router'

import { actions } from './app/actions'
import state from './app/state'
import view from './app/components/views/Pokedash'

const main = app(
  state,
  actions,
  view,
  document.body
)

const unsubscribe = location.subscribe(main.location)
