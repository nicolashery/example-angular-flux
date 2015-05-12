import angular from 'angular';
import {name as dispatcher} from '../services/dispatcher';
import {name as api} from '../services/api';

export default angular.module('actions.fetchContacts', [dispatcher, api])
  .service('fetchContacts', ['dispatcher', 'api',
function(dispatcher, api) {
  return function fetchContacts() {
    dispatcher.dispatch({type: 'FETCH_CONTACTS_START'});
    api.getContacts((err, contacts) => {
      if (err) {
        dispatcher.dispatch({type: 'FETCH_CONTACTS_FAILURE', payload: err});
        return;
      }
      dispatcher.dispatch({type: 'FETCH_CONTACTS_SUCCESS', payload: contacts});
    });
  };
}]);
