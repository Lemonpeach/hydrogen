import { getType, verbs, stages } from 'actions/actions';

describe('reducers/data-reducer', () => {
  beforeEach(() => {
    const mock = jest.fn(s => s);

    jest.clearAllMocks();
    jest.resetModules();
    jest.mock('../modifiers', () => ({
      pending: jest.fn(() => mock),
      errored: jest.fn(() => mock),
      reset: jest.fn(() => mock),
      remove: jest.fn(() => mock),
      insert: jest.fn(() => mock),
      queried: jest.fn(() => mock)
    }));
  });

  test('does nothing', () => {
    const { reducer } = require('../data-reducer');
    expect(reducer({}, { type: 'none' })).toEqual({});
    const {
      pending,
      errored,
      reset,
      remove,
      insert,
      queried
    } = require('../modifiers');
    expect(pending).toHaveBeenCalledTimes(0);
    expect(errored).toHaveBeenCalledTimes(0);
    expect(reset).toHaveBeenCalledTimes(0);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(insert).toHaveBeenCalledTimes(0);
    expect(queried).toHaveBeenCalledTimes(0);
  });

  test('handles pending action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, { type: getType(verbs.CREATE, 'people', stages.PENDING) });
    const { pending } = require('../modifiers');
    expect(pending).toHaveBeenCalledWith(true);
    expect(pending()).toHaveBeenCalledWith(state);
  });

  test('handles reset action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, { type: getType(verbs.RESET, 'people', stages.FULFILLED) });
    const { reset } = require('../modifiers');
    expect(reset).toHaveBeenCalledWith();
    expect(reset()).toHaveBeenCalledWith(state);
  });

  test('handles remove action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, { data: { id: 1 }, type: getType(verbs.REMOVE, 'people', stages.FULFILLED) });
    const { remove, pending } = require('../modifiers');
    expect(remove).toHaveBeenCalledWith(1);
    expect(remove()).toHaveBeenCalledWith(state);
    expect(pending).toHaveBeenCalledWith(false);
    expect(pending()).toHaveBeenCalledWith(state);
  });

  test('handles non query insert action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, { data: { id: 1 }, type: getType(verbs.CREATE, 'people', stages.FULFILLED) });
    const { insert, pending } = require('../modifiers');
    expect(insert).toHaveBeenCalledWith({ id: 1 });
    expect(insert()).toHaveBeenCalledWith(state);
    expect(pending).toHaveBeenCalledWith(false);
    expect(pending()).toHaveBeenCalledWith(state);
  });

  test('handles query insert action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, {
      data: { id: 1 },
      query: { name: 'McPhearson' },
      verb: verbs.FIND,
      type: getType(verbs.FIND, 'people', stages.FULFILLED)
    });
    const { insert, pending, queried } = require('../modifiers');
    expect(insert).toHaveBeenCalledWith({ id: 1 });
    expect(insert()).toHaveBeenCalledWith(state);
    expect(queried).toHaveBeenCalledWith(verbs.FIND, { name: 'McPhearson' });
    expect(queried()).toHaveBeenCalledWith(state);
    expect(pending).toHaveBeenCalledWith(false);
    expect(pending()).toHaveBeenCalledWith(state);
  });

  test('handles rejected action', () => {
    const state = {};
    const { reducer } = require('../data-reducer');
    reducer(state, {
      type: getType(verbs.CREATE, 'people', stages.REJECTED), error: 'Expect me.'
    });
    const { pending, errored } = require('../modifiers');
    expect(pending).toHaveBeenCalledWith(false);
    expect(pending()).toHaveBeenCalledWith(state);
    expect(errored).toHaveBeenCalledWith('Expect me.');
    expect(errored()).toHaveBeenCalledWith(state);
  });
});
