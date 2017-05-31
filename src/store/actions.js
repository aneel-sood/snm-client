import fetch from 'isomorphic-fetch';

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_RESPONSE_RECEIVED = 'SEARCH_RESPONSE_RECEIVED';

export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';

export const RECEIVE_CLIENT_NEED = 'RECEIVE_CLIENT_NEED';

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

function requestClient() {
  return {
    type: REQUEST_CLIENT
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

function receiveClientNeed(clientId, json) {
  return {
    type: RECEIVE_CLIENT_NEED,
    clientId: clientId,
    need: json,
    receivedAt: Date.now()
  }
}

const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
// const serverHost = 'http://127.0.0.1:8000';

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
    dispatch(requestClient())
    const url = serverHost + '/client/' + id;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receiveClient(id, json)))
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
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}