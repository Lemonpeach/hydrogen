import { verbs } from 'actions';
import dotprop from 'dot-prop-immutable';
import { selectors } from '../index';

const initialState = {
  hydrogen: {
    people: {
      meta: {
        queried: {},
        error: null,
        pending: false
      },
      data: {}
    }
  }
};

describe('selectors', () => {
  test('hasQueried', () => {
    expect(selectors.hasQueried(initialState, verbs.GET, 'people', 1)).toEqual(undefined);
    expect(selectors.hasQueried(
      dotprop.set(initialState, 'hydrogen.people.meta.queried.get-1', true),
      verbs.GET,
      'people',
      1
    )).toEqual(true);
  });

  test('shouldRequest', () => {
    expect(selectors.shouldRequest(initialState, verbs.GET, 'people', 1)).toEqual(true);
    expect(selectors.shouldRequest(
      dotprop.set(initialState, 'hydrogen.people.meta.pending', true),
      verbs.GET,
      'people',
      1
    )).toEqual(false);
    expect(selectors.shouldRequest(
      dotprop.set(initialState, 'hydrogen.people.meta.queried.get-1', true),
      verbs.GET,
      'people',
      1
    )).toEqual(false);
  });

  test('get', () => {
    expect(selectors.get(initialState, 'people', 1)).toEqual(undefined);
    expect(selectors.get(
      dotprop.set(initialState, 'hydrogen.people.data.1', { id: 1, name: 'McPhearson' }),
      'people',
      1
    )).toEqual({ id: 1, name: 'McPhearson' });
  });

  test('find', () => {
    expect(selectors.find(initialState, 'people', { id: 1 })).toEqual([]);
    expect(selectors.find(
      dotprop.set(
        initialState,
        'hydrogen.people.data',
        { 1: { id: 1, name: 'McPhearson' }, 2: { id: 2, name: 'McPhearson' } }
      ),
      'people',
      { name: 'McPhearson' }
    )).toEqual([{ id: 1, name: 'McPhearson' }, { id: 2, name: 'McPhearson' }]);
  });

  test('first', () => {
    expect(selectors.first(initialState, 'people', { id: 1 })).toEqual(undefined);
    expect(selectors.first(
      dotprop.set(
        initialState,
        'hydrogen.people.data',
        { 1: { id: 1, name: 'McPhearson' }, 2: { id: 2, name: 'McPhearson' } }
      ),
      'people',
      { name: 'McPhearson' }
    )).toEqual({ id: 1, name: 'McPhearson' });
  });
});
