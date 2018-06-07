import isNil from 'lodash/isNil';

import { reducer as dataReducer } from './data-reducer';

export const reducer = (state = {}, action) => {
  const { creator, name } = action;

  if (isNil(creator) || creator !== '@redux-hydrogen') {
    return state;
  }

  return { ...state, [name]: dataReducer(state[name], action) };
};
