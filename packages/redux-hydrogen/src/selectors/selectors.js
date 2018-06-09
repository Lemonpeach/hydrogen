import { sorter, filterQuery } from '@feathersjs/commons';
import values from 'lodash/values';
import each from 'lodash/each';
import isNil from 'lodash/isNil';
import sift from 'sift';
import dotprop from 'dot-prop-immutable';

import { getQueriedKey } from 'reducers/modifiers';

const toSiftQuery = query => {
  const q = {};
  each(
    query,
    (value, key) => {
      if (!isNil(value.$regexp)) {
        q[key] = { $regex: value.$regexp };
      } else if (!isNil(value.$iRegexp)) {
        q[key] = { $regex: new RegExp(value.$iRegexp, 'i') };
      } else {
        q[key] = value;
      }
    }
  );
  return q;
};

const getState = (state, name) => dotprop.get(state, `hydrogen.${name}`);

const isPending = (state, name) => dotprop.get(
  getState(state, name),
  'meta.pending'
);

const hasQueried = (state, verb, name, query) => dotprop.get(
  getState(state, name),
  `meta.queried.${getQueriedKey(verb, query)}`
);

const getData = (state, name) => dotprop.get(getState(state, name), 'data');

export const selectors = {
  hasQueried,
  shouldRequest(state, verb, name, query) {
    return !isPending(state, name) && !hasQueried(state, verb, name, query);
  },
  get(state, name, id) {
    return dotprop.get(getData(state, name), id);
  },
  find(state, name, predicate) {
    const { query, filters } = filterQuery(predicate || {});
    const data = values(getData(state, name));

    if (filters.$sort) {
      data.sort(sorter(filters.$sort));
    }

    return sift(toSiftQuery(query), data);
  },
  first(state, name, predicate) {
    const result = this.find(state, name, predicate);
    if (result) {
      return result[0];
    }
    return null;
  }
};
