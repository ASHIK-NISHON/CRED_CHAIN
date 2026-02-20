import { motion, AnimatePresence } from 'framer-motion'

interface QRCodeModalProps {
  qrData: string
  verificationUrl: string
  onClose: () => void
}

export default function QRCodeModal({ qrData, verificationUrl, onClose }: QRCodeModalProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrData
    link.download = 'credential-qr.png'
    link.click()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal modal-open"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="modal-box bg-white rounded-2xl shadow-xl max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-display font-bold text-lg text-cred-ink mb-4">
            Share Credential
          </h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <img src={qrData} alt="QR Code" className="w-56 h-56" />
            </div>
            <p className="text-sm text-cred-muted break-all text-center max-w-xs">
              {verificationUrl}
            </p>
            <div className="flex gap-2 w-full">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-cred-ink hover:bg-slate-50 transition-colors"
              >
                Download QR
              </button>
              <button onClick={onClose} className="flex-1 btn-cred py-2.5">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
