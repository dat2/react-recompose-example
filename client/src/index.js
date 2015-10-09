import './semantic/dist/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import { compose, withState, mapProps, pure, lifecycle } from 'recompose'

import wireframe from './images/wireframe.png'

const ContactCard = pure(({ name, description, joined, friends, country, onDelete }) => (
  <div className='card'>
    <div className='image'>
      <img src={wireframe}/>
    </div>
    <div className='content'>
      <a className='header'> {name} </a>
      <div className='meta'>
          Joined in { moment(joined).format('YYYY') }
      </div>
      <div className='description'> {description} </div>
    </div>
    <div className='extra content'>
      <span className='right floated'>
        <i className={country + ' flag'} />
      </span>
      <span>
        <i className='user icon'></i>
        {friends} Friends
      </span>
    </div>
  </div>
))

const CreateNewContact = ({ name, description, setName, setDescription, onDone }) => (
  <div className='card'>
    <div className='content'>

        <div className='header'> Create Contact </div>

        <div className='description'>
          <div className='ui form'>
            <div className='field'>
              <label>Name</label>
              <input type='text' value={name} onChange={setName}/>
            </div>

            <div className='field'>
              <label>Description</label>
              <textarea value={description} rows={4} onChange={setDescription} />
            </div>

            <button
              className='ui button' type='submit'
              onClick={() => onDone({ name, description, joined: moment(), friends: 0, country: 'ca' })}>
              Done
            </button>
          </div>
        </div>
      </div>
      <div className='extra content'>
        <span>
          <i className='user icon'></i>
          { 0 } Friends
        </span>
    </div>
  </div>
)

const setter = (fn) => ({ target: { value }}) => fn(value)

const CreateNewContactContainer = compose(
  // state
  withState('name', 'setName', ''),
  withState('description', 'setDescription', ''),

  mapProps( ({ setName, setDescription, ...rest }) => ({
    // state changing functions
    setName: setter(setName),
    setDescription: setter(setDescription),
    ...rest
  }))
)(CreateNewContact);

const ContactList = ({ contacts, addContact, showCreate, openCreator, deleteContact}) => (
  <div>
    <button className='ui button' onClick={openCreator}>{ showCreate ? '-' : '+' }</button>
    <div className='ui cards vertical'>
      { contacts.map((props, i) => <ContactCard key={i} onDelete={() => deleteContact(i)} {...props}/>) }

      { showCreate ?
        <CreateNewContactContainer onDone={addContact} /> :
        <div />
      }
    </div>
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

    openCreator: () => setShowCreate(sc => !sc),
    ...rest
  })),

  // setup and teardown functions
  lifecycle(
    ({ props: { loadContacts } }) => {
      // fetch initial data
      fetch('http://localhost:7000/contacts')
        .then(contacts => contacts.json())
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
