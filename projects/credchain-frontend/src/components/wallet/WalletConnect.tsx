import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletConnectProps {
  required?: boolean
  onConnect?: () => void
}

export default function WalletConnect({ required = false, onConnect }: WalletConnectProps) {
  const { activeAddress, wallets, isReady } = useWallet()
  const [showModal, setShowModal] = useState(false)

  const handleConnect = async (walletId: string) => {
    try {
      const wallet = wallets.find((w) => w.id === walletId)
      if (wallet) {
        await wallet.connect()
        setShowModal(false)
        onConnect?.()
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      if (message.includes('modal is closed by user') || message.includes('closed by user')) {
        setShowModal(false)
        return
      }
      console.error('Failed to connect wallet:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      const activeWallet = wallets.find((w) => w.isActive)
      if (activeWallet) {
        await activeWallet.disconnect()
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  if (activeAddress) {
    return (
      <div className="flex items-center gap-3">
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-sm font-medium"
        >
          {activeAddress.substring(0, 6)}...{activeAddress.substring(activeAddress.length - 4)}
        </motion.span>
        <button
          onClick={handleDisconnect}
          className="py-2 px-4 rounded-xl text-sm font-medium text-cred-muted hover:text-cred-ink hover:bg-slate-100 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={!isReady}
        className={`rounded-xl font-medium px-5 py-2.5 transition-all duration-200 ${
          required
            ? 'btn-cred'
            : 'border border-slate-200 text-cred-ink hover:bg-slate-50'
        }`}
      >
        Connect Wallet
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal modal-open"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="modal-box bg-white rounded-2xl shadow-xl max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-lg text-cred-ink mb-4">
                Connect Wallet
              </h3>
              <div className="space-y-2">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-cred-primary/40 hover:bg-cred-primary/5 transition-all text-left"
                  >
                    {wallet.metadata?.icon && (
                      <img
                        src={wallet.metadata.icon}
                        alt={wallet.metadata.name}
                        className="w-8 h-8 rounded-lg"
                      />
                    )}
                    <span className="font-medium text-cred-ink">
                      {wallet.metadata?.name || wallet.id}
                    </span>
                  </button>
                ))}
              </div>
              <div className="modal-action mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-4 rounded-xl text-cred-muted hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
