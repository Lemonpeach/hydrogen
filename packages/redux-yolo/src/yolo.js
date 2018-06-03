export class ReduxYolo {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
}

export default dispatch => new ReduxYolo(dispatch);
