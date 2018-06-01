import yolo, { ReduxYolo } from '../index';

describe('index', () => {
  test('exports a function', () => {
    const dispatch = jest.fn();
    expect(yolo(dispatch)).toBeInstanceOf(ReduxYolo);
  });

  test('constructs correctly', () => {
    const dispatch = jest.fn();
    expect(yolo(dispatch)).toHaveProperty('dispatch', dispatch);
  });
});
