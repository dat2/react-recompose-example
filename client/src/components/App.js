import { compose, withState, mapProps } from 'recompose'

import GameList from './GameList'

const App = ({ userId, setUserId, games, loading }) => (
  <div className='ui container'>
    <h1 className='ui center aligned icon header'>
      <i className='steam square icon' />
      My Steam Games
    </h1>
    <div className='ui divider' />

    <div className='ui form'>
      <div className='ui left icon input'>
        <input type='text' placeholder='User id' onChange={setUserId} value={userId} />
        <i className='users icon'/>
      </div>
      <div className='ui right'>
        <p> Go to your profile [http://steamcommunity.com/id/&lt;userid&gt;] and copy paste &lt;userid&gt; into the textbox</p>
      </div>
    </div>

    <div className='ui divider' />
    <GameList games={games} loading={loading}/>
  </div>
)

const fetchGamesAPI = (steamid) =>
  fetch(`/api/games/${steamid}`)
    .then(games => games.json())

const AppContainer = compose(
  withState('userId', 'setUserId', ''),
  withState('games', 'setGames', []),
  withState('loading', 'setLoading', false),

  mapProps( ({ setUserId, setGames, setLoading, ...rest }) => ({
    setUserId: ({ target: { value }}) => {
      setUserId(value)
      setLoading(true)

      fetchGamesAPI(value)
        .then(setGames)
        .then(() => setLoading(false))
        .catch((err) => setLoading(false) && setGames([]))
    },
    ...rest
  }))
)(App)

export default AppContainer
