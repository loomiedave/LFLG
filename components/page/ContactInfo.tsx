import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function ConstactInfo() {
    return (
         <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Besoin d&apos;aide ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Contactez-nous pour toute question concernant les licences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Adresse
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Siège FTF, Lomé
                <br />
                Togo
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Téléphone
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                +228 XX XX XX XX
                <br />
                Lun-Ven 8h-17h
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                licences@ftf.tg
                <br />
                Réponse sous 24h
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}