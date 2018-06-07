import { isPending, isFulfilled, isRejected, isQuery, isRemove, isReset } from 'actions';
import { insert, pending, remove, reset, errored, queried } from './modifiers';

const reduce = (r, s) => r.reduce((a, i) => i(a), s);

export const reducer = (state, action) => {
  const {
    type, verb, query, data, error
  } = action;

  if (isPending(type)) {
    return pending(true)(state);
  }

  if (isFulfilled(type)) {
    if (isReset(type)) {
      return reset()(state);
    }
    if (isRemove(type)) {
      return reduce([remove(data.id), pending(false)], state);
    }
    const r = [insert(data), pending(false)];
    if (isQuery(type)) {
      r.push(queried(verb, query));
    }
    return reduce(r, state);
  }

  if (isRejected(type)) {
    return reduce([errored(error), pending(false)], state);
  }

  return state;
};
