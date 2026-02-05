import './App.css'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import AdminHome from './admin/AdminHome'
import UserHome from './user/UserHome'
import UpdateBook from './admin/pages/UpdateBook'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRotes'
import { AuthProvider } from './context/AuthContext'
import Review from './user/pages/Review'
import EditReview from './user/pages/EditReview'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/adminHome"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:bookId/edit"
            element={
              <ProtectedRoute>
                <UpdateBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userHome"
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/:bookId/review"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/:bookId/review/edit/:reviewId"
            element={
              <ProtectedRoute>
                <EditReview />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App