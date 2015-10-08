import express from 'express'
import concat from 'concat-stream'

const PORT = 7000

const app = express()

app.all('*', (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'origin, content-type, accept',
    'Access-Control-Allow-Methods': 'GET,POST'
  })
  next()
})

app.get('/contacts', (req, res) => {
   res.json([
    { name: 'Fake', description: 'This guy is so fake' },
    { name: 'Bob', description: 'Dole' },
    { name: 'Dan Harmon', description: 'One of the creators of rick and morty' }
  ])
})

app.post('/contacts/add', (req, res) => {
  req.pipe(concat((body) => {
      Promise.resolve(body.toString())
        .then(JSON.parse)
        .then((contact) => {
          console.log(contact)
          res.send('hello world')
        })
        .catch(err => console.error(err))
  }))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
