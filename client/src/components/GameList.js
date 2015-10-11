import { pure } from 'recompose'

import GameCard from './GameCard'

const GameList = pure(({ games, loading }) => (
  <div>
    {
      loading ?
        ( <h2 className='ui center aligned icon header'>
            <i className='spinner loading icon'></i>
            Loading...
          </h2>
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
