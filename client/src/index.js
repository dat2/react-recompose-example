import './semantic/dist/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

import CharacterList from './components/CharacterList'

const App = () => (
  <div> <CharacterList/> </div>
)

ReactDOM.render(<App/>, document.getElementById('content'));
