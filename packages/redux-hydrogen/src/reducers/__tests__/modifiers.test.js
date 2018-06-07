import { merge } from 'lodash';

import { verbs } from 'actions';

import {
  pending,
  errored,
  reset,
  remove,
  queried,
  insert
} from '../modifiers';

const initialState = {
  meta: {
    queried: {},
    error: null,
    pending: false
  },
  data: {}
};

const customState = {
  meta: {
    queried: {},
    error: null,
    pending: false
  },
  data: {
    1: { id: 1, name: 'McPhearson' }
  }
};

describe('reducers/modifiers', () => {
  test('pending', () => {
    expect(pending(true)()).toEqual(
      merge({}, initialState, { meta: { pending: true } })
    );
    expect(pending(true)(customState)).toEqual(
      merge({}, customState, { meta: { pending: true } })
    );
  });

  test('errored', () => {
    expect(errored('Expect me.')()).toEqual(
      merge({}, initialState, { meta: { error: 'Expect me.' } })
    );
    expect(errored('Expect me.')(customState)).toEqual(
      merge({}, customState, { meta: { error: 'Expect me.' } })
    );
  });

  test('reset', () => {
    expect(reset()()).toEqual(initialState);
    expect(reset()(customState)).toEqual(initialState);
  });

  test('remove', () => {
    expect(remove(1)()).toEqual(initialState);
    expect(remove(1)(merge(customState))).toEqual(initialState);
  });

  test('queried', () => {
    const query = { id: 1 };
    expect(queried(verbs.FIND, query)()).toEqual(
      merge({}, initialState, {
        meta: {
          queried: { [`${verbs.FIND}-${JSON.stringify(query)}`]: true }
        }
      })
    );

    expect(queried(verbs.FIND)()).toEqual(
      merge({}, initialState, {
        meta: {
          queried: { [verbs.FIND]: true }
        }
      })
    );
  });

  test('insert', () => {
    const values = [{ id: 1, name: 'McCleoud' }, { id: 2, name: 'McDijlly' }];
    expect(insert(values)()).toEqual(
      merge({}, initialState, {
        data: {
          1: { id: 1, name: 'McCleoud' }, 2: { id: 2, name: 'McDijlly' }
        }
      })
    );

    expect(insert(values)(customState)).toEqual(
      merge({}, customState, {
        data: {
          1: { id: 1, name: 'McCleoud' }, 2: { id: 2, name: 'McDijlly' }
        }
      })
    );

    expect(insert(values[0])(customState)).toEqual(
      merge({}, customState, {
        data: {
          1: { id: 1, name: 'McCleoud' }
        }
      })
    );
  });
});
