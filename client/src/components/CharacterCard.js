import moment from 'moment'
import { pure } from 'recompose'

import wireframe from '../images/wireframe.png'

const CharacterCard = pure(({ name, description, born, children, onDelete }) => (
  <div className='card'>
    <div className='image'>
      <img src={wireframe}/>
    </div>
    <div className='content'>
      <a className='header'> {name} </a>
      <div className='meta'>
          Born on { moment(born).format('DD/MM/YYYY') }
      </div>
      <div className='description'> {description} </div>
    </div>
    <div className='extra content'>
      <span className='right floated'>
        <button className='ui button' onClick={onDelete}>X</button>
      </span>
      <span>
        <i className='user icon'></i>
        {children} Children
      </span>
    </div>
  </div>
))

export default CharacterCard
