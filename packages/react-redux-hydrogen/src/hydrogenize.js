import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import isEqual from 'lodash/isEqual';

import { selectors } from '@hydrogenjs/redux-hydrogen';

export const hydrogenize = (
  hydrogen,
  method,
  name,
  injectProp,
  propsToParams = () => {},
  shouldRequest = () => true
) => compose( // eslint-disable-line
  connect(
    (state, props) => {
      const params = propsToParams(props);
      return {
        [injectProp]: selectors[method](state, name, params),
        hydrogenMeta: {
          shouldRequest: selectors.shouldRequest(state, method, name, params) && shouldRequest(props)
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
      if (
        nextProps.hydrogenMeta.shouldRequest &&
        !isEqual(propsToParams(this.props), propsToParams(nextProps))
      ) {
        hydrogen.service(name)[method](propsToParams(nextProps))(nextProps.dispatch);
      }
    },
    componentDidMount() {
      if (this.props.hydrogenMeta.shouldRequest) {
        hydrogen.service(name)[method](propsToParams(this.props))(this.props.dispatch);
      }
    }
  })
);
