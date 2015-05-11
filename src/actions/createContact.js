export default function(dispatcher, api) {
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
}
