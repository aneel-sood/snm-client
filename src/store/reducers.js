import { combineReducers } from 'redux'
import { REQUEST_RESOURCES, RECEIVE_RESOURCES } from './actions.js'

function resources(state = {loaded: false}, action) {
  switch (action.type) {
    case REQUEST_RESOURCES:
      return {...state, loaded: false}
    case RECEIVE_RESOURCES:
      return {...state, index: action.resources, loaded: true}
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  resources
});
