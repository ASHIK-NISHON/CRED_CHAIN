import { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AppNav from '../components/layout/AppNav'
import WalletConnect from '../components/wallet/WalletConnect'
import { issueCredential, IssueCredentialParams } from '../lib/api/credentials'
import ProgressTimeline from '../components/credential/ProgressTimeline'

export default function IssuerDashboard() {
  const { activeAddress } = useWallet()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [result, setResult] = useState<{ assetId: string; txId: string } | null>(null)

  const [formData, setFormData] = useState<IssueCredentialParams>({
    issuerAddress: activeAddress || '',
    studentAddress: '',
    studentName: '',
    title: '',
    description: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    certificateFile: '',
    certificateFileName: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormData({
          ...formData,
          certificateFile: base64.split(',')[1] || base64,
          certificateFileName: file.name,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!activeAddress) {
      enqueueSnackbar('Please connect your wallet first', { variant: 'warning' })
      return
    }

    setLoading(true)
    setProgress([])
    setShowSuccess(false)

    try {
      const submitData = {
        ...formData,
        issuerAddress: activeAddress,
      }

      const result = await issueCredential(submitData)
      setProgress(result.progress)
      setResult({
        assetId: result.assetId,
        txId: result.transactionHash,
      })
      setShowSuccess(true)
      enqueueSnackbar('Credential issued successfully!', { variant: 'success' })
    } catch (error: unknown) {
      const err = error as { message?: string; code?: string; response?: { data?: { error?: string } } }
      const isNetworkError = err.message === 'Network Error' || err.code === 'ERR_NETWORK'
      const message = isNetworkError
        ? 'Cannot reach backend. Is the CredChain backend running at http://localhost:3001?'
        : (err.response?.data?.error || err.message || 'Failed to issue credential')
      enqueueSnackbar(message, { variant: 'error' })
      setProgress([`Error: ${isNetworkError ? message : String(err.message)}`])
    } finally {
      setLoading(false)
    }
  }

  // Pera Explorer works for TestNet; no public explorer for LocalNet
  const network = import.meta.env.VITE_ALGOD_NETWORK || 'testnet'
  const explorerUrl = import.meta.env.VITE_ALGORAND_EXPLORER || (
    network === 'localnet'
      ? null
      : 'https://testnet.explorer.perawallet.app'
  )

  return (
    <div className="min-h-screen bg-cred-surface">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-cred-ink mb-8"
        >
          Issuer Dashboard
        </motion.h1>

        {!activeAddress ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-cred p-8 text-center"
          >
            <p className="text-cred-muted">Please connect your wallet to issue credentials</p>
            <div className="mt-4">
              <WalletConnect required />
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="card-cred p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl font-semibold text-cred-ink mb-6">
                  Issue New Credential
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-cred-ink mb-1.5">
                      Certificate File
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="input-cred file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cred-primary/10 file:text-cred-primary file:font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cred-ink mb-1.5">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="input-cred"
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cred-ink mb-1.5">
                      Student Wallet Address
                    </label>
                    <input
                      type="text"
                      value={formData.studentAddress}
                      onChange={(e) => setFormData({ ...formData, studentAddress: e.target.value })}
                      className="input-cred font-mono text-sm"
                      placeholder="Algorand address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cred-ink mb-1.5">
                      Credential Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-cred"
                      placeholder="e.g. Bachelor of Science"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cred-ink mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-cred min-h-[100px] resize-y"
                      rows={3}
                      placeholder="Optional description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-cred-ink mb-1.5">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        className="input-cred"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cred-ink mb-1.5">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="input-cred"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-cred w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Minting...
                      </>
                    ) : (
                      'Mint Credential'
                    )}
                  </button>
                </form>
              </motion.div>

              <AnimatePresence>
                {progress.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <ProgressTimeline steps={progress} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-cred p-6"
            >
              <h3 className="font-display text-xl font-semibold text-cred-ink mb-4">
                Issuer Info
              </h3>
              <div className="space-y-2">
                <span className="text-sm text-cred-muted">Connected address</span>
                <p className="font-mono text-sm break-all text-cred-ink bg-slate-50 rounded-lg p-3">
                  {activeAddress}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showSuccess && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal modal-open"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="modal-box bg-white rounded-2xl shadow-xl max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display font-bold text-lg text-cred-ink mb-4">
                  Credential Issued Successfully
                </h3>
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-cred-muted">
                    <strong className="text-cred-ink">Asset ID:</strong> {result.assetId}
                  </p>
                  {explorerUrl ? (
                    <a
                      href={`${explorerUrl}/asset/${result.assetId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cred-primary hover:underline font-medium block"
                    >
                      View on Explorer →
                    </a>
                  ) : (
                    <p className="text-cred-muted text-xs">LocalNet: no public explorer</p>
                  )}
                  {formData.studentAddress && formData.studentAddress !== activeAddress && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-cred-muted text-xs mb-1">
                        Share this link with the student to claim:
                      </p>
                      <a
                        href={`${window.location.origin}/claim/${result.assetId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cred-primary hover:underline font-medium break-all text-xs"
                      >
                        {window.location.origin}/claim/{result.assetId}
                      </a>
                    </div>
                  )}
                </div>
                <div className="modal-action">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="btn-cred"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
