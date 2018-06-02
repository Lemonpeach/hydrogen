describe('reducers/yolo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.mock('../data-reducer', () => ({
      reducer: jest.fn(() => 'Expect me.')
    }));
  });

  test('does nothing if creator is null', () => {
    const state = {};
    const { reducer } = require('../yolo-reducer');
    expect(reducer(state, {})).toBe(state);
    expect(require('../data-reducer').reducer).toHaveBeenCalledTimes(0);
  });

  test('returns empty state', () => {
    const { reducer } = require('../yolo-reducer');
    expect(reducer(undefined, {})).toEqual({});
    expect(require('../data-reducer').reducer).toHaveBeenCalledTimes(0);
  });

  test('does nothing if creator is not correct', () => {
    const state = {};
    const { reducer } = require('../yolo-reducer');
    expect(reducer(state, { creator: 'nah' })).toBe(state);
    expect(require('../data-reducer').reducer).toHaveBeenCalledTimes(0);
  });

  test('delegates to data reducer', () => {
    const action = { name: 'people', creator: '@redux-yolo' };
    const { reducer } = require('../yolo-reducer');
    expect(reducer({}, action)).toEqual({ people: 'Expect me.' });
    expect(require('../data-reducer').reducer).toHaveBeenCalledTimes(1);
    expect(require('../data-reducer').reducer).toHaveBeenCalledWith(
      undefined,
      action
    );

    expect(reducer({ jobs: {} }, action)).toEqual({ jobs: {}, people: 'Expect me.' });
    expect(require('../data-reducer').reducer).toHaveBeenCalledTimes(2);
    expect(require('../data-reducer').reducer).toHaveBeenCalledWith(
      undefined,
      action
    );
  });
});
