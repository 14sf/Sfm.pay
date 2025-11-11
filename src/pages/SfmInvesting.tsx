export default function SfmInvesting() {
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', price: '€42,350', change: '+5.2%', icon: '₿', positive: true },
    { name: 'Ethereum', symbol: 'ETH', price: '€2,240', change: '+3.8%', icon: 'Ξ', positive: true },
    { name: 'Cardano', symbol: 'ADA', price: '€0.52', change: '-1.2%', icon: '₳', positive: false },
    { name: 'Solana', symbol: 'SOL', price: '€98.50', change: '+7.5%', icon: '◎', positive: true }
  ]

  const features = [
    {
      icon: '📊',
      title: 'Trading en temps réel',
      description: 'Achetez et vendez des cryptos instantanément avec des frais compétitifs'
    },
    {
      icon: '🔐',
      title: 'Stockage sécurisé',
      description: 'Vos actifs sont protégés par un cold storage et une assurance complète'
    },
    {
      icon: '📈',
      title: 'Analyse avancée',
      description: 'Outils de graphiques professionnels et indicateurs techniques'
    },
    {
      icon: '🎓',
      title: 'Formation incluse',
      description: 'Accès gratuit aux cours SFM Academy sur le trading crypto'
    },
    {
      icon: '🤖',
      title: 'Trading automatique',
      description: 'Bots de trading et DCA automatique pour optimiser vos investissements'
    },
    {
      icon: '💼',
      title: 'Portfolio diversifié',
      description: 'Investissez dans plus de 100 cryptomonnaies en quelques clics'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                SFM Investing
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Investissez dans les cryptomonnaies et actifs numériques avec confiance et simplicité
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-lg">
                  Commencer à investir
                </button>
                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-400 transition-all border-2 border-white">
                  Explorer les cryptos
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-4">
                  <div className="text-sm text-orange-100 mb-2">Valeur du portfolio</div>
                  <div className="text-4xl font-bold mb-1">€12,458.50</div>
                  <div className="text-green-300 font-semibold">+€1,234 (+10.9%) ce mois</div>
                </div>
                <div className="h-32 flex items-end justify-between gap-1 mt-6">
                  {[40, 65, 45, 80, 60, 85, 70, 90].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white/30 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Prices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Prix en temps réel</h2>
          <button className="text-orange-600 font-semibold hover:text-orange-700">
            Voir toutes les cryptos →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptos.map((crypto, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl font-bold mr-3">
                    {crypto.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{crypto.name}</div>
                    <div className="text-sm text-gray-500">{crypto.symbol}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">{crypto.price}</div>
                <div className={`font-semibold ${crypto.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Plateforme d'investissement complète
            </h2>
            <p className="text-xl text-gray-600">
              Tous les outils dont vous avez besoin pour réussir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Performance de nos utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">📈</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">+127%</div>
              <div className="text-gray-600">Rendement moyen sur 1 an</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">€250M</div>
              <div className="text-gray-600">Volume tradé</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">👥</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100K+</div>
              <div className="text-gray-600">Investisseurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🔐</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Fonds sécurisés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Plans */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Plans d'investissement automatique</h2>
            <p className="text-xl text-gray-300">
              Investissez régulièrement sans effort avec le DCA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 border-2 border-gray-700 hover:border-orange-500 transition-all">
              <h3 className="text-2xl font-bold mb-2">Débutant</h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">€50/mois</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Investissement automatique
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Portfolio pré-configuré
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Frais réduits 0.5%
                </li>
              </ul>
              <button className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-all">
                Commencer
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 transform scale-105 shadow-2xl">
              <div className="text-center mb-2">
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Intermédiaire</h3>
              <div className="text-4xl font-bold mb-6">€200/mois</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-white mr-3">✓</span>
                  Tout du plan Débutant
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-3">✓</span>
                  Portfolio personnalisé
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-3">✓</span>
                  Frais réduits 0.3%
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-3">✓</span>
                  Support prioritaire
                </li>
              </ul>
              <button className="w-full bg-white text-orange-600 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
                Commencer
              </button>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border-2 border-gray-700 hover:border-orange-500 transition-all">
              <h3 className="text-2xl font-bold mb-2">Expert</h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">€500/mois</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Tout du plan Intermédiaire
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Trading automatisé avancé
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Frais réduits 0.1%
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Conseiller dédié
                </li>
              </ul>
              <button className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-all">
                Commencer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Commencez à investir aujourd'hui</h2>
          <p className="text-xl mb-8 text-orange-100">
            Bonus de 25€ offert pour votre premier investissement
          </p>
          <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Créer mon compte investisseur
          </button>
        </div>
      </div>
    </div>
  )
}
