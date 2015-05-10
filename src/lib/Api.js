class Api {
  constructor({db, getToken}) {
    this._db = db;
    this._getToken = getToken || function noop() {};
  }

  signIn(username, password, cb) {
    setTimeout(() => {
      if (username === 'joe@example.com' &&
          password === 'password1') {
        const token = this._db.createSession();
        return cb(null, {token: token});
      } else {
        return cb({
          error: {
            name: 'BadCredentials',
            message: 'Wrong username or password'
          }
        });
      }
    }, 1000);
  }

  signOut(cb) {
    setTimeout(() => {
      const token = this._getToken();
      if (token) {
        this._db.revokeSession(token);
      }
      return cb();
    }, 1000);
  }

  _validateToken(token, cb) {
    if (!(token && this._db.checkSession(token))) {
      return cb({
        error: {
          name: 'InvalidToken',
          message: 'Must provide valid auth token in Authorization header'
        }
      });
    }
    cb();
  }

  getSession(token, cb) {
    this._validateToken(token, err => {
      if (err) {
        return cb(err);
      }
      return cb(null, token);
    });
  }

  _contactNotFoundResponse() {
    return {
      error: {
        name: 'ContactNotFound',
        message: 'No contact found for given id'
      }
    };
  }

  getContacts(cb) {
    cb(null, this._db.getContacts());
  }

  getContact(id, cb) {
    let contact = this._db.getContact(id);
    if (!contact) {
      return cb(this._contactNotFoundResponse());
    }
    return cb(null, contact);
  }

  createContact(contact, cb) {
    setTimeout(() => {
      contact = this._db.addContact(contact);
      cb(null, contact);
    }, 1000);
  }

  getMessages(contactId, cb) {
    setTimeout(() => {
      let messages = this._db.getMessagesForContact(contactId);
      if (!messages) {
        return cb(this._contactNotFoundResponse());
      }
      cb(null, messages);
    }, 1000);
  }
}

export default Api;
