import Content from './Content';
import { useState } from 'react'

function App() {
  const [show, getShow] = useState(false)

  return (
    <div style={{padding: 32}}>
      <button onClick={()=> getShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  )
  
}

  

export default App;
