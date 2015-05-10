class ContactsController {
  constructor(actions, ContactStore) {
    this.actions = actions;
    this.ContactStore = ContactStore;
    this.setStateFromStores = this.setStateFromStores.bind(this);
    this.setStateFromStores();
  }

  activate() {
    this.ContactStore.addChangeListener(this.setStateFromStores);
    this.fetchData();
  }

  deactivate() {
    this.ContactStore.removeChangeListener(this.setStateFromStores);
  }

  setStateFromStores() {
    // TODO: this doesn't re-render the view when contacts get updated
    this.contacts = this.ContactStore.getContacts();
  }

  fetchData() {
    this.actions.fetchContacts();
  }
}

export default ContactsController;
