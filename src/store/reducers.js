import { combineReducers } from 'redux'
import { REQUEST_PROVIDERS, RECEIVE_PROVIDERS, REQUEST_CLIENT, RECEIVE_CLIENT } from './actions.js'

function providers(state = {loaded: false}, action) {
  switch (action.type) {
    case REQUEST_PROVIDERS:
      return {...state, loaded: false}
    case RECEIVE_PROVIDERS:
      return {...state, index: action.providers, loaded: true}
    default:
      return state
  }
}

function clients(state = {loaded: false, items: {}}, action) {
  switch (action.type) {
    case REQUEST_CLIENT:
      return {...state, loaded: false}
    case RECEIVE_CLIENT:
      let nextItems = {...state.items, [action.id]: action.client}
      return {...state, items: nextItems, loaded: true}
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  providers,
  clients
});
