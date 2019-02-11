// @flow

import { Iterable } from 'immutable';
import type { Map } from 'immutable';
import { get as _get } from 'lodash';

export const get = (
  collection: ?Map<*, *> | Object,
  path: string,
  defaultValue: any
) => {
  if (!collection) {
    return defaultValue;
  } else if (Iterable.isIterable(collection)) {
    return collection.get(path, defaultValue);
  }
  return _get(collection, path, defaultValue);
};

export const getIn = (
  collection: ?Map<*, *> | Object,
  path: Array<string>,
  defaultValue: any
) => {
  if (!collection) {
    return defaultValue;
  } else if (Iterable.isIterable(collection)) {
    return collection.getIn(path, defaultValue);
  }
  return _get(collection, path, defaultValue);
};
