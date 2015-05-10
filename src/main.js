import Immutable from 'immutable';
import app from './app';

// Bootstrap some data
app.run(['db', (db) => {
  db.addContact(Immutable.fromJS({name: 'Bob'}));
  db.addContact(Immutable.fromJS({name: 'Mary'}));
  db.addContact(Immutable.fromJS({name: 'Max'}));
  db._state = db._state.setIn(['contacts', '1', 'messages'], Immutable.fromJS([
    {to: true, content: 'Hey Bob!'},
    {from: true, content: 'Howdy :)'},
    {from: true, content: 'How\'s everything?'},
    {to: true, content: 'Doing good, thanks!'}
  ]));
}]);

// Add some debugging
app.run(['dispatcher', (dispatcher) => {
  window.dispatcher = dispatcher;
  dispatcher.register(console.log.bind(console));
}]);
