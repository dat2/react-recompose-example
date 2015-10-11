import moment from 'moment'
import { pure } from 'recompose'

import wireframe from '../images/wireframe.png'

const getPlaytime = (playtime_forever) => {
  const duration = moment.duration(playtime_forever, 'minutes')

  const days = duration.days() > 0 ? `${duration.days()}d ` : ''
  const hours = duration.hours() > 0 ? `${duration.hours()}h ` : ''

  return `${days}${hours}${duration.minutes()}m`
}

const GameCard = pure(({ appid, name, description, playtime_forever, img_logo_url }) => (
  <div className='clickable card' onClick={() => console.log('clicked')}>
    <div className='image'>
      <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_logo_url}.jpg`}/>
    </div>
    <div className='content'>
      <div className='header'> {name} </div>
      <div className='meta'>
        <span>
          <i className='gamepad icon'></i>
          {  getPlaytime(playtime_forever) }
        </span>
      </div>
      <div className='description'>
        <a href={`steam://run/${appid}`}> Play Now! </a>
      </div>
    </div>
  </div>
))

export default GameCard
