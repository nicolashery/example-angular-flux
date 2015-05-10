class ContactListController {
  constructor() {}
}

export default function() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      contacts: '=',
    },
    controller: ContactListController,
    controllerAs: 'vm',
    template: require('./contactList.html')
  };
}
