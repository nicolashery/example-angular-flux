class ContactsController {
  constructor($rootScope, actions, ContactStore) {
    this.actions = actions;
    this.ContactStore = ContactStore;
    // SHAME: This feels like a major hack, must be doing something wrong
    this.onStoreChange = () => {
      setTimeout(() => {
        $rootScope.$apply(() => {
          this.setStateFromStores();
        });
      });
    };
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
