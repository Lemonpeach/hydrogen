import isFunction from 'lodash/isFunction';

export const extractOptions = (options = {}) => {
  const defaults = {
    query: () => {},
    wait: () => false
  };
  if (isFunction(options)) {
    return { ...defaults, query: options };
  }
  return { ...defaults, options };
};
