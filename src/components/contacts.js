class ContactsController {
  constructor(actions) {
    this.actions = actions;
  }

  activate() {
    this.fetchData();
  }

  fetchData() {
    this.actions.fetchContacts();
  }
}

export default ContactsController;
