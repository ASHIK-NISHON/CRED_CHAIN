import { useEffect, useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { motion, AnimatePresence } from 'framer-motion'
import AppNav from '../components/layout/AppNav'
import WalletConnect from '../components/wallet/WalletConnect'
import CredentialCard from '../components/credential/CredentialCard'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { getCredentialsByAssetIds } from '../lib/api/verification'

interface Credential {
  assetId: string
  title: string
  studentName: string
  issueDate: string
  issuerAddress: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function StudentDashboard() {
  const { activeAddress } = useWallet()
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeAddress) {
      loadCredentials()
    }
  }, [activeAddress])

  const loadCredentials = async () => {
    if (!activeAddress) return

    setLoading(true)
    try {
      const algorand = AlgorandClient.fromEnvironment()
      const accountInfo = await algorand.client.algod.accountInformation(activeAddress).do()

      const assets = accountInfo.assets || []
      const assetIds = assets
        .filter((a) => Number(a.amount) > 0)
        .map((a) => String(a.assetId))

      let credentialList: Credential[]
      if (assetIds.length > 0) {
        const dbCreds = await getCredentialsByAssetIds(assetIds)
        const credMap = new Map(dbCreds.map((c) => [c.assetId, c]))
        credentialList = assetIds.map((id) => {
          const c = credMap.get(id)
          return c
            ? { ...c }
            : {
                assetId: id,
                title: `Credential #${id}`,
                studentName: 'Student',
                issueDate: new Date().toISOString(),
                issuerAddress: activeAddress,
              }
        })
      } else {
        credentialList = []
      }

      setCredentials(credentialList)
    } catch (error) {
      console.error('Failed to load credentials:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cred-surface">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-cred-ink mb-8"
        >
          My Credentials
        </motion.h1>

        {!activeAddress ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-cred p-8 sm:p-12 text-center"
          >
            <p className="text-cred-muted mb-4">
              Connect your wallet to view your credentials
            </p>
            <WalletConnect required />
          </motion.div>
        ) : loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <span className="loading loading-spinner loading-lg text-cred-primary" />
            <p className="mt-4 text-cred-muted">Loading credentials...</p>
          </motion.div>
        ) : credentials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-cred p-12 text-center"
          >
            <div className="text-5xl mb-4 opacity-60">📜</div>
            <p className="text-cred-ink font-medium text-lg">No credentials yet</p>
            <p className="text-cred-muted mt-1">Your issued credentials will appear here</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {credentials.map((credential) => (
                <motion.div key={credential.assetId} variants={cardItem}>
                  <CredentialCard {...credential} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
