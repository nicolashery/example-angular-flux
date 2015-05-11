import flux from 'flux';

// Monkey-patch dispatcher to insert into Angular's "digest" cycle
class Dispatcher extends flux.Dispatcher {
  constructor($timeout) {
    super();
    this._originalDispatch = this.dispatch;
    this.dispatch = (action) => {
      $timeout(() => {
        this._originalDispatch.call(this, action);
      });
    };
  }
}

export default Dispatcher;
