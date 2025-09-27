import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Login from './Login'

export default function App() {
  return (
    <>
      <nav className="p-4 bg-white shadow-md flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}
