# steam-game-lister
A simple app built with [react](https://facebook.github.io/react/), [recompose](https://github.com/acdlite/recompose), and [semantic-ui](http://semantic-ui.com/). View it [here](https://steam-game-lister.herokuapp.com/).

# Installing
You need `webpack`, and optionally `webpack-dev-server`. The [] means optional. Both the client and server side have `package.json`.

1. `npm install --global webpack [webpack-dev-server]`
2. `cd client && npm install`
3. `cd ../server/npm install`

# Running
You're going to need 2 terminals, one for `webpack` and one for the server. You can either use `webpack` or `webpack-dev-server` [preferred].

The webpack terminal 

1. `cd client`
2. `webpack-dev-server` or `webpack --watch`
3. `open localhost:8080`

The nodejs terminal

1. `cd server`
2. `node .`
3. Optionally, `nodemon .` if you want a watching node server. You need to `npm install -g nodemon` first to do this.

# Build
You need to package up the client side into the `server/www` folder, then you have a complete server side application in `server`

1. `cd client`
2. `webpack [--progress]` to build the client and copy it to `server/www`
3. `cd ../server/`
4. `node .` (the . means index.js)
5. `open localhost:7000` to check that the built result works with the server
