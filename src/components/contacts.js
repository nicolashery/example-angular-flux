class ContactsController {
  constructor(actions, ContactStore, CreateContactStore) {
    this.actions = actions;
    this.ContactStore = ContactStore;
    this.CreateContactStore = CreateContactStore;
    this.onStoreChange = this.setStateFromStores.bind(this);
    this.setStateFromStores();
  }

  activate() {
    this.ContactStore.addChangeListener(this.onStoreChange);
    this.fetchData();
  }

  deactivate() {
    this.ContactStore.removeChangeListener(this.onStoreChange);
  }

  setStateFromStores() {
    this.contacts = this.ContactStore.getContacts();
  }

  fetchData() {
    this.actions.fetchContacts();
  }
}

export default ContactsController;
