import { compose, withState, mapProps, lifecycle } from 'recompose'

import CreateCharacter from './CreateCharacter'
import CharacterCard from './CharacterCard'

const CharacterList = ({ characters, addCharacter, showCreator, toggleShowCreator, deleteCharacter}) => (
  <div>
    <button className='ui button' onClick={toggleShowCreator}>{ showCreator ? '-' : '+' }</button>
    <div className='ui cards vertical'>
      {
        characters.map(
          (props, i) => <CharacterCard key={i} onDelete={() => deleteCharacter(i)} {...props} />
        )
      }

      {
        showCreator ?
          <CreateCharacter onDone={addCharacter} onCancel={toggleShowCreator} /> :
          <div />
      }
    </div>
  </div>
)

const fetchCharactersAPI = () =>
  fetch('http://localhost:7000/characters')
    .then(characters => characters.json())

const createCharacterAPI = (character) =>
  fetch('http://localhost:7000/character/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(character)
  })

const deleteCharacterAPI = (idx) =>
  fetch(`http://localhost:7000/character/delete/${idx}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

const CharacterListContainer = compose(
  // state
  withState('characters', 'setCharacters', []),
  withState('showCreator', 'setShowCreator', false),

  mapProps( ({ setCharacters, setShowCreator, ...rest }) => ({
    // state changing functions
    addCharacter: (c) => {
      setCharacters(cs => cs.concat([c]))
      setShowCreator(false)
      createCharacterAPI(c)
        .then((response) => console.log(response, response.body))
    },
    deleteCharacter: (i) => setCharacters(cs => {
      const rtn = cs.slice()
      deleteCharacterAPI(i)
      rtn.splice(i, 1)
      return rtn
    }),
    // needed so lifecycle works correctly
    setCharacters,

    toggleShowCreator: () => setShowCreator(sc => !sc),
    ...rest
  })),

  // setup and teardown functions
  lifecycle(
    ({ props: { setCharacters } }) => {
      // fetch initial data
        fetchCharactersAPI()
          .then(setCharacters)
    },
    () => {}
  ),
)(CharacterList)

export default CharacterListContainer
