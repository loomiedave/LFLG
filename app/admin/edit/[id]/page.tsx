'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User } from 'lucide-react'

interface License {
  id: string
  licenseNumber: string
  licenseType: 'PLAYER' | 'COACH'
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED'
  name: string
  surname: string
  dateOfBirth: string
  address: string
  state: string
  district: string
  clubName: string
  photoUrl?: string
  expiryDate?: string
}

export default function EditLicensePage() {
  const params = useParams()
  const router = useRouter()
  const [license, setLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [licenseId, setLicenseId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    licenseType: 'PLAYER' as 'PLAYER' | 'COACH',
    status: 'ACTIVE' as 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED',
    name: '',
    surname: '',
    dateOfBirth: '',
    address: '',
    state: '',
    district: '',
    clubName: '',
    photoUrl: '',
    expiryDate: ''
  })

  // Handle async params
  useEffect(() => {
    const handleParams = async () => {
      if (params?.id) {
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        setLicenseId(id)
      }
    }
    handleParams()
  }, [params])

  // Fetch license when licenseId is available
  useEffect(() => {
    if (licenseId) {
      fetchLicense(licenseId)
    }
  }, [])

  const fetchLicense = async (id: string) => {
    try {
      setFetchLoading(true)
      const response = await fetch(`/api/licenses/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch license')
      }

      const license = data.license
      setLicense(license)
      setFormData({
        licenseType: license.licenseType,
        status: license.status,
        name: license.name,
        surname: license.surname,
        dateOfBirth: license.dateOfBirth.split('T')[0],
        address: license.address,
        state: license.state,
        district: license.district,
        clubName: license.clubName,
        photoUrl: license.photoUrl || '',
        expiryDate: license.expiryDate ? license.expiryDate.split('T')[0] : ''
      })
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
      router.push('/admin')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!licenseId) return
    
    setLoading(true)

    try {
      const response = await fetch(`/api/licenses/${licenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update license')
      }

      router.push('/admin')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('La taille du fichier ne doit pas dépasser 10 MO')
      return
    }

    setUploadingImage(true)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setFormData(prev => ({ ...prev, photoUrl: data.url }))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred uploading the image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement de la licence...</p>
        </div>
      </div>
    )
  }

  if (!license) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Licence introuvable</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Modifier la licence
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {license.name} {license.surname} - N° {license.licenseNumber}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Personal Info */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Informations personnelles
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de licence
                </label>
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="PLAYER">Joueur</option>
                  <option value="COACH">Entraîneur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="EXPIRED">Expirée</option>
                  <option value="SUSPENDED">Suspendue</option>
                  <option value="REVOKED">Révoquée</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse (résidence effective)
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="input resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  État
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column - Club Info & Photo */}
          <div className="space-y-6">
            {/* Club Information */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Informations du club
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom du club
                  </label>
                  <input
                    type="text"
                    name="clubName"
                    value={formData.clubName}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date d&apos;expiration (optionnel)
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Photo d&apos;identité
              </h2>

              <div className="space-y-4">
                {formData.photoUrl ? (
                  <div className="text-center">
                    <img
                      src={formData.photoUrl}
                      alt="Photo d'identité"
                      className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 mx-auto mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Supprimer la photo
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Aucune photo sélectionnée
                    </p>
                  </div>
                )}

                <div>
                  <label className="block">
                    <span className="sr-only">Choisir une photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-gray-500 dark:text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-400
                        hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30
                        file:disabled:opacity-50"
                    />
                  </label>
                  {uploadingImage && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 animate-spin border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Upload en cours...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin"
            className="btn-secondary"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
            )}
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  )
}