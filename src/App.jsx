import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AddMember from './pages/Addmember.jsx'
import Member from './pages/Member.jsx'


function App() {


  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/addmember' element={<AddMember/>}/>
        <Route path='/member' element={<Member/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      <Footer/>

    </>
  )
}

export default App
