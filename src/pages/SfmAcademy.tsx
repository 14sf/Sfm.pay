export default function SfmAcademy() {
  const courses = [
    {
      id: 1,
      title: 'Introduction aux Cryptomonnaies',
      level: 'Débutant',
      duration: '4 heures',
      students: '12,450',
      rating: 4.8,
      price: 'Gratuit',
      icon: '₿',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 2,
      title: 'Trading Avancé & Analyse Technique',
      level: 'Avancé',
      duration: '12 heures',
      students: '5,230',
      rating: 4.9,
      price: '199€',
      icon: '📈',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Gestion de Budget Personnel',
      level: 'Débutant',
      duration: '6 heures',
      students: '18,920',
      rating: 4.7,
      price: 'Gratuit',
      icon: '💰',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'DeFi & Finance Décentralisée',
      level: 'Intermédiaire',
      duration: '8 heures',
      students: '3,450',
      rating: 4.9,
      price: '149€',
      icon: '🔗',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      title: 'Investissement Long Terme',
      level: 'Intermédiaire',
      duration: '10 heures',
      students: '8,670',
      rating: 4.8,
      price: '99€',
      icon: '🎯',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 6,
      title: 'Sécurité & Protection des Actifs',
      level: 'Tous niveaux',
      duration: '5 heures',
      students: '15,340',
      rating: 4.9,
      price: 'Gratuit',
      icon: '🔐',
      color: 'from-red-500 to-red-600'
    }
  ]

  const stats = [
    { icon: '👥', value: '50K+', label: 'Étudiants actifs' },
    { icon: '📚', value: '150+', label: 'Cours disponibles' },
    { icon: '⭐', value: '4.8/5', label: 'Note moyenne' },
    { icon: '🎓', value: '25K+', label: 'Certifications délivrées' }
  ]

  const features = [
    {
      icon: '🎥',
      title: 'Cours vidéo HD',
      description: 'Contenus vidéo de haute qualité avec sous-titres'
    },
    {
      icon: '📝',
      title: 'Exercices pratiques',
      description: 'Mettez en pratique vos connaissances avec des cas réels'
    },
    {
      icon: '🏆',
      title: 'Certifications',
      description: 'Obtenez des certificats reconnus par l\'industrie'
    },
    {
      icon: '👨‍🏫',
      title: 'Experts du secteur',
      description: 'Apprenez des meilleurs professionnels de la finance'
    },
    {
      icon: '💬',
      title: 'Communauté active',
      description: 'Échangez avec d\'autres étudiants et mentors'
    },
    {
      icon: '📱',
      title: 'Accès mobile',
      description: 'Apprenez où vous voulez, quand vous voulez'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                SFM Academy
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Développez vos compétences financières et devenez un expert en cryptomonnaies, trading et gestion de patrimoine
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all shadow-lg">
                  Parcourir les cours
                </button>
                <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-400 transition-all border-2 border-white">
                  Essai gratuit
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-indigo-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher un cours..."
              className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tous les niveaux</option>
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Toutes les catégories</option>
              <option>Crypto</option>
              <option>Trading</option>
              <option>Budget</option>
              <option>Investissement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Cours populaires</h2>
          <button className="text-indigo-600 font-semibold hover:text-indigo-700">
            Voir tous les cours →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              {/* Course Header */}
              <div className={`bg-gradient-to-r ${course.color} p-8 text-white relative`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {course.icon}
                </div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              </div>

              {/* Course Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {course.students} étudiants
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {'★'.repeat(Math.floor(course.rating))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">{course.price}</div>
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
              Pourquoi choisir SFM Academy ?
            </h2>
            <p className="text-xl text-gray-600">
              Une expérience d'apprentissage complète et interactive
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

      {/* Learning Paths */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Parcours d'apprentissage structurés
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-indigo-200">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Débutant</h3>
            <p className="text-gray-600 mb-6">
              Commencez votre voyage dans la finance et les cryptomonnaies
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Bases de la finance
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Introduction aux cryptos
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Gestion de budget
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all">
              Commencer
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 transform scale-105 shadow-xl">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Intermédiaire</h3>
            <p className="text-gray-600 mb-6">
              Approfondissez vos connaissances et commencez à trader
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Analyse technique
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Stratégies de trading
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Portfolio management
              </li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition-all">
              Commencer
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert</h3>
            <p className="text-gray-600 mb-6">
              Maîtrisez les stratégies avancées et la DeFi
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Trading algorithmique
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                DeFi & Yield farming
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Gestion de risques
              </li>
            </ul>
            <button className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-all">
              Commencer
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Commencez à apprendre gratuitement</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Accédez à plus de 50 cours gratuits dès maintenant
          </p>
          <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            S'inscrire gratuitement
          </button>
        </div>
      </div>
    </div>
  )
}
