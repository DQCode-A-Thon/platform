import {createAction} from 'redux-actions';
//import fetch from 'isomorphic-fetch';
var _ = require('supergroup');
require('isomorphic-fetch');

export const DATA_REQUESTED = 'DATA_REQUESTED';
export const DATA_RECEIVED = 'DATA_RECEIVED';
const requestData = createAction(DATA_REQUESTED);

const receiveData = createAction(DATA_RECEIVED);

export function fetchRecs(apiquery) {
  return dispatch => {
    dispatch(requestData(apiquery));
    return fetch('/data/' + apiquery)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveData(json))
      });
  }
}
export const SUPERGROUPED_DIM = 'SUPERGROUPED_DIM';
const supergrouped =  // puts dim into meta
  createAction(SUPERGROUPED_DIM, (data,dim)=>data, (data,dim)=>dim);
export function supergroup(dim, recs) {
  return (dispatch, getState) => {
    var sg = _.supergroup(recs, dim.field);
    if (sg.length)
      sg = sg.sortBy(a=>-a.records.length);
    var action = supergrouped(sg, dim);
    return dispatch(action);
  };
}
