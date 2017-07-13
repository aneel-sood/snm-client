import fetch from 'isomorphic-fetch';
import { serverHost } from './defaults.js';
import { receiveNeeds } from './actions/needActions.js'

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_RESPONSE_RECEIVED = 'SEARCH_RESPONSE_RECEIVED';

export const RECEIVE_NEW_CLIENT = 'RECEIVE_NEW_CLIENT';
export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';
export const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
export const RECEIVE_CLIENTS = 'RECEIVE_CLIENTS';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';

export const REQUEST_PROVIDERS = 'REQUEST_PROVIDERS';
export const RECEIVE_PROVIDERS = 'RECEIVE_PROVIDERS';
export const RECEIVE_NEW_PROVIDER = 'RECEIVE_NEW_PROVIDER';

export const REQUEST_DASHBOARD_CLIENT_DATA = 'REQUEST_DASHBOARD_CLIENT_DATA';
export const RECEIEVE_DASHBOARD_CLIENT_DATA = 'RECEIEVE_DASHBOARD_CLIENT_DATA';

export const RECEIVE_NEW_RESOURCE = 'RECEIVE_NEW_RESOURCE';
export const REQUEST_RESOURCES = 'REQUEST_RESOURCES';
export const RECEIVE_RESOURCES = 'RECEIVE_RESOURCES';

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

function receiveNewClient(json) {
  return {
    type: RECEIVE_NEW_CLIENT,
    client: json
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

function removeClient(id) {
  return {
    type: REMOVE_CLIENT,
    id: id
  }
}

function requestProviders() {
  return {
    type: REQUEST_PROVIDERS
  }
}

function receiveProviders(json) {
  return {
    type: RECEIVE_PROVIDERS,
    providers: json,
    receivedAt: Date.now()
  }
}

function receiveNewProvider(json) {
  return {
    type: RECEIVE_NEW_PROVIDER,
    provider: json
  }
}

function requestResources() {
  return {
    type: REQUEST_RESOURCES
  }
}

function receiveResources(json) {
  return {
    type: RECEIVE_RESOURCES,
    resources: json,
    receivedAt: Date.now()
  }
}

function receiveNewResource(json) {
  return {
    type: RECEIVE_NEW_RESOURCE,
    resource: json
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

export function createClient(params) {
  return dispatch => {
    const url = serverHost + '/client/';
          
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveNewClient(json)));
  }
}

export function createResource(params) {
  return dispatch => {
    const url = serverHost + '/resource/';
          
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveNewResource(json)));
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

export function deleteClient(id) {
  return dispatch => {
    const url = serverHost + '/client/' + id + '/';
    return fetch(url, {method: "DELETE"}).then(response => {
      if (response.status === 200) {
        dispatch(removeClient(id))
      }
    });
  }
}

export function fetchResources() {
  return dispatch => {
    dispatch(requestResources())
    const url = serverHost + '/resources/';

    return fetch(url).then(response => response.json())
      .then(json => {
        dispatch(receiveResources(json))
      })
  }
}

export function fetchProviders() {
  return dispatch => {
    dispatch(requestProviders())
    const url = serverHost + '/providers/';

    return fetch(url).then(response => response.json())
      .then(json => {
        dispatch(receiveProviders(json))
      })
  }
}

export function createProvider(params) {
  return dispatch => {
    const url = serverHost + '/provider/';
          
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveNewProvider(json)));
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