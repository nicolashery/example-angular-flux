import BaseStore from './BaseStore';

class CreateContactStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.working = false;
    this.error = null;
  }

  _start() {
    this.working = true;
    this.error = null;
  }

  _failure(error) {
    this.working = false;
    this.error = error;
  }

  _success() {
    this.working = false;
    this.error = null;
  }

  isCreatingContact() {
    return this.working;
  }

  getCreateContactError() {
    return this.error;
  }

  _handleAction(action) {
    switch(action.type) {

      case 'CREATE_CONTACT_START':
        this._start();
        this._emitChange();
        break;

      case 'CREATE_CONTACT_FAILURE':
        this._failure(action.payload);
        this._emitChange();
        break;

      case 'CREATE_CONTACT_SUCCESS':
        this._success();
        this._emitChange();
        break;

      default:
        // Do nothing
    }
  }
}

export default CreateContactStore;
