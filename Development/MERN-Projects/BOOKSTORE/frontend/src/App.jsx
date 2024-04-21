import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook' 
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import POSPage from './pages/POSPage'
import './App.css'
import Header from './components/Header'


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Header />
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/book/create' element={<CreateBook/>} />
      <Route path='/book/details/:id' element={<ShowBook/>} />
      <Route path='/book/edit/:id' element={<EditBook/>} />
      <Route path='/book/delete/:id' element={<DeleteBook/>} />
      <Route path='/pos' element={<POSPage/>} />
    </Routes>
    </div>
  ) //
}

export default App
