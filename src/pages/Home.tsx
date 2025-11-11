import { Link } from 'react-router-dom'

export default function Home() {
  const services = [
    {
      id: 'pay',
      title: 'SFM Pay',
      description: 'Solution de paiement sécurisée et instantanée pour tous vos besoins',
      icon: '💳',
      path: '/pay',
      gradient: 'from-blue-500 to-blue-600',
      features: ['Paiements instantanés', 'Sécurité maximale', 'Multi-devises']
    },
    {
      id: 'market',
      title: 'SFM Market',
      description: 'Place de marché pour acheter et vendre en toute confiance',
      icon: '🛍️',
      path: '/market',
      gradient: 'from-purple-500 to-purple-600',
      features: ['Achat/Vente sécurisé', 'Large catalogue', 'Escrow intégré']
    },
    {
      id: 'cash-manager',
      title: 'SFM Cash Manager',
      description: 'Gérez vos finances personnelles et professionnelles efficacement',
      icon: '💰',
      path: '/cash-manager',
      gradient: 'from-green-500 to-green-600',
      features: ['Budget intelligent', 'Suivi des dépenses', 'Rapports détaillés']
    },
    {
      id: 'investing',
      title: 'SFM Investing',
      description: 'Investissez dans les cryptomonnaies et actifs numériques',
      icon: '📈',
      path: '/investing',
      gradient: 'from-orange-500 to-orange-600',
      features: ['Trading crypto', 'Portfolio tracker', 'Analyse en temps réel']
    },
    {
      id: 'academy',
      title: 'SFM Academy',
      description: 'Apprenez et développez vos compétences financières',
      icon: '🎓',
      path: '/academy',
      gradient: 'from-indigo-500 to-indigo-600',
      features: ['Cours en ligne', 'Certifications', 'Communauté active']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bienvenue sur SFM Portal
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Votre écosystème financier complet : paiements, investissements, formation et bien plus
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg">
                Commencer
              </button>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all border-2 border-white">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services financiers conçus pour simplifier votre vie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${service.gradient} p-8 text-white`}>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/90">{service.description}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Explorer
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">€2M+</div>
              <div className="text-gray-300">Transactions traitées</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Support client</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers d'utilisateurs qui font confiance à SFM Portal
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Créer un compte gratuit
          </button>
        </div>
      </div>
    </div>
  )
}
