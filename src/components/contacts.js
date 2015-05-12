import angular from 'angular';
import {name as fetchContacts} from '../actions/fetchContacts';
import {name as contactList} from './contactList';
import {name as newContact} from './newContact';

class ContactsController {
  constructor(fetchContacts) {
    this.fetchContacts = fetchContacts;
  }

  activate() {
    this.fetchData();
  }

  fetchData() {
    this.fetchContacts();
  }
}

export default angular.module('components.contacts', [fetchContacts, contactList, newContact])
  .controller('ContactsController', ['fetchContacts', ContactsController])
  .run(['$templateCache', $templateCache => {
    $templateCache.put('contacts.html', require('./contacts.html'));
  }]);
