import './App.css'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import AdminHome from './components/AdminHome'
import UserHome from './components/UserHome'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRotes from './routes/ProtectedRotes'

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
