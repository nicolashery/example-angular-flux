import {EventEmitter} from 'events';

class BaseStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.CHANGE_EVENT = 'change';
    this._register(dispatcher);
  }

  _register(dispatcher) {
    if (!this._handleAction) {
      throw new Error('Must implement _handleAction(action) method');
    }
    this.dispatchToken = dispatcher.register(this._handleAction.bind(this));
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }
}

export default BaseStore;
