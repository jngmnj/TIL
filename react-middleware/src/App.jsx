import { useState } from 'react'
import CounterContainer from './containers/CounterContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CounterContainer />
    </div>
  )
}

export default App
