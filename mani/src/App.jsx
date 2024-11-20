import React from 'react'
import Additems from './Components/Additems'
import Viewdetails from './Components/Viewdetails'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Update from './Components/Update'

function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
     <Route path='/' element={<Homepage/>}/>
     <Route path='/viewdetails' element={<Viewdetails/>}/>
     <Route path='/additems' element={<Additems/>}/>
     <Route path='/update/:id' element={<Update/>}/>
    </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App