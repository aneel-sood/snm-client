import { combineReducers } from 'redux'
import { SEARCH_REQUESTED, SEARCH_RESPONSE_RECEIVED, REQUEST_CLIENT, 
          RECEIVE_CLIENT, RECEIVE_CLIENT_NEED, REMOVE_CLIENT_NEED,
          REQUEST_DASHBOARD_CLIENT_DATA, RECEIEVE_DASHBOARD_CLIENT_DATA } from './actions.js'
import _ from 'lodash'

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

function clients(state = {loaded: false, items: {}, dashboard: {index: [], loaded: false} }, action) {
  let nextItems, nextClientNeedsSet, nextClient;
  switch (action.type) {
    case REQUEST_CLIENT:
      return {...state, loaded: false}
    case RECEIVE_CLIENT:
      nextItems = {...state.items, [action.id]: action.client}
      return {...state, items: nextItems, loaded: true}
    case REQUEST_DASHBOARD_CLIENT_DATA:
      return {...state, dashboard: {index: [], loaded: false}}
    case RECEIEVE_DASHBOARD_CLIENT_DATA:
      return {...state, dashboard: { index: action.clients, loaded: true } }
    case RECEIVE_CLIENT_NEED:
      nextClientNeedsSet = [action.need, ...state.items[action.clientId].needs];
      nextClient = {...state.items[action.clientId], needs: nextClientNeedsSet};
      nextItems = {...state.items, [action.clientId]: nextClient}
      return {...state, items: nextItems}    
    case REMOVE_CLIENT_NEED:
      nextClientNeedsSet = _.clone(state.items[action.clientId].needs);
      _.remove(nextClientNeedsSet, (n) => { return n.id === action.needId });
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
