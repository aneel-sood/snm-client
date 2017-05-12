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

export function fetchAllResources() {
  return dispatch => {
    dispatch(requestResources())
    return fetch('http://127.0.0.1:8000/interpreters/')
      .then(response => response.json())
      .then(json => dispatch(receiveResources(json)))
  }
}