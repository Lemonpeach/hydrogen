import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { selectors } from '@hydrogenjs/redux-hydrogen';

import { extractOptions } from './utils';

export const useHydrogen = (
  hydrogen,
  method,
  name,
  options = {}
) => {
  const {
    query, wait, cache, filter
  } = extractOptions(options);

  const shouldRequest = useSelector(
    state => selectors.shouldRequest(state, method, name, query, cache)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (wait !== true && shouldRequest === true) {
      hydrogen.service(name)[method](query)(dispatch);
    }
  }, [JSON.stringify(query), wait]);

  return useSelector(state => (
    selectors[method](state, name, query, filter)
  ), shallowEqual);
};
