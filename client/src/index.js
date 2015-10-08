import React from 'react'
import ReactDOM from 'react-dom'

import { compose, withState, mapProps, pure, lifecycle } from 'recompose';

const ContactCard = pure(({ name, description, onDelete }) => (
  <div style={{ border: '1px solid black' }}>
    <button onClick={onDelete}>X</button>
    <div> <p>Name: {name}</p> </div>
    <div> <p>{description}</p> </div>
  </div> 
))

const CreateNewContact = ({ name, description, changeName, changeDescription, onDone }) => (
  <div className="card">
    <div> <p>Name: <input value={name} onChange={changeName}/></p> </div>
    <div> <p>Description: <input value={description} onChange={changeDescription}/></p> </div>
    <button onClick={() => onDone({ name, description })}>Done</button>
  </div> 
)

const setter = (fn) => ({ target: { value }}) => fn(value)

const CreateNewContactContainer = compose(
  // state
  withState('name', 'setName', ''),
  withState('description', 'setDescription', ''),
  
  mapProps( ({ setName, setDescription, ...rest }) => ({
    // state changing functions
    changeName: setter(setName),
    changeDescription: setter(setDescription),

    ...rest
  }))
)(CreateNewContact);

const ContactList = ({ contacts, addContact, showCreate, create, deleteContact}) => (
  <div>
    <button onClick={create}>{ showCreate ? '-' : '+' }</button>
    { contacts.map((props, i) => <ContactCard key={i} onDelete={() => deleteContact(i)} {...props}/>) }
    { showCreate ?
      <CreateNewContactContainer onDone={addContact} /> :
      <div/>
    }
  </div>
)

const ContactListContainer = compose(
  // state
  withState('contacts', 'setContacts', []),
  withState('showCreate', 'setShowCreate', false),

  mapProps( ({ setContacts, setShowCreate, ...rest }) => ({
    // state changing functions
    addContact: (c) => {
      setContacts(cs => cs.concat([c]))
      setShowCreate(false)

      fetch('http://localhost:7000/contacts/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(c)
      }).then((response) => console.log(response, response.body))
    },
    deleteContact: (i) => setContacts(cs => {
      const rtn = cs.slice()
      rtn.splice(i, 1)
      return rtn
    }),
    // needed so lifecycle works correctly
    loadContacts: (cs) => setContacts(cs),

    create: () => setShowCreate(sc => !sc),
    ...rest
  })),

  // setup and teardown functions
  lifecycle(
    ({ props: { loadContacts } }) => {
      // fetch initial data
      fetch('http://localhost:7000/contacts')
        .then((contacts) => contacts.json())
        .then(loadContacts)
        .catch((err) => console.error(err))
    },
    () => {}
  ),
)(ContactList)

const App = () => (
  <div> <ContactListContainer/> </div>
)

ReactDOM.render(<App/>, document.getElementById('content'));
