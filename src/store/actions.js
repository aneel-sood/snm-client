import fetch from 'isomorphic-fetch';

export const REQUEST_RESOURCES = 'REQUEST_RESOURCES';
export const RECEIVE_RESOURCES = 'RECEIVE_RESOURCES';

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

const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
// const serverHost = 'http://127.0.0.1:8000';

export function fetchResources(vals) {
  return dispatch => {
    dispatch(requestResources())
    let paramsJSON = JSON.stringify(vals),
        paramsUrlEncoded = encodeURIComponent(paramsJSON),
        url = serverHost + '/resources/?params=' + paramsUrlEncoded;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receiveResources(json)))
  }
}

export function fetchAllResources() {
  return dispatch => {
    dispatch(requestResources())
    return fetch('')
      .then(response => response.json())
      .then(json => dispatch(receiveResources(json)))
  }
}