import compose from 'recompose/compose';

import { hydrogenize } from './hydrogenize';

export default hydrogen => ({
  find: hydrogenize.bind(undefined, hydrogen, 'find'),
  first: hydrogenize.bind(undefined, hydrogen, 'first'),
  get: hydrogenize.bind(undefined, hydrogen, 'get')
});

export { compose };
