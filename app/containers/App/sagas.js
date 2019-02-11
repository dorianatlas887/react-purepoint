// @flow

// Rules on how to organize this file: https://github.com/erikras/ducks-modular-redux

import { fromJS } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, REQUESTED, SUCCEDED, FAILED, ERROR } from 'utils/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import type { Action, State } from 'types/common';
import type { Saga } from 'redux-saga';

// ------------------------------------
// Constants
// ------------------------------------
const SET_META_JSON = 'PUREPOINT/App/SET_META_JSON';
const RECIPE = 'PUREPOINT/App/RECIPE';
// ------------------------------------
// Actions
// ------------------------------------
export const requestRecipe = query => ({
  type: RECIPE + REQUESTED,
  payload: query,
});
const recipeRequestSuccess = (payload: Object) => ({
  type: RECIPE + SUCCEDED,
  payload,
});
const recipeRequestFailed = error => ({
  type: RECIPE + FAILED,
  payload: error,
});
const recipeRequestError = error => ({
  type: RECIPE + ERROR,
  payload: error,
});

export const setMetaJson = (path: string, value: ?Object) => ({
  type: SET_META_JSON,
  payload: value,
  meta: {
    path,
  },
});
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  isLoading: false,
  error: '',
  recipes: [],
});

export const reducer = (
  state: State = initialState,
  { type, payload, meta }: Action
) => {
  switch (type) {
    case RECIPE + REQUESTED:
      return state.set('isLoading', true);

    case RECIPE + SUCCEDED:
      return state.set('isLoading', false).set('recipes', fromJS(payload));

    case RECIPE + FAILED:
      return state
        .set('isLoading', false)
        .set('error', payload)
        .set('recipes', fromJS([]));

    case RECIPE + ERROR:
      return state.set('isLoading', false).set('recipes', fromJS([]));

    case SET_META_JSON:
      if (meta.path)
        return state.setIn(['metaJson', ...meta.path], fromJS(payload));
      return state.set('metaJson', fromJS(payload));

    case LOCATION_CHANGE:
      return state.set('metaJson', fromJS({})).set('error', '');

    default:
      return state;
  }
};

// ------------------------------------
// Selectors
// ------------------------------------

// ------------------------------------
// Sagas
// ------------------------------------
function* RecipeRequest({ payload }) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: `/api/?q=${payload}`,
    });
    if (response.status === 200) {
      yield put(recipeRequestSuccess(response.data));
    } else {
      yield put(recipeRequestFailed(response.data));
    }
  } catch (error) {
    yield put(recipeRequestError(error));
  }
}

export default function*(): Saga<void> {
  yield takeLatest(RECIPE + REQUESTED, RecipeRequest);
}
