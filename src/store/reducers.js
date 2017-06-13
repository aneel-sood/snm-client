import { combineReducers } from 'redux'
import { SEARCH_REQUESTED, SEARCH_RESPONSE_RECEIVED, REQUEST_CLIENT, 
          RECEIVE_CLIENT, RECEIVE_CLIENT_NEED, REMOVE_CLIENT_NEED,
          REQUEST_DASHBOARD_CLIENT_DATA, RECEIEVE_DASHBOARD_CLIENT_DATA,
          RECEIVE_UPDATED_CLIENT_NEED } from './actions.js'
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

function clients(state = {byId: {}, dashboard: {index: [], loaded: false} }, action) {
  let nextById, nextClientNeedsSet, nextClient;
  switch (action.type) {
    case REQUEST_CLIENT:
      nextById = { ...state.byId, [action.id]: { loaded: false } }
      return {...state, byId: nextById }
    case RECEIVE_CLIENT:
      nextById = {...state.byId, [action.id]: { ...action.client, loaded: true }}
      return {...state, byId: nextById }
    case REQUEST_DASHBOARD_CLIENT_DATA:
      return {...state, dashboard: {index: [], loaded: false}}
    case RECEIEVE_DASHBOARD_CLIENT_DATA:
      return {...state, dashboard: { index: action.clients, loaded: true } }
    case RECEIVE_CLIENT_NEED:
      nextClientNeedsSet = [action.need, ...state.byId[action.clientId].needs];
      nextClient = {...state.byId[action.clientId], needs: nextClientNeedsSet};
      nextById = {...state.byId, [action.clientId]: nextClient}
      return {...state, byId: nextById}    
    case RECEIVE_UPDATED_CLIENT_NEED:
      nextClientNeedsSet = _.clone(state.byId[action.clientId].needs);
      _.remove(nextClientNeedsSet, (n) => { return n.id === action.needId });
      nextClientNeedsSet = [action.need, ...nextClientNeedsSet];
      nextClient = {...state.byId[action.clientId], needs: nextClientNeedsSet};
      nextById = {...state.byId, [action.clientId]: nextClient};
      return {...state, byId: nextById}
    case REMOVE_CLIENT_NEED:
      nextClientNeedsSet = _.clone(state.byId[action.clientId].needs);
      _.remove(nextClientNeedsSet, (n) => { return n.id === action.needId });
      nextClient = {...state.byId[action.clientId], needs: nextClientNeedsSet};
      nextById = {...state.byId, [action.clientId]: nextClient};
      return {...state, byId: nextById}
    default:
      return state
  }
}

function needs(state = {byClientId: {}}, action) {
  switch (action.type) {
    default: 
      return state
  }
}

export const rootReducer = combineReducers({
  searchResultsByNeedId,
  clients,
  needs
});
