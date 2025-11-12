import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SfmPay from './pages/SfmPay'
import SfmMarket from './pages/SfmMarket'
import SfmCashManager from './pages/SfmCashManager'
import SfmInvesting from './pages/SfmInvesting'
import SfmAcademy from './pages/SfmAcademy'

export default function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navLinks = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/pay', label: 'Pay', icon: '💳' },
    { path: '/market', label: 'Market', icon: '🛍️' },
    { path: '/cash-manager', label: 'Cash Manager', icon: '💰' },
    { path: '/investing', label: 'Investing', icon: '📈' },
    { path: '/academy', label: 'Academy', icon: '🎓' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SFM Portal
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Connexion
              </Link>
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-100">
          <div className="flex overflow-x-auto py-2 px-4 space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={isHomePage ? '' : 'py-8'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pay" element={<SfmPay />} />
          <Route path="/market" element={<SfmMarket />} />
          <Route path="/cash-manager" element={<SfmCashManager />} />
          <Route path="/investing" element={<SfmInvesting />} />
          <Route path="/academy" element={<SfmAcademy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SFM Portal</h3>
              <p className="text-gray-400">
                Votre écosystème financier complet et sécurisé
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/pay" className="hover:text-white">SFM Pay</Link></li>
                <li><Link to="/market" className="hover:text-white">SFM Market</Link></li>
                <li><Link to="/cash-manager" className="hover:text-white">Cash Manager</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/investing" className="hover:text-white">Investing</Link></li>
                <li><Link to="/academy" className="hover:text-white">Academy</Link></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white">Conditions</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SFM Portal. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
