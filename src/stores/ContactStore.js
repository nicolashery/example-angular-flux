import angular from 'angular';
import reduce from 'lodash/collection/reduce';
import values from 'lodash/object/values';
import BaseStore from './BaseStore';
import {name as dispatcher} from '../services/dispatcher';

class ContactStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this._contactsById = {};
  }

  _setContacts(contacts) {
    this._contactsById = reduce(contacts, (result, contact) => {
      result[contact.id] = contact;
      return result;
    }, {});
  }

  _addContact(contact) {
    this._contactsById[contact.id] = contact;
  }

  getContacts() {
    return values(this._contactsById);
  }

  getContact(id) {
    return this._contactsById[id];
  }

  _handleAction(action) {
    switch(action.type) {

      case 'FETCH_CONTACTS_SUCCESS':
        this._setContacts(action.payload);
        this._emitChange();
        break;

      case 'FETCH_CONTACT_SUCCESS':
        this._addContact(action.payload);
        this._emitChange();
        break;

      case 'CREATE_CONTACT_SUCCESS':
        this._addContact(action.payload);
        this._emitChange();
        break;

      default:
        // Do nothing
    }
  }
}

export default angular.module('stores.ContactStore', [dispatcher])
  .factory('ContactStore', ['dispatcher', dispatcher => new ContactStore(dispatcher)]);
