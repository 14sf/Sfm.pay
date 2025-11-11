export default function SfmCashManager() {
  const features = [
    {
      icon: '📊',
      title: 'Suivi des dépenses',
      description: 'Analysez vos dépenses en temps réel avec des graphiques interactifs'
    },
    {
      icon: '🎯',
      title: 'Objectifs financiers',
      description: 'Définissez et suivez vos objectifs d\'épargne et d\'investissement'
    },
    {
      icon: '🔔',
      title: 'Alertes intelligentes',
      description: 'Recevez des notifications pour les dépenses inhabituelles'
    },
    {
      icon: '💡',
      title: 'Conseils personnalisés',
      description: 'IA qui analyse vos habitudes et vous propose des optimisations'
    },
    {
      icon: '📱',
      title: 'Multi-comptes',
      description: 'Gérez tous vos comptes bancaires depuis une seule interface'
    },
    {
      icon: '🔒',
      title: 'Sécurité bancaire',
      description: 'Connexion sécurisée à vos banques avec chiffrement de bout en bout'
    }
  ]

  const stats = [
    { label: 'Épargne moyenne', value: '+23%', icon: '📈', color: 'text-green-600' },
    { label: 'Dépenses réduites', value: '€450/mois', icon: '💰', color: 'text-blue-600' },
    { label: 'Utilisateurs actifs', value: '50K+', icon: '👥', color: 'text-purple-600' },
    { label: 'Satisfaction', value: '4.9/5', icon: '⭐', color: 'text-yellow-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                SFM Cash Manager
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Prenez le contrôle de vos finances personnelles et professionnelles avec intelligence artificielle
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-all shadow-lg">
                  Commencer gratuitement
                </button>
                <button className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all border-2 border-white">
                  Voir la démo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Revenus ce mois</span>
                    <span className="text-2xl font-bold">+€3,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Dépenses</span>
                    <span className="text-2xl font-bold">-€1,230</span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-100">Épargne</span>
                      <span className="text-3xl font-bold text-green-200">€2,220</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités puissantes
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce dont vous avez besoin pour maîtriser vos finances
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tableau de bord intuitif
            </h2>
            <p className="text-xl text-gray-600">
              Visualisez vos finances en un coup d'œil
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Budget mensuel</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-600">Alimentation</span>
                      <span className="font-semibold">€450 / €500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-600">Transport</span>
                      <span className="font-semibold">€180 / €200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-600">Loisirs</span>
                      <span className="font-semibold">€120 / €150</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transactions récentes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        🍕
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Restaurant</div>
                        <div className="text-xs text-gray-500">Hier, 19:30</div>
                      </div>
                    </div>
                    <span className="font-bold text-red-600">-€45.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        💰
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Salaire</div>
                        <div className="text-xs text-gray-500">01/11/2024</div>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">+€3,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        🏠
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Loyer</div>
                        <div className="text-xs text-gray-500">01/11/2024</div>
                      </div>
                    </div>
                    <span className="font-bold text-red-600">-€850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Commencez à économiser dès aujourd'hui</h2>
          <p className="text-xl mb-8 text-green-100">
            Rejoignez 50 000+ utilisateurs qui maîtrisent leurs finances
          </p>
          <button className="bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Essai gratuit de 30 jours
          </button>
        </div>
      </div>
    </div>
  )
}
