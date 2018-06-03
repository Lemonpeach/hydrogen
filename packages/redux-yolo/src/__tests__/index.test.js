import yolo from '../index';
import { ReduxYolo } from '../yolo';

describe('yolo', () => {
  test('exports a function', () => {
    const dispatch = jest.fn();
    expect(yolo(dispatch)).toBeInstanceOf(ReduxYolo);
  });

  test('constructs correctly', () => {
    const dispatch = jest.fn();
    expect(yolo(dispatch)).toHaveProperty('dispatch', dispatch);
  });
});
