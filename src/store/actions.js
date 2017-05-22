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

// const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
const serverHost = 'http://127.0.0.1:8000';

export function fetchResources(type) {
  return dispatch => {
    dispatch(requestResources())
    return fetch(serverHost + '/resources/?type=' + type)
      .then(response => response.json())
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