import {
  FileText,
  Shield,
  Users,
} from "lucide-react";

export default function FeaturesSection(){
    return(
        <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi utiliser notre système ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Un système fiable et sécurisé pour la gestion des licences
              footballeurs au Togo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Base de Données Complète
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Accédez à toutes les licences actives des joueurs et entraîneurs
                officiellement enregistrés auprès de la FTF et de la Ligue de
                Lomé Golfe.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Vérification Instantanée
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Obtenez une confirmation immédiate de la validité d&apos;une
                licence avec toutes les informations officielles et le statut en
                temps réel.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Sécurité Garantie
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Système sécurisé et officiellement approuvé, protégeant les
                données personnelles conformément aux standards internationaux.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}