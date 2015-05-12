class NewContact {
  constructor($scope, actions, CreateContactStore) {
    this.$scope = $scope;
    this.actions = actions;
    this.CreateContactStore = CreateContactStore;
    this.onStoreChange = this.setStateFromStores.bind(this);
    $scope.$connectTo(CreateContactStore, this.onStoreChange);
    this.setStateFromStores();
  }

  setStateFromStores() {
    this.isCreatingContact = this.CreateContactStore.isCreatingContact();
    this.error = this.CreateContactStore.getCreateContactError();
  }

  handleSubmit(name) {
    if (!(name && name.length)) {
      return;
    }
    this.$scope.name = '';
    this.actions.createContact({name: name});
  }
}

export default function() {
  return {
    restrict: 'E',
    scope: {},
    controller: NewContact,
    controllerAs: 'vm',
    template: require('./newContact.html')
  };
}
