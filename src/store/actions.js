import fetch from 'isomorphic-fetch';

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_RESPONSE_RECEIVED = 'SEARCH_RESPONSE_RECEIVED';

export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';

export const REQUEST_DASHBOARD_CLIENT_DATA = 'REQUEST_DASHBOARD_CLIENT_DATA';
export const RECEIEVE_DASHBOARD_CLIENT_DATA = 'RECEIEVE_DASHBOARD_CLIENT_DATA';

export const RECEIVE_CLIENT_NEED = 'RECEIVE_CLIENT_NEED';
export const RECEIVE_UPDATED_CLIENT_NEED = 'RECEIVE_UPDATED_CLIENT_NEED';
export const REMOVE_CLIENT_NEED = 'REMOVE_CLIENT_NEED';

export const BOOKMARK_RESOURCE = 'BOOKMARK_RESOURCE';

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

function receiveClientNeed(clientId, json) {
  return {
    type: RECEIVE_CLIENT_NEED,
    clientId: clientId,
    need: json,
    receivedAt: Date.now()
  }
}

function receiveUpdatedClientNeed(clientId, needId, json) {
  return {
    type: RECEIVE_UPDATED_CLIENT_NEED,
    clientId: clientId,
    needId: needId,
    need: json,
    receivedAt: Date.now()
  }
}

function removeClientNeed(clientId, needId) {
  return {
    type: REMOVE_CLIENT_NEED,
    clientId: clientId,
    needId: needId,
    receivedAt: Date.now()
  }
}

// function bookmarkResource(needId, resourceId, fulfilled) {
//   return {
//     type: BOOKMARK_RESOURCE,
//     needId: needId,
//     resourceId: resourceId,
//     fulfilled: fulfilled,
//     receivedAt: Date.now()
//   }
// }

// const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
const serverHost = 'http://127.0.0.1:8000';

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
      .then(json => dispatch(receiveClient(id, json)))
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

export function createClientNeed(clientId) {
  return dispatch => {
    const url = serverHost + '/client/' + clientId + '/needs/';
          
    return fetch(url, {method: "POST"}).then(response => response.json())
      .then(json => dispatch(receiveClientNeed(clientId, json)));
  }
}

export function updateClientNeed(clientId, needId, params) {
  return dispatch => {
    const url = serverHost + '/client/' + clientId + '/need/' + needId + '/';
          
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveUpdatedClientNeed(clientId, needId, json)));
  }
}

export function deleteClientNeed(clientId, needId, params) {
  return dispatch => {
    const url = serverHost + '/client/' + clientId + '/need/' + needId + '/';
    return fetch(url, {method: "DELETE"}).then(response => {
      if (response.status === 200) {
        dispatch(removeClientNeed(clientId, needId))
      }
    });
  }
}

export function bookmarkResourceForNeed(resourceId, needId, fulfilled) {
  return dispatch => {
    const url = serverHost + '/need/' + needId + '/resource/' + resourceId + '/',
          params = { fulfilled: fulfilled };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}