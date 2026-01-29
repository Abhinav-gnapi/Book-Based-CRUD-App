import './App.css'
import Registration from './components/Registration.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import AdminHome from './admin/AdminHome.js'
import UserHome from './components/UserHome.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRotes from './routes/ProtectedRotes.js'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/register' element={<Registration />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<ProtectedRotes > <Home /> </ProtectedRotes>}></Route>
      <Route path='/adminHome' element={<ProtectedRotes > <AdminHome /> </ProtectedRotes>}></Route>
      <Route path='/userHome' element={<ProtectedRotes > <UserHome /> </ProtectedRotes>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
