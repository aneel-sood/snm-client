import fetch from 'isomorphic-fetch';
import { serverHost } from './defaults.js';
import { receiveNeeds } from './actions/needActions.js'

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_RESPONSE_RECEIVED = 'SEARCH_RESPONSE_RECEIVED';

export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';

export const REQUEST_DASHBOARD_CLIENT_DATA = 'REQUEST_DASHBOARD_CLIENT_DATA';
export const RECEIEVE_DASHBOARD_CLIENT_DATA = 'RECEIEVE_DASHBOARD_CLIENT_DATA';

// export const SAVE_RESOURCE_MATCH_STATE = 'SAVE_RESOURCE_MATCH_STATE';

function resourceSearchRequested(needId) {
  return {
    type: SEARCH_REQUESTED,
    needId: needId
  }
}

function resourceSearchResponseReceived(needId, json) {
  return {
    type: SEARCH_RESPONSE_RECEIVED,
    needId: needId,
    providers: json,
    receivedAt: Date.now()
  }
}

function requestClient(id) {
  return {
    type: REQUEST_CLIENT,
    id: id
  }
}

function receiveClient(id, json) {
  return {
    type: RECEIVE_CLIENT,
    id: id,
    client: json,
    receivedAt: Date.now()
  }
}

function requestDashboardClientData() {
  return {
    type: REQUEST_DASHBOARD_CLIENT_DATA
  }
}

function receieveDashboardClientData(json) {
  return {
    type: RECEIEVE_DASHBOARD_CLIENT_DATA,
    clients: json,
    receivedAt: Date.now()
  }
}

// function saveResourceMatchState(needId, resourceId, pending, fulfilled) {
//   return {
//     type: SAVE_RESOURCE_MATCH_STATE,
//     needId: needId,
//     resourceId: resourceId,
//     pending: pending,
//     fulfilled: fulfilled,
//     receivedAt: Date.now()
//   }
// }

export function fetchProviderResources(needId, params) {
  return dispatch => {
    dispatch(resourceSearchRequested(needId))
    
    const paramsJSON = JSON.stringify(params),
          paramsUrlEncoded = encodeURIComponent(paramsJSON),
          url = serverHost + '/providers/?params=' + paramsUrlEncoded;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(resourceSearchResponseReceived(needId, json)))
  }
}

export function fetchClient(id) {
  return dispatch => {
    dispatch(requestClient(id))
    const url = serverHost + '/client/' + id;

    return fetch(url).then(response => response.json())
      .then(json => {
        const needs = json.needs;
        delete json.needs;
        dispatch(receiveClient(id, json))
        dispatch(receiveNeeds(id, needs))
      })
  }
}

export function fetchDashboardClientData(id) {
  return dispatch => {
    dispatch(requestDashboardClientData())
    const url = serverHost + '/dashboard/clients/';

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receieveDashboardClientData(json)))
  }
}

export function saveResourceMatchState(resourceId, needId, pending, fulfilled) {
  return dispatch => {
    const url = serverHost + '/need/' + needId + '/resource/' + resourceId + '/',
          params = { pending: pending, fulfilled: fulfilled };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}