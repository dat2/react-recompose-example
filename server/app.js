import express from 'express'
import concat from 'concat-stream'

const PORT = 7000

const app = express()

// the local characters array
const characters = [
  { name: 'Fake', description: 'This guy is so fake', born: new Date(2014, 11, 17), children: 20, country: 'ca' },
  { name: 'Bob', description: 'Dole', born: new Date(2015, 1, 27), children: 5, country: 'de' },
  { name: 'Dan Harmon', description: 'One of the creators of rick and morty', born: new Date(2012, 3, 12), children: 6, country: 'it' }
]

// CORS since we are running webpack-dev-server
app.all('*', (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'origin, content-type, accept',
    'Access-Control-Allow-Methods': 'GET,POST'
  })
  next()
})

app.get('/characters', (req, res) => {
  console.log('fetching characters')
  res.json(characters)
})

app.post('/character/add', (req, res) => {
  req.pipe(concat((body) => {
      Promise.resolve(body.toString())
        .then(JSON.parse)
        .then((character) => {
          console.log(`Adding character: ${JSON.stringify(character)}`)
          characters.push(character)
          res.end('')
        })
        .catch(err => console.error(err))
  }))
})

app.post('/character/delete/:idx', (req, res) => {
  const index = parseInt(req.params.idx)
  characters.splice(index, 1)
  console.log(`Deleting character at ${index}`)
  res.end('')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
