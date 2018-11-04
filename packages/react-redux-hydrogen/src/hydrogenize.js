import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import isEqual from 'lodash/isEqual';

import { selectors } from '@hydrogenjs/redux-hydrogen';

import { extractOptions } from './utils';

export const hydrogenize = (
  hydrogen,
  method,
  name,
  injectProp,
  options = {}
) => compose( // eslint-disable-line
  connect(
    (state, props) => {
      const { query, wait, filter } = extractOptions(options);

      if (wait(props)) {
        return { [injectProp]: null, hydrogenMeta: { shouldRequest: false } };
      }

      const params = query(props);
      return {
        [injectProp]: selectors[method](state, name, params, filter),
        hydrogenMeta: {
          shouldRequest: selectors.shouldRequest(state, method, name, params)
        }
      };
    },
    null,
    null,
    {
      areStatePropsEqual: isEqual,
      areMergedPropsEqual: isEqual
    }
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { query, wait } = extractOptions(options);
      if (
        nextProps.hydrogenMeta.shouldRequest && (
          (wait(this.props) && !wait(nextProps)) ||
          !isEqual(query(this.props), query(nextProps))
        )
      ) {
        hydrogen.service(name)[method](query(nextProps))(nextProps.dispatch);
      }
    },
    componentDidMount() {
      const { query } = extractOptions(options);
      if (this.props.hydrogenMeta.shouldRequest) {
        hydrogen.service(name)[method](query(this.props))(this.props.dispatch);
      }
    }
  })
);
