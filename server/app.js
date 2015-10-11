import express from 'express'
import concat from 'concat-stream'

import { getSteamId, getGames, getSchemaForGame } from './steamapi'

const app = express()

const PORT = 7000
app.set('port', process.env.PORT || PORT)

app.use(express.static(__dirname + '/www/'))

// CORS since we are running webpack-dev-server
app.all('*', (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'origin, content-type, accept',
    'Access-Control-Allow-Methods': 'GET,POST'
  })
  next()
})

app.get('/api/games/:steamid', (req, res) => {
  const { steamid } = req.params

  getSteamId(steamid)
    .then(getGames)
    .then((response) => {
      const { games } = response
      games.sort((a, b) => b.playtime_forever - a.playtime_forever)
      res.json(games)
    })
    .catch((err) => res.json(err))
})

app.get('/api/game/:appid', (req, res) => {
  const { appid } = req.params
  getSchemaForGame(appid)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
