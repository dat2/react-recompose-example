import moment from 'moment'
import { compose, withState, mapProps } from 'recompose'


const CreateCharacter = ({ name, description, setName, setDescription, onDone, onCancel }) => (
  <div className='card'>
    <div className='content'>

        <div className='header'> Create Character </div>

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
              className='ui button'
              onClick={() => onDone({ name, description, born: moment(), children: 0, country: 'ca' })}>
              Done
            </button>

            <button
              className='ui button'
              onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className='extra content'>
        <span>
          <i className='user icon'></i>
          { 0 } Children
        </span>
    </div>
  </div>
)

const setter = (fn) => ({ target: { value }}) => fn(value)

const CreateCharacterContainer = compose(
  // state
  withState('name', 'setName', ''),
  withState('description', 'setDescription', ''),

  mapProps( ({ setName, setDescription, ...rest }) => ({
    // state changing functions
    setName: setter(setName),
    setDescription: setter(setDescription),
    ...rest
  }))
)(CreateCharacter)

export default CreateCharacterContainer
