import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop'

const App = () => {
  return (
    <div className='font-[font1]'>
      <Routes>
        <Route path='/' element = {<Shop/>} />
      </Routes>
    </div>
  )
}

export default App