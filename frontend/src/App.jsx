import React from 'react'
import Home from './components/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider'

function App() {

  const [authUser] = useAuth(); // Assuming useAuth is imported from AuthProvider

  return (
    <div >
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
