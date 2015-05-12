class ContactList {
  constructor($scope, ContactStore) {
    this.$scope = $scope;
    this.ContactStore = ContactStore;
    this.onStoreChange = this.setStateFromStores.bind(this);
    this.setStateFromStores();
    $scope.$connectTo(ContactStore, this.onStoreChange);
  }

  activate() {
    this.ContactStore.addChangeListener(this.onStoreChange);
  }

  deactivate() {
    this.ContactStore.removeChangeListener(this.onStoreChange);
  }

  setStateFromStores() {
    this.contacts = this.ContactStore.getContacts();
  }
}

export default function() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactList,
    controllerAs: 'vm',
    template: require('./contactList.html')
  };
}
