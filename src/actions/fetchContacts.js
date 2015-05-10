export default function(dispatcher, api) {
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
}
