import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import algosdk from 'algosdk'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { verifyCredential, transferCredentialToStudent } from '../lib/api/verification'
import type { VerificationResult } from '../lib/api/verification'
import AppNav from '../components/layout/AppNav'
import WalletConnect from '../components/wallet/WalletConnect'

export default function ClaimCredential() {
  const { assetId } = useParams<{ assetId: string }>()
  const navigate = useNavigate()
  const { activeAddress, signTransactions } = useWallet()
  const { enqueueSnackbar } = useSnackbar()
  const [credential, setCredential] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    if (assetId) {
      loadCredential()
    }
  }, [assetId])

  const loadCredential = async () => {
    if (!assetId) return

    setLoading(true)
    try {
      const result = await verifyCredential(assetId)
      setCredential(result)
    } catch (error) {
      console.error('Failed to load credential:', error)
      enqueueSnackbar('Failed to load credential', { variant: 'error' })
      setCredential({ status: 'INVALID', assetId: assetId!, error: 'Failed to load' })
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async () => {
    if (!assetId || !activeAddress || !credential?.credential) return

    const studentAddress = credential.credential.studentAddress || activeAddress
    if (studentAddress !== activeAddress) {
      enqueueSnackbar(
        `This credential was issued to a different address. Connect the wallet for ${credential.credential.studentName}.`,
        { variant: 'warning' }
      )
      return
    }

    setClaiming(true)
    try {
      const algorand = AlgorandClient.fromEnvironment()
      const algod = algorand.client.algod

      // 1. Create and sign opt-in transaction
      const params = await algod.getTransactionParams().do()
      const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: activeAddress,
        amount: 0n,
        assetIndex: parseInt(assetId),
        suggestedParams: params,
      })
      const txnBytes = algosdk.encodeUnsignedTransaction(optInTxn)
      const signed = await signTransactions([txnBytes], [0])
      const signedTxn = signed?.[0]
      if (!signedTxn) throw new Error('Failed to sign opt-in transaction')
      const sendResult = await algod.sendRawTransaction(signedTxn).do()
      const optInTxId = (sendResult as { txId?: string }).txId
      if (!optInTxId) throw new Error('No transaction ID returned')
      await algosdk.waitForConfirmation(algod as algosdk.Algodv2, optInTxId, 10)

      // 2. Backend transfers NFT to student
      const { txId } = await transferCredentialToStudent(assetId, activeAddress)

      enqueueSnackbar('Credential claimed successfully!', { variant: 'success' })
      navigate('/student')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string }
      const message = err.response?.data?.error || err.message || 'Failed to claim credential'
      enqueueSnackbar(message, { variant: 'error' })
    } finally {
      setClaiming(false)
    }
  }

  return (
    <div className="min-h-screen bg-cred-surface">
      <AppNav />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-cred-ink mb-6">
          Claim Credential
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="loading loading-spinner loading-lg text-cred-primary" />
            <p className="mt-4 text-cred-muted">Loading credential...</p>
          </div>
        ) : !credential ? (
          <div className="card-cred p-8 text-center">
            <p className="text-cred-muted">Credential not found</p>
          </div>
        ) : credential.status === 'INVALID' ? (
          <div className="card-cred p-8">
            <h2 className="font-display text-xl font-semibold text-cred-ink mb-2">
              Invalid Credential
            </h2>
            <p className="text-cred-muted">{credential.error || 'This credential could not be verified.'}</p>
          </div>
        ) : credential.status === 'REVOKED' ? (
          <div className="card-cred p-8">
            <h2 className="font-display text-xl font-semibold text-cred-ink mb-2">
              Credential Revoked
            </h2>
            <p className="text-cred-muted">This credential has been revoked and cannot be claimed.</p>
          </div>
        ) : !activeAddress ? (
          <div className="card-cred p-8 text-center">
            <p className="text-cred-muted mb-4">Connect your wallet to claim this credential</p>
            <WalletConnect required />
            {credential.credential && (
              <p className="text-sm text-cred-muted mt-4">
                Issued to: {credential.credential.studentName}
              </p>
            )}
          </div>
        ) : credential.credential?.studentAddress !== activeAddress ? (
          <div className="card-cred p-8">
            <h2 className="font-display text-xl font-semibold text-cred-ink mb-2">
              Wrong Wallet
            </h2>
            <p className="text-cred-muted">
              This credential was issued to {credential.credential?.studentName}. Connect the wallet
              for that address to claim.
            </p>
          </div>
        ) : (
          <div className="card-cred p-8">
            <h2 className="font-display text-2xl font-bold text-cred-ink mb-4">
              {credential.credential?.title}
            </h2>
            <p className="text-cred-muted mb-4">
              Issued to: {credential.credential?.studentName}
            </p>
            <p className="text-cred-muted text-sm mb-6">
              Click below to accept this credential. You will sign an opt-in transaction, then the
              credential will be transferred to your wallet.
            </p>
            <button
              onClick={handleClaim}
              disabled={claiming}
              className="btn-cred w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {claiming ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Claiming...
                </>
              ) : (
                'Accept Credential'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
