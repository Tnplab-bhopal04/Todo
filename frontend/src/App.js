import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home/home.jsx'
import Edit from './edit/edit.jsx';
import Create from './create/create.jsx';
function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/edit/:sno' element={<Edit />}></Route>
      <Route path='/create' element={<Create />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App;