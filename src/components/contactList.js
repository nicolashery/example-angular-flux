class ContactList {
  constructor() {}
}

export default function() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      contacts: '='
    },
    controller: ContactList,
    controllerAs: 'vm',
    template: require('./contactList.html')
  };
}
