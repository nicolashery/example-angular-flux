import angular from 'angular';

class AboutController {
  constructor() {}
}

export default angular.module('components.about', [])
  .controller('AboutController', AboutController)
  .run(['$templateCache', $templateCache => {
    $templateCache.put('about.html', require('./about.html'));
  }]);
