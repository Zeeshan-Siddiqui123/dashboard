import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Screens/Index'
import Account from './Screens/Account'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/' element={'Page Not Found'}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
