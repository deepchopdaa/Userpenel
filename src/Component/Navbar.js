import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './Login'
import Register from './Register'
const Navbar = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>} ></Route>
            <Route path='/register' element={<Register/>} ></Route>
        </Routes>
    </>
  )
}

export default Navbar
