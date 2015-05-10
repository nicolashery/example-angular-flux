class ContactsController {
  constructor() {
    this.contacts = window.db.getContacts().toJS();
  }
}

export default ContactsController;
