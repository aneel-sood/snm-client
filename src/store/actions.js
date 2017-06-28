import fetch from 'isomorphic-fetch';
import { serverHost } from './defaults.js';
import { receiveNeeds } from './actions/needActions.js'

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_RESPONSE_RECEIVED = 'SEARCH_RESPONSE_RECEIVED';

export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';
export const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
export const RECEIVE_CLIENTS = 'RECEIVE_CLIENTS';

export const REQUEST_DASHBOARD_CLIENT_DATA = 'REQUEST_DASHBOARD_CLIENT_DATA';
export const RECEIEVE_DASHBOARD_CLIENT_DATA = 'RECEIEVE_DASHBOARD_CLIENT_DATA';

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

function requestClients() {
  return {
    type: REQUEST_CLIENTS
  }
}

function receiveClients(json) {
  return {
    type: RECEIVE_CLIENTS,
    clients: json,
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

export function fetchClients() {
  return dispatch => {
    dispatch(requestClients())
    const url = serverHost + '/clients/';

    return fetch(url).then(response => response.json())
      .then(json => {
        dispatch(receiveClients(json))
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