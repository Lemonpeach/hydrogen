import { getType, stages, isQuery } from './actions';

const createAction = (verb, name, stage, { data, error } = {}) => ({
  type: getType(verb, name, stage),
  verb,
  name,
  creator: '@redux-yolo',
  data,
  error
});

export const bindActionCreators = (verb, name) => ({
  pending() {
    return createAction(verb, name, stages.PENDING);
  },
  fulfilled(data, query) {
    const action = createAction(verb, name, stages.FULFILLED, { data });
    if (isQuery(verb)) {
      action.query = query;
    }
    return action;
  },
  rejected(error) {
    return createAction(verb, name, stages.REJECTED, { error });
  }
});
