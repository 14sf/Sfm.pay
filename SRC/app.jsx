import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              SFM Pay
            </h1>
            <p className="text-xl text-gray-700">
              Votre solution de paiement moderne et sécurisée
            </p>
          </div>

          {/* Card principale */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Bienvenue sur SFM Pay
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Paiements rapides</h3>
                  <p className="text-gray-600">Effectuez vos transactions en quelques secondes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">100% Sécurisé</h3>
                  <p className="text-gray-600">Vos données sont protégées avec un cryptage de niveau bancaire</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Support 24/7</h3>
                  <p className="text-gray-600">Notre équipe est disponible pour vous aider à tout moment</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Commencer
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200">
                En savoir plus
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600">
            <p>© 2025 SFM Pay. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;