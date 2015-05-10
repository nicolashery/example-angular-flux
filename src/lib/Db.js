import Immutable from 'immutable';

class Db {
  constructor() {
    this._state = Immutable.fromJS({
      sessions: {},
      contacts: {}
    });
    this._id = 0;
  }

  _makeId() {
    this._id = this._id + 1;
    return this._id + '';
  }

  createSession() {
    const token = this._makeId();
    this._state = this._state.setIn(['sessions', token], true);
    return token;
  }

  checkSession(token) {
    return this._state.getIn(['sessions', token], false);
  }

  revokeSession(token) {
    if (!this._state.getIn(['sessions', token])) {
      return null;
    }
    this._state = this._state.removeIn(['sessions', token]);
    return true;
  }

  _contactResult(contact) {
    return contact.remove('messages');
  }

  getContacts() {
    return this._state.get('contacts')
      .map(this._contactResult.bind(this))
      .toList();
  }

  addContact(contact) {
    const id = this._makeId();
    contact = contact.merge(Immutable.fromJS({
      id: id,
      messages: []
    }));
    this._state = this._state.setIn(['contacts', id], contact);
    return this._contactResult(contact);
  }

  getContact(id) {
    let contact = this._state.getIn(['contacts', id]);
    if (!contact) {
      return null;
    }
    return this._contactResult(contact);
  }

  updateContact(id, updates) {
    let contact = this._state.getIn(['contacts', id]);
    if (!contact) {
      return null;
    }
    contact = contact.merge(updates);
    this._state = this._state.setIn(['contacts', id], contact);
    return this._contactResult(contact);
  }

  deleteContact(id) {
    if (!this._state.getIn(['contacts', id])) {
      return null;
    }
    this._state = this._state.removeIn(['contacts', id]);
    return true;
  }

  getMessagesForContact(contactId) {
    let contact = this._state.getIn(['contacts', contactId]);
    if (!contact) {
      return null;
    }
    return contact.get('messages');
  }

  addMessageForContact(contactId, message) {
    message = message.set('to', true);
    this._state = this._state.updateIn(['contacts', contactId, 'messages'],
      messages => messages.push(message)
    );
    return message.delete('to');
  }
}

export default Db;
