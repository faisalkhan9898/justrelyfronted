import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import USP from './components/USP'
import MissionVision from './components/MissionVision'
import Founders from './components/Founders'
import Sectors from './components/Sectors'
import Projects from './components/Projects'
import Impact from './components/Impact'
import Reviews from './components/Reviews'
import ContactInfo from './components/ContactInfo'
import Footer from './components/Footer'
import StackServices from './components/StackServices'
import FloatingMenu from './components/FloatingMenu'
import Landing from './components/Landing'
import Contact from './pages/Contact'
import CivilContracting from './pages/CivilContractingWorks'
import MEPContracting from './pages/MEPContracting'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <About />
              <USP />
              <MissionVision />
              <Founders />
              <Sectors />
              <StackServices />
              <Impact />
              <Projects />
              <Reviews />
              <ContactInfo />
            </>
          }
        />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/CivilContractingWorks" element={<CivilContracting />} />
        <Route path="/MEPContracting" element={<MEPContracting />} />
      </Routes>
      <Footer />
      <FloatingMenu />
    </Router>
  )
}

export default App

