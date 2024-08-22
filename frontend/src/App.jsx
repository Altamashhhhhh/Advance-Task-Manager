import React from 'react'
import Tasklist from './components/Tasklist'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import CreateTask from './components/CreateTask'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Tasklist />} />
      <Route path="/create" element={<CreateTask />} />
    </Routes>
  )
}

export default App
