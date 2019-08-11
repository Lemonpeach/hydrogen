export const extractOptions = (options = {}) => {
  const defaults = {
    wait: false,
    cache: true
  };
  return { ...defaults, ...options };
};
