import { useHydrogen } from './use-hydrogen';

export default hydrogen => ({
  useFind: (...args) => useHydrogen(hydrogen, 'find', ...args),
  useFirst: (...args) => useHydrogen(hydrogen, 'first', ...args),
  useGet: (...args) => useHydrogen(hydrogen, 'get', ...args)
});
