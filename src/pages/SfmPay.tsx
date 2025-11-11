export default function SfmPay() {
  const features = [
    {
      icon: '⚡',
      title: 'Paiements Instantanés',
      description: 'Transférez de l\'argent en quelques secondes, partout dans le monde'
    },
    {
      icon: '🔒',
      title: 'Sécurité Maximale',
      description: 'Chiffrement de bout en bout et authentification à deux facteurs'
    },
    {
      icon: '🌍',
      title: 'Multi-devises',
      description: 'Supportez plus de 150 devises avec des taux de change compétitifs'
    },
    {
      icon: '📱',
      title: 'Application Mobile',
      description: 'Payez avec votre smartphone en scannant un QR code'
    },
    {
      icon: '💼',
      title: 'Pour les Entreprises',
      description: 'Solutions de paiement adaptées aux professionnels et PME'
    },
    {
      icon: '📊',
      title: 'Analytiques',
      description: 'Suivez vos transactions et générez des rapports détaillés'
    }
  ]

  const plans = [
    {
      name: 'Particulier',
      price: 'Gratuit',
      features: [
        'Transactions illimitées',
        'Support 24/7',
        'Carte virtuelle',
        'Notifications en temps réel'
      ],
      cta: 'Commencer',
      popular: false
    },
    {
      name: 'Business',
      price: '29€/mois',
      features: [
        'Tout du plan Particulier',
        'API d\'intégration',
        'Comptes multiples',
        'Rapports avancés',
        'Support prioritaire'
      ],
      cta: 'Essayer gratuitement',
      popular: true
    },
    {
      name: 'Entreprise',
      price: 'Sur mesure',
      features: [
        'Tout du plan Business',
        'Gestionnaire de compte dédié',
        'SLA garantie',
        'Formation personnalisée',
        'Intégration sur mesure'
      ],
      cta: 'Nous contacter',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                SFM Pay
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                La solution de paiement moderne pour tous vos besoins. Rapide, sécurisé et sans frontières.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg">
                  Créer un compte
                </button>
                <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all border-2 border-white">
                  Voir la démo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-6xl mb-4">💳</div>
                <div className="text-3xl font-bold mb-2">€0</div>
                <div className="text-blue-100">Frais sur les paiements entre particuliers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir SFM Pay ?
          </h2>
          <p className="text-xl text-gray-600">
            Une plateforme complète pour gérer tous vos paiements
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

      {/* Pricing Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs transparents
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le plan qui vous convient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105'
                    : 'bg-gray-50 text-gray-900'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Le plus populaire
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Créez votre compte en moins de 2 minutes
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Créer un compte gratuit
          </button>
        </div>
      </div>
    </div>
  )
}
