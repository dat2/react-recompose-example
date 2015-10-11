import rp from 'request-promise'
import querystring from 'querystring'

import credentials from './credentials.json'
const { steam: { key } } = credentials

const baseUrl = (path) => `http://api.steampowered.com/${path}`
const makeQuery = (query) => querystring.stringify(Object.assign({ key }, query, { format: 'json' }))

const getGames = (steamid) =>
  rp(baseUrl(`IPlayerService/GetOwnedGames/v0001/?${ makeQuery({ steamid, include_appinfo: 1 }) }`))
    .then(JSON.parse)
    .then(({ response }) => response)

const getSchemaForGame = (appid) =>
  rp(baseUrl(`ISteamUserStats/GetSchemaForGame/v2/?${ makeQuery({ appid }) }`))
    .then(JSON.parse)

export {
  getGames,
  getSchemaForGame
}
