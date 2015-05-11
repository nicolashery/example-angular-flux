class ContactsController {
  constructor(actions, ContactStore) {
    this.actions = actions;
    this.ContactStore = ContactStore;
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

  handleCreateContact() {
    this.actions.createContact({name: 'John'});
  }
}

export default ContactsController;
