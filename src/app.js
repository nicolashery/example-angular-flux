import angular from 'angular';
import 'angular-new-router';

angular.module('app', ['ngNewRouter'])
  .config(['$componentLoaderProvider', setTemplatesPath])
  .controller('AppController', ['$router', AppController])
  .controller('ContactsController', require('./components/contacts'))
  .run(['$templateCache', cacheComponentTemplate('contacts', require('./components/contacts.html'))])
  .directive('contactList', require('./components/contactList'));

function setTemplatesPath($componentLoaderProvider) {
  $componentLoaderProvider.setTemplateMapping(name => `${name}.html`);
}

function cacheComponentTemplate(name, template) {
  return function($templateCache) {
    $templateCache.put(`${name}.html`, template);
  };
}

function AppController($router) {
  $router.config([
    {path: '/', redirectTo: '/contacts'},
    {path: '/contacts', component: 'contacts'}
  ]);
}
