import fetch from 'isomorphic-fetch';

export const REQUEST_PROVIDERS = 'REQUEST_PROVIDERS';
export const RECEIVE_PROVIDERS = 'RECEIVE_PROVIDERS';

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

// const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
const serverHost = 'http://127.0.0.1:8000';

export function fetchProviders(vals) {
  return dispatch => {
    dispatch(requestProviders())
    let paramsJSON = JSON.stringify(vals),
        paramsUrlEncoded = encodeURIComponent(paramsJSON),
        url = serverHost + '/providers/?params=' + paramsUrlEncoded;

    return fetch(url).then(response => response.json())
      .then(json => dispatch(receiveProviders(json)))
  }
}