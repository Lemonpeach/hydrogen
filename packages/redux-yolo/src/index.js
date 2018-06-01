import { reducer } from './reducers';

export class ReduxYolo {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.reducer = reducer;
  }
}

export default dispatch => new ReduxYolo(dispatch);
