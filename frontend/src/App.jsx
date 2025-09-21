import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop'
import { CartProvider } from './Components/CartContext'; 

const App = () => {
  return (
    <CartProvider> {/* Routes को CartProvider से रैप करें */}
      <div className='font-[font1]'>
        <Routes>
          <Route path='/' element = {<Shop/>} />
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App