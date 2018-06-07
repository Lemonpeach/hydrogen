import { reducers as _reducers } from '../reducers';
import hydrogen from '../hydrogen';

import create, { reducers } from '../index';

describe('index', () => {
  test('exports', () => {
    expect(create).toBe(hydrogen);
    expect(reducers).toBe(_reducers);
  });
});
