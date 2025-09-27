import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Login from './Login'

export default function App() {
  return (
    <>
      <nav style={{ padding: 12, background: '#eee' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
