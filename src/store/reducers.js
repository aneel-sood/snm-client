import { combineReducers } from 'redux'
import { SEARCH_REQUESTED, SEARCH_RESPONSE_RECEIVED, REQUEST_CLIENT, 
          RECEIVE_CLIENT, RECEIVE_CLIENT_NEED} from './actions.js'

function searchResultsByNeedId(state = {}, action) {
  let nextResultObj;
  switch (action.type) {
    case SEARCH_REQUESTED:
      nextResultObj = {...state[action.needId], loaded: false};
      return {...state, [action.needId]: nextResultObj};
    case SEARCH_RESPONSE_RECEIVED:
      nextResultObj = {...state[action.needId], result: action.providers, loaded: true};
      return {...state, [action.needId]: nextResultObj}
    default:
      return state
  }
}

function clients(state = {loaded: false, items: {}}, action) {
  let nextItems;
  switch (action.type) {
    case REQUEST_CLIENT:
      return {...state, loaded: false}
    case RECEIVE_CLIENT:
      nextItems = {...state.items, [action.id]: action.client}
      return {...state, items: nextItems, loaded: true}
    case RECEIVE_CLIENT_NEED:
      let nextClientNeedsSet = [action.need, ...state.items[action.clientId].needs],
          nextClient = {...state.items[action.clientId], needs: nextClientNeedsSet};
      nextItems = {...state.items, [action.clientId]: nextClient}
      return {...state, items: nextItems}    
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  searchResultsByNeedId,
  clients
});
