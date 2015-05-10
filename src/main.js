import Immutable from 'immutable';
import Db from './lib/Db';

let db = new Db();

db.addContact(Immutable.fromJS({name: 'Bob'}));
db.addContact(Immutable.fromJS({name: 'Mary'}));
db.addContact(Immutable.fromJS({name: 'Max'}));
db._state = db._state.setIn(['contacts', '1', 'messages'], Immutable.fromJS([
  {to: true, content: 'Hey Bob!'},
  {from: true, content: 'Howdy :)'},
  {from: true, content: 'How\'s everything?'},
  {to: true, content: 'Doing good, thanks!'}
]));

window.db = db;

require('./app');
