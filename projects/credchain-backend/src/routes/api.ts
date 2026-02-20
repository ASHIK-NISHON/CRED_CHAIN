import express from 'express'
import { issueCredential, transferCredential } from '../lib/services/credentialService.js'
import { verifyCredential } from '../lib/services/verificationService.js'
import { generateShareQR } from '../lib/services/shareService.js'
import { uploadToIPFS } from '../lib/ipfs/pinata.js'
import { prisma } from '../lib/db/client.js'

export const apiRouter = express.Router()

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred'
}

// Credential issuance endpoint
apiRouter.post('/agents/issue', async (req, res) => {
  try {
    const body = req.body
    if (!body?.issuerAddress || !body?.studentAddress || !body?.studentName || !body?.title || !body?.issueDate) {
      res.status(400).json({ error: 'Missing required fields: issuerAddress, studentAddress, studentName, title, issueDate' })
      return
    }
    if (!body?.certificateFile || !body?.certificateFileName) {
      res.status(400).json({ error: 'Certificate file is required. Please upload a PDF or image.' })
      return
    }
    const result = await issueCredential(body)
    res.json(result)
  } catch (error) {
    console.error('Issue credential error:', error)
    const message = getErrorMessage(error) || 'Failed to issue credential'
    const isInsufficientFunds =
      message.toLowerCase().includes('insufficient algo') ||
      message.toLowerCase().includes('overspend') ||
      message.toLowerCase().includes('microalgos:{raw:0}')
    if (isInsufficientFunds) {
      res.status(400).json({
        error:
          message.includes('Fund your issuer wallet')
            ? message
            : 'Insufficient ALGO in issuer account. Fund your issuer wallet on TestNet: https://bank.testnet.algorand.network/',
      })
      return
    }
    res.status(500).json({ error: message })
  }
})

// Get credentials by asset IDs (for student dashboard)
apiRouter.get('/agents/credentials', async (req, res) => {
  try {
    const assetIds = req.query.assetIds
    if (!assetIds || typeof assetIds !== 'string') {
      res.status(400).json({ error: 'assetIds query param (comma-separated) is required' })
      return
    }
    const ids = assetIds.split(',').map((id) => id.trim()).filter(Boolean)
    if (ids.length === 0) {
      res.json([])
      return
    }
    const credentials = await prisma.credential.findMany({
      where: { assetId: { in: ids } },
      include: { issuer: true },
    })
    const result = credentials.map((c) => ({
      assetId: c.assetId,
      title: c.title,
      studentName: c.studentName,
      studentAddress: c.studentAddress,
      issueDate: c.issueDate.toISOString(),
      issuerAddress: c.issuerAddress,
    }))
    res.json(result)
  } catch (error) {
    console.error('Get credentials error:', error)
    res.status(500).json({ error: getErrorMessage(error) || 'Failed to get credentials' })
  }
})

// Verification endpoint
apiRouter.get('/agents/verify/:assetId', async (req, res) => {
  try {
    const { assetId } = req.params
    if (!assetId) {
      res.status(400).json({ error: 'assetId is required' })
      return
    }
    const result = await verifyCredential(assetId)
    res.json(result)
  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ error: getErrorMessage(error) || 'Failed to verify credential' })
  }
})

// Transfer credential to student (student must have opted in first via /claim/:assetId)
apiRouter.post('/agents/credentials/:assetId/transfer', async (req, res) => {
  try {
    const { assetId } = req.params
    const { studentAddress } = req.body
    if (!assetId || !studentAddress || typeof studentAddress !== 'string') {
      res.status(400).json({ error: 'assetId (param) and studentAddress (body) are required' })
      return
    }
    const result = await transferCredential(assetId, studentAddress)
    res.json(result)
  } catch (error) {
    console.error('Transfer credential error:', error)
    const message = getErrorMessage(error) || 'Failed to transfer credential'
    if (message.includes('opted in') || message.includes('opt')) {
      res.status(400).json({ error: 'Student must opt in first. Visit the claim page and click Accept.' })
      return
    }
    res.status(500).json({ error: message })
  }
})

// Share/QR generation endpoint
apiRouter.post('/agents/share', async (req, res) => {
  try {
    const { assetId } = req.body
    if (!assetId || typeof assetId !== 'string') {
      res.status(400).json({ error: 'assetId (string) is required in body' })
      return
    }
    const result = await generateShareQR(assetId)
    res.json(result)
  } catch (error) {
    console.error('Share generation error:', error)
    res.status(500).json({ error: getErrorMessage(error) || 'Failed to generate share' })
  }
})

// IPFS upload endpoint
apiRouter.post('/ipfs/upload', async (req, res) => {
  try {
    const { file, fileName } = req.body
    if (file === undefined || !fileName || typeof fileName !== 'string') {
      res.status(400).json({ error: 'file and fileName (string) are required in body' })
      return
    }
    const result = await uploadToIPFS(file, fileName)
    res.json(result)
  } catch (error) {
    console.error('IPFS upload error:', error)
    res.status(500).json({ error: getErrorMessage(error) || 'Failed to upload to IPFS' })
  }
})
