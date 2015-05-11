import angular from 'angular';
import 'angular-new-router';
import Dispatcher from './lib/Dispatcher';
import Db from './lib/Db';
import Api from './lib/Api';

let app = angular.module('app', ['ngNewRouter'])
  .config(['$componentLoaderProvider', setTemplatesPath])
  .controller('AppController', ['$router', AppController])
  .factory('db', () => new Db())
  .factory('api', ['db', (db) => new Api({db: db})])
  // Flux
  .factory('dispatcher', ['$timeout', ($timeout) => new Dispatcher($timeout)])
  .factory('ContactStore', ['dispatcher', createStore(require('./stores/ContactStore'))])
  .factory('actions', () => { return {}; })
  .run(['actions', 'dispatcher', 'api', addAction('fetchContacts', require('./actions/fetchContacts'))])
  .run(['actions', 'dispatcher', 'api', addAction('createContact', require('./actions/createContact'))])
  // Route handlers
  .controller('ContactsController', ['actions', 'ContactStore', require('./components/contacts')])
  .run(['$templateCache', cacheComponentTemplate('contacts', require('./components/contacts.html'))])
  // Directives
  .directive('contactList', require('./components/contactList'));

function setTemplatesPath($componentLoaderProvider) {
  $componentLoaderProvider.setTemplateMapping(name => `${name}.html`);
}

function cacheComponentTemplate(name, template) {
  return function($templateCache) {
    $templateCache.put(`${name}.html`, template);
  };
}

function createStore(Store) {
  return function(dispatcher) {
    return new Store(dispatcher);
  };
}

function addAction(name, action) {
  if (action.name) {
    throw new Error(`An action already exists with name "${name}"`);
  }
  return function(actions) {
    let rest = Array.prototype.slice.call(arguments, 1);
    actions[name] = action.apply(null, rest);
  };
}

function AppController($router) {
  $router.config([
    {path: '/', redirectTo: '/contacts'},
    {path: '/contacts', component: 'contacts'}
  ]);
}

export default app;
