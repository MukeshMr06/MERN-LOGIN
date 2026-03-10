import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './home/Signup'
import Login from './home/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Signup />}>Signup</Route> 
           <Route path='/login' element={<Login />}>Login</Route> 
           <Route path='/logout' element={<Signup />}>Logout</Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
