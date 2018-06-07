export const stages = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

export const verbs = {
  GET: 'get',
  FIND: 'find',
  FIRST: 'first',
  CREATE: 'create',
  UPDATE: 'update',
  PATCH: 'patch',
  REMOVE: 'remove',
  RESET: 'reset'
};

export const isType = (type, part) => type.toLowerCase().includes(part.toLowerCase());
export const isPending = type => isType(type, stages.PENDING);
export const isFulfilled = type => isType(type, stages.FULFILLED);
export const isRejected = type => isType(type, stages.REJECTED);
export const isRemove = type => isType(type, verbs.REMOVE);
export const isReset = type => isType(type, verbs.RESET);
export const isQuery = type => isType(type, verbs.GET) || isType(type, verbs.FIND) || isType(type, verbs.FIRST);

export const getType = (verb, name, stage) =>
  `@redux-yolo/${verb.toUpperCase()}_${name.toUpperCase()}_${stage.toUpperCase()}`;
