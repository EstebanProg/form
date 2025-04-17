import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormExample from './Pages/forms'

function App() {
  return (
    <BrowserRouter>
        <Routes>
           <Route path='/principal' element={<FormExample/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
