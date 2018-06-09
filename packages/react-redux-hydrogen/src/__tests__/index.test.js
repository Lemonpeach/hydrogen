import create from '../index';

describe('index', () => {
  test('exports factory function', () => {
    expect(create({})).toEqual({
      find: expect.any(Function),
      first: expect.any(Function),
      get: expect.any(Function)
    });
  });
});
