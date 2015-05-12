import angular from 'angular';
import {name as createContact} from '../actions/createContact';
import {name as CreateContactStore} from '../stores/CreateContactStore';

class NewContact {
  constructor($scope, createContact, CreateContactStore) {
    this.$scope = $scope;
    this.createContact = createContact;
    this.CreateContactStore = CreateContactStore;
    this.onStoreChange = this.setStateFromStores.bind(this);
    this.setStateFromStores();
    $scope.$connectTo(CreateContactStore, this.onStoreChange);
  }

  setStateFromStores() {
    this.isCreatingContact = this.CreateContactStore.isCreatingContact();
    this.error = this.CreateContactStore.getCreateContactError();
  }

  buttonText() {
    if (this.isCreatingContact) {
      return 'Creating...';
    } else {
      return 'Create';
    }
  }

  buttonIsDisabled() {
    return this.isCreatingContact;
  }

  handleSubmit(name) {
    if (!(name && name.length)) {
      return;
    }
    this.$scope.name = '';
    this.createContact({name: name});
  }
}

export default angular.module('components.newContact', [createContact, CreateContactStore])
  .directive('newContact', ['createContact', 'CreateContactStore',
function() {
  return {
    restrict: 'E',
    scope: {},
    controller: NewContact,
    controllerAs: 'vm',
    template: require('./newContact.html')
  };
}]);
