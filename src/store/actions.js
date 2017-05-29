import fetch from 'isomorphic-fetch';

export const REQUEST_PROVIDERS = 'REQUEST_PROVIDERS';
export const RECEIVE_PROVIDERS = 'RECEIVE_PROVIDERS';

export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';

function requestProviders(needId) {
  return {
    type: REQUEST_PROVIDERS,
    needId: needId
  }
}

function receiveProviders(needId, json) {
  return {
    type: RECEIVE_PROVIDERS,
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

// const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
const serverHost = 'http://127.0.0.1:8000';

export function fetchProviders(needId, params) {
  return dispatch => {
    dispatch(requestProviders(needId))
    let paramsJSON = JSON.stringify(params),
        paramsUrlEncoded = encodeURIComponent(paramsJSON),
        url = serverHost + '/providers/?params=' + paramsUrlEncoded;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receiveProviders(needId, json)))
  }
}

export function fetchClient(id) {
  return dispatch => {
    dispatch(requestClient())
    let url = serverHost + '/client/' + id;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receiveClient(id, json)))
  }
}