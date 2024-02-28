import Content2 from './Content2';
import Content3 from './Content3';
import { useState } from 'react'

function App() {
  const [show, getShow] = useState(false)

  return (
    <div style={{padding: 32}}>
      <button onClick={()=> getShow(!show)}>Toggle</button>
      {show && <Content3 />}
    </div>
  )
  
}

  

export default App;
