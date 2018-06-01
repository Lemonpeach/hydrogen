import { bindActionCreators } from '../index';
import { verbs, stages, getType } from '../actions';

describe('actions/action-creators', () => {
  test('returns action object', () => {
    expect(bindActionCreators(verbs.CREATE, 'people')).toEqual({
      pending: expect.any(Function),
      fulfilled: expect.any(Function),
      rejected: expect.any(Function)
    });
  });

  test('create', () => {
    expect(bindActionCreators(verbs.CREATE, 'people').pending()).toEqual({
      type: getType(verbs.CREATE, 'people', stages.PENDING),
      verb: verbs.CREATE,
      name: 'people',
      creator: '@redux-yolo'
    });
  });

  test('fulfilled', () => {
    const data = { id: 1, name: 'McPhearson' };
    expect(bindActionCreators(verbs.CREATE, 'people').fulfilled(data)).toEqual({
      type: getType(verbs.CREATE, 'people', stages.FULFILLED),
      verb: verbs.CREATE,
      name: 'people',
      creator: '@redux-yolo',
      data,
      query: undefined
    });

    const query = { id: 1 };
    expect(bindActionCreators(verbs.FIND, 'people').fulfilled(data, query)).toEqual({
      type: getType(verbs.FIND, 'people', stages.FULFILLED),
      verb: verbs.FIND,
      name: 'people',
      creator: '@redux-yolo',
      data,
      query
    });

    expect(bindActionCreators(verbs.GET, 'people').fulfilled(data, query)).toEqual({
      type: getType(verbs.GET, 'people', stages.FULFILLED),
      verb: verbs.GET,
      name: 'people',
      creator: '@redux-yolo',
      data,
      query
    });
  });

  test('rejected', () => {
    expect(bindActionCreators(verbs.CREATE, 'people').rejected('Expect me.')).toEqual({
      type: getType(verbs.CREATE, 'people', stages.REJECTED),
      verb: verbs.CREATE,
      name: 'people',
      creator: '@redux-yolo',
      error: 'Expect me.'
    });
  });
});
