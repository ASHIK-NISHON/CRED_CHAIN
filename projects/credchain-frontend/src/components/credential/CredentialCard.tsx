import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateShareQR } from '../../lib/api/verification'
import QRCodeModal from '../ui/QRCodeModal'

interface CredentialCardProps {
  assetId: string
  title: string
  studentName: string
  issueDate: string
  issuerAddress: string
}

export default function CredentialCard({
  assetId,
  title,
  studentName,
  issueDate,
}: CredentialCardProps) {
  const [showQR, setShowQR] = useState(false)
  const [qrData, setQrData] = useState<string>('')
  const [loadingQR, setLoadingQR] = useState(false)

  const handleShare = async () => {
    setLoadingQR(true)
    try {
      const result = await generateShareQR(assetId)
      setQrData(result.qrCodeDataUrl)
      setShowQR(true)
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    } finally {
      setLoadingQR(false)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="card-cred p-6 h-full flex flex-col"
      >
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-cred-ink mb-2">{title}</h3>
          <p className="text-cred-muted text-sm mb-1">Issued to: {studentName}</p>
          <p className="text-sm text-cred-muted/80">
            {new Date(issueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Link
            to={`/verify/${assetId}`}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-cred-ink font-medium text-center hover:bg-slate-50 transition-colors text-sm"
          >
            View
          </Link>
          <button
            onClick={handleShare}
            disabled={loadingQR}
            className="flex-1 btn-cred py-2.5 text-sm disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loadingQR ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Share'
            )}
          </button>
        </div>
      </motion.div>

      {showQR && (
        <QRCodeModal
          qrData={qrData}
          verificationUrl={`${window.location.origin}/verify/${assetId}`}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  )
}
