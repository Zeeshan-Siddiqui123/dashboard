import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Screens/Index'
import Account from './Screens/Account'
import Navbar from './Components/Header'
import UserProvider from './Screens/UserContext'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/' element={'Page Not Found'}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
