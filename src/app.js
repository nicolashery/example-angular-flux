import angular from 'angular';
import 'angular-new-router';
import {name as Contacts} from './components/contacts';
import {name as About} from './components/about';

let app = angular.module('app', [
    'ngNewRouter',
    Contacts,
    About
  ])
  .config(['$componentLoaderProvider', setTemplatesPath])
  .controller('AppController', ['$router', AppController]);

function setTemplatesPath($componentLoaderProvider) {
  $componentLoaderProvider.setTemplateMapping(name => `${name}.html`);
}

// Extend scopes with $connectTo store
// https://github.com/christianalfoni/flux-angular
app.run(['$rootScope', ($rootScope) => {
  $rootScope.constructor.prototype.$connectTo = function (store, cb) {
    store.addChangeListener(cb);

    // Remove any listeners to the store when local scope is destroyed (GC)
    this.$on('$destroy', function() {
      store.removeChangeListener(cb);
    });
  };
}]);

function AppController($router) {
  $router.config([
    {path: '/', redirectTo: '/contacts'},
    {path: '/contacts', component: 'contacts'},
    {path: '/about', component: 'about'}
  ]);
}

export default app;
