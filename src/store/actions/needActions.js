import fetch from 'isomorphic-fetch';
import { serverHost } from '../defaults.js';

export const RECEIVE_NEEDS = 'RECEIVE_NEEDS';
export const RECEIVE_NEW_CLIENT_NEED = 'RECEIVE_NEW_CLIENT_NEED';
export const RECEIVE_UPDATED_CLIENT_NEED = 'RECEIVE_UPDATED_CLIENT_NEED';
export const REMOVE_CLIENT_NEED = 'REMOVE_CLIENT_NEED';

export function receiveNeeds(clientId, json) {
  return {
    type: RECEIVE_NEEDS,
    clientId: clientId,
    needs: json,
    receivedAt: Date.now()
  }
}

function receiveNewClientNeed(clientId, json) {
  return {
    type: RECEIVE_NEW_CLIENT_NEED,
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

export function createClientNeed(clientId) {
  return dispatch => {
    const url = serverHost + '/client/' + clientId + '/needs/';
          
    return fetch(url, {method: "POST"}).then(response => response.json())
      .then(json => dispatch(receiveNewClientNeed(clientId, json)));
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