import { stages, getType, isType } from '../actions';
import {
  isPending,
  isFulfilled,
  isRejected,
  isQuery,
  isRemove,
  isReset,
  verbs
} from '../index';

describe('actions', () => {
  test('stages', () => {
    expect(stages).toEqual({
      PENDING: 'pending',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected'
    });
  });

  test('verbs', () => {
    expect(verbs).toEqual({
      GET: 'get',
      FIND: 'find',
      FIRST: 'first',
      CREATE: 'create',
      UPDATE: 'update',
      PATCH: 'patch',
      REMOVE: 'remove',
      RESET: 'reset'
    });
  });

  test('getType', () => {
    expect(getType(verbs.CREATE, 'people', stages.FULFILLED)).toEqual(
      '@redux-hydrogen/CREATE_PEOPLE_FULFILLED'
    );
  });

  test('isType', () => {
    const type = getType(verbs.CREATE, 'people', stages.FULFILLED);
    expect(isType(type, verbs.CREATE)).toBe(true);
    expect(isType(type, verbs.FIND)).toBe(false);
  });

  test('isPending', () => {
    expect(isPending(getType(verbs.CREATE, 'people', stages.PENDING))).toBe(true);
    expect(isPending(getType(verbs.CREATE, 'people', stages.FULFILLED))).toBe(false);
  });

  test('isFulfilled', () => {
    expect(isFulfilled(getType(verbs.CREATE, 'people', stages.FULFILLED))).toBe(true);
    expect(isFulfilled(getType(verbs.CREATE, 'people', stages.PENDING))).toBe(false);
  });

  test('isRejected', () => {
    expect(isRejected(getType(verbs.CREATE, 'people', stages.REJECTED))).toBe(true);
    expect(isRejected(getType(verbs.CREATE, 'people', stages.FULFILLED))).toBe(false);
  });

  test('isQuery', () => {
    expect(isQuery(getType(verbs.FIND, 'people', stages.PENDING))).toBe(true);
    expect(isQuery(getType(verbs.GET, 'people', stages.PENDING))).toBe(true);
    expect(isQuery(getType(verbs.FIRST, 'people', stages.PENDING))).toBe(true);
    expect(isQuery(getType(verbs.CREATE, 'people', stages.PENDING))).toBe(false);
  });

  test('isRemove', () => {
    expect(isRemove(getType(verbs.REMOVE, 'people', stages.PENDING))).toBe(true);
    expect(isRemove(getType(verbs.FIND, 'people', stages.PENDING))).toBe(false);
  });

  test('isReset', () => {
    expect(isReset(getType(verbs.RESET, 'people', stages.PENDING))).toBe(true);
    expect(isReset(getType(verbs.CREATE, 'people', stages.PENDING))).toBe(false);
  });
});
