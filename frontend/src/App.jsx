import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quotes from './quotes'
import Processing from './pages/Processing'
import { BrowserRouter } from 'react-router-dom';


function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <Processing/>
      </header>
    </>
  )
}

export default App
