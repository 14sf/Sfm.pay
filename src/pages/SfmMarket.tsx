export default function SfmMarket() {
  const categories = [
    { name: 'Électronique', icon: '📱', count: '1,234 produits' },
    { name: 'Mode', icon: '👔', count: '2,456 produits' },
    { name: 'Maison', icon: '🏠', count: '987 produits' },
    { name: 'Sports', icon: '⚽', count: '654 produits' },
    { name: 'Livres', icon: '📚', count: '3,210 produits' },
    { name: 'Automobile', icon: '🚗', count: '432 produits' }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: '1,199€',
      image: '📱',
      seller: 'TechStore',
      rating: 4.8,
      reviews: 127
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      price: '1,499€',
      image: '💻',
      seller: 'AppleShop',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      price: '279€',
      image: '🎧',
      seller: 'AudioTech',
      rating: 4.7,
      reviews: 234
    },
    {
      id: 4,
      name: 'iPad Pro 12.9"',
      price: '1,099€',
      image: '📱',
      seller: 'TechWorld',
      rating: 4.8,
      reviews: 156
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              SFM Market
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Place de marché sécurisée avec protection escrow intégrée
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl flex items-center p-2">
                <input
                  type="text"
                  placeholder="Rechercher des produits, catégories..."
                  className="flex-1 px-6 py-3 text-gray-900 outline-none rounded-full"
                />
                <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Catégories populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Produits en vedette</h2>
          <button className="text-purple-600 font-semibold hover:text-purple-700">
            Voir tout →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-7xl">{product.image}</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">par {product.seller}</p>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-all">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pourquoi acheter sur SFM Market ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Protection Escrow</h3>
              <p className="text-gray-600">
                Vos paiements sont protégés jusqu'à réception de votre commande
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vendeurs Vérifiés</h3>
              <p className="text-gray-600">
                Tous nos vendeurs sont vérifiés et notés par la communauté
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Retours Gratuits</h3>
              <p className="text-gray-600">
                30 jours pour retourner votre article sans frais supplémentaires
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Vendez sur SFM Market</h2>
          <p className="text-xl mb-8 text-purple-100">
            Créez votre boutique en ligne en quelques minutes
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Devenir vendeur
          </button>
        </div>
      </div>
    </div>
  )
}
