export class ReduxYolo {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.reducers = {};
  }
}

export default dispatch => new ReduxYolo(dispatch);
