import { combineReducers } from 'redux'
import { REQUEST_RESOURCES, RECEIVE_RESOURCES } from './actions.js'

function resources(state = {}, action) {
  switch (action.type) {
    case REQUEST_RESOURCES:
      return state
    case RECEIVE_RESOURCES:
      return Object.assign({}, state, {
        resources: action.resources
      })
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  resources
});
