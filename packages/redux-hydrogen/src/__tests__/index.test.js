import { reducers as _reducers } from '../reducers';
import hydrogen from '../hydrogen';
import * as actions from '../actions';

import create, { reducers, bindActionCreators, verbs } from '../index';

describe('index', () => {
  test('exports', () => {
    expect(create).toBe(hydrogen);
    expect(reducers).toBe(_reducers);
    expect(bindActionCreators).toBe(actions.bindActionCreators);
    expect(verbs).toBe(actions.verbs);
  });
});
