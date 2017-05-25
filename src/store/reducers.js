import { combineReducers } from 'redux'
import { REQUEST_PROVIDERS, RECEIVE_PROVIDERS } from './actions.js'

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

export const rootReducer = combineReducers({
  providers
});
