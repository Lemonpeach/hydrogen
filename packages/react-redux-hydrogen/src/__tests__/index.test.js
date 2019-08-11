import create from '../index';

describe('index', () => {
  test('exports factory function', () => {
    expect(create({})).toEqual({
      useFind: expect.any(Function),
      useFirst: expect.any(Function),
      useGet: expect.any(Function)
    });
  });
});
