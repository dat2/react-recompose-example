import rp from 'request-promise'
import querystring from 'querystring'
import { parseString } from 'xml2js'

// meh
const key = 'D6962E7BE8E67C3F9C47586EDB9A9A8E'

const baseUrl = (path) => `http://api.steampowered.com/${path}`
const makeQuery = (query) => querystring.stringify(Object.assign({ key }, query, { format: 'json' }))

const getGames = (steamid) =>
  rp(baseUrl(`IPlayerService/GetOwnedGames/v0001/?${ makeQuery({ steamid, include_appinfo: 1 }) }`))
    .then(JSON.parse)
    .then(({ response }) => response)

const getSchemaForGame = (appid) =>
  rp(baseUrl(`ISteamUserStats/GetSchemaForGame/v2/?${ makeQuery({ appid }) }`))
    .then(JSON.parse)

// convert xml2js to promise
const parseXml = (s) => new Promise((resolve, reject) => {
  parseString(s, (err, result) => {
    if(err) { reject(err) }
      else { resolve(result) }
  })
})

// locate the steam id so it's much easier to deal with
const getSteamId = (sid) => rp(`http://steamcommunity.com/id/${sid}/?xml=1`)
  .then(parseXml)
  .then( ({ profile: { steamID64 }}) => steamID64 )

export {
  getGames,
  getSteamId,
  getSchemaForGame
}
