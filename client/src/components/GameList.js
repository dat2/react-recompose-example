import { pure } from 'recompose'

import GameCard from './GameCard'

const GameList = pure(({ games, loading }) => (
  <div>
    {
      loading ?
        ( <div className='ui center aligned basic segment'>
            <i className='huge spinner loading icon'></i>
            Loading...
          </div>
        ) :
        (
          <div className='ui five doubling stackable cards'>
            { games.map((props, i) => <GameCard key={i} {...props} />) }
          </div>
        )
    }
  </div>
))

export default GameList
