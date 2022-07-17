import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
function App() {
  return (
    <div className="App">
      <div>
        <SportCard
          primary={true}
          daily={true}
          size="large"
        />
      </div>
      <div>
        <SportCard
          primary={false}
          daily={true}
          size="large"
        />
      </div>
      <div>
        <SportCard
          primary={true}
          daily={true} />

      </div>
      <div>
        <SportCard
          primary={false}
          daily={true} />
      </div>
    </div>
  )
}

export default App
