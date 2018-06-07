import keyBy from 'lodash/keyBy';
import isArray from 'lodash/isArray';
import dotprop from 'dot-prop-immutable';

const keyById = data => keyBy(
  isArray(data) ? data : [data],
  item => item.id
);

const initialState = {
  meta: {
    queried: {},
    error: null,
    pending: false
  },
  data: {}
};

export const getQueriedKey = (type, query) => {
  const qualifier = query ? `-${JSON.stringify(query)}` : '';
  return `${type}${qualifier}`;
};

export const insert = data => (state = initialState) => dotprop.set(
  state,
  'data',
  {
    ...state.data,
    ...keyById(data)
  }
);

export const queried = (type, query) => (state = initialState) => dotprop.set(
  state,
  `meta.queried.${getQueriedKey(type, query)}`,
  true
);

export const remove = id => (state = initialState) => dotprop.delete(
  state,
  `data.${id}`
);

export const reset = () => () => initialState;

export const errored = error => (state = initialState) => dotprop.set(
  state,
  'meta.error',
  error
);

export const pending = pend => (state = initialState) => dotprop.set(
  state,
  'meta.pending',
  pend
);
