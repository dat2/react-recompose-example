import express from 'express'
import concat from 'concat-stream'

import { getGames, getSchemaForGame } from './steamapi'


const app = express()

// CORS since we are running webpack-dev-server
app.all('*', (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'origin, content-type, accept',
    'Access-Control-Allow-Methods': 'GET,POST'
  })
  next()
})

app.get('/games/:steamid', (req, res) => {
  const { steamid } = req.params
  getGames(steamid)
    .then((response) => {
      const { games } = response
      games.sort((a, b) => b.playtime_forever - a.playtime_forever)
      res.json(games)
    })
    .catch((err) => res.json(err))
})

app.get('/game/:appid', (req, res) => {
  const { appid } = req.params
  getSchemaForGame(appid)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

const PORT = 7000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
