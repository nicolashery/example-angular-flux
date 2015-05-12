import angular from 'angular';
import {name as dispatcher} from '../services/dispatcher';
import {name as api} from '../services/api';

export default angular.module('actions.createContact', [dispatcher, api])
  .service('createContact', ['dispatcher', 'api',
function(dispatcher, api) {
  return function createContact(contact) {
    dispatcher.dispatch({type: 'CREATE_CONTACT_START'});
    api.createContact(contact, (err, contact) => {
      if (err) {
        dispatcher.dispatch({type: 'CREATE_CONTACT_FAILURE', payload: err});
        return;
      }
      dispatcher.dispatch({type: 'CREATE_CONTACT_SUCCESS', payload: contact});
    });
  };
}]);
