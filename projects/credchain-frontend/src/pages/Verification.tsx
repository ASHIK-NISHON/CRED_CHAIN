import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { verifyCredential, VerificationResult } from '../lib/api/verification'
import AppNav from '../components/layout/AppNav'
import StatusBanner from '../components/verification/StatusBanner'

export default function Verification() {
  const { assetId } = useParams<{ assetId: string }>()
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (assetId) {
      loadVerification()
    }
  }, [assetId])

  const loadVerification = async () => {
    if (!assetId) return

    setLoading(true)
    try {
      const verificationResult = await verifyCredential(assetId)
      setResult(verificationResult)
    } catch (error) {
      console.error('Verification failed:', error)
      setResult({
        status: 'INVALID',
        assetId,
        error: 'Failed to verify credential',
      })
    } finally {
      setLoading(false)
    }
  }

  const network = import.meta.env.VITE_ALGOD_NETWORK || 'testnet'
  const explorerUrl = import.meta.env.VITE_ALGORAND_EXPLORER || (
    network === 'localnet'
      ? null
      : 'https://testnet.explorer.perawallet.app'
  )

  return (
    <div className="min-h-screen bg-cred-surface">
      <AppNav showWallet={false} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <span className="loading loading-spinner loading-lg text-cred-primary" />
            <p className="mt-4 text-cred-muted">Verifying credential...</p>
          </motion.div>
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StatusBanner status={result.status} />

            {result.status === 'VERIFIED' && result.credential && (
              <div className="card-cred p-8 mt-6">
                <h2 className="font-display text-3xl font-bold text-cred-ink mb-6">
                  {result.credential.title}
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-sm text-cred-muted">Student</span>
                    <p className="font-semibold text-cred-ink">{result.credential.studentName}</p>
                  </div>

                  {result.credential.description && (
                    <div>
                      <span className="text-sm text-cred-muted">Description</span>
                      <p className="text-cred-ink">{result.credential.description}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm text-cred-muted">Issued</span>
                    <p className="text-cred-ink">
                      {new Date(result.credential.issueDate).toLocaleDateString()}
                    </p>
                  </div>

                  {result.credential.expiryDate && (
                    <div>
                      <span className="text-sm text-cred-muted">Expires</span>
                      <p className="text-cred-ink">
                        {new Date(result.credential.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm text-cred-muted">Issuer</span>
                    <p className="font-mono text-sm break-all text-cred-ink">
                      {result.credential.issuerAddress}
                    </p>
                  </div>
                </div>

                {result.credential.certificateIpfsUrl && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-cred-ink mb-2">Certificate</h3>
                    <iframe
                      src={result.credential.certificateIpfsUrl}
                      className="w-full h-96 border border-slate-200 rounded-xl"
                      title="Certificate"
                    />
                    <a
                      href={result.credential.certificateIpfsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-cred-primary hover:underline font-medium text-sm"
                    >
                      Open certificate →
                    </a>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-semibold text-cred-ink mb-4">Blockchain</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-cred-muted">Asset ID </span>
                      {explorerUrl ? (
                        <a
                          href={`${explorerUrl}/asset/${result.assetId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cred-primary hover:underline ml-2 font-mono"
                        >
                          {result.assetId}
                        </a>
                      ) : (
                        <span className="font-mono ml-2">{result.assetId}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-cred-muted">Transaction </span>
                      {explorerUrl ? (
                        <a
                          href={`${explorerUrl}/tx/${result.credential.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cred-primary hover:underline ml-2 font-mono"
                        >
                          {result.credential.transactionHash.substring(0, 20)}...
                        </a>
                      ) : (
                        <span className="font-mono ml-2">{result.credential.transactionHash.substring(0, 20)}...</span>
                      )}
                    </div>
                    {result.assetInfo && result.credential.metadataIpfsUrl && (
                      <div>
                        <span className="text-cred-muted">Metadata </span>
                        <a
                          href={result.credential.metadataIpfsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cred-primary hover:underline ml-2 break-all"
                        >
                          {result.credential.metadataIpfsUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {result.status === 'REVOKED' && result.revocationInfo && (
              <div className="card-cred p-8 mt-6">
                <h2 className="font-display text-2xl font-bold text-cred-ink mb-4">
                  Credential Revoked
                </h2>
                {result.revocationInfo.revokedAt && (
                  <p className="text-cred-muted mb-2">
                    Revoked on:{' '}
                    {new Date(result.revocationInfo.revokedAt).toLocaleDateString()}
                  </p>
                )}
                {result.revocationInfo.reason && (
                  <p className="text-cred-muted">Reason: {result.revocationInfo.reason}</p>
                )}
              </div>
            )}

            {result.status === 'INVALID' && (
              <div className="card-cred p-8 mt-6">
                <h2 className="font-display text-2xl font-bold text-cred-ink mb-4">
                  Credential Invalid
                </h2>
                <p className="text-cred-muted">
                  {result.error || 'This credential could not be verified.'}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="card-cred p-8 text-center">
            <p className="text-cred-muted">No verification result available</p>
          </div>
        )}
      </div>
    </div>
  )
}
