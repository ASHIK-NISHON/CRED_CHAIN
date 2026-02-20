# CredChain Deployment Guide

## Prerequisites

✅ Step 1: Install Dependencies - **COMPLETED**
✅ Step 2: Configure Environment Variables - **COMPLETED**

## Step 3: Deploy Smart Contracts

### Option A: Using the Helper Script (Recommended)

```bash
cd projects/credchain-backend
npm install tsx --save-dev  # If not already installed
tsx scripts/deploy-contract.ts
```

The script will:
- Deploy the RevocationContract to TestNet
- Automatically update your `.env` file with the `REVOCATION_APP_ID`

### Option B: Manual Deployment

```bash
cd projects/credchain-contracts-ts
# Make sure DEPLOYER_MNEMONIC is set in environment
npm run deploy:ci revocation
```

After deployment, manually add the App ID to `projects/credchain-backend/.env`:
```env
REVOCATION_APP_ID=<app_id_from_deployment>
```

## Step 4: Update Revocation Contract Import

✅ **ALREADY COMPLETED** - The revocation contract client has been copied to the backend project and the import path is configured.

## Step 5: Run Development Servers

### Start Backend Server

```bash
cd projects/credchain-backend
npm run dev
```

The backend will run on `http://localhost:3001`

### Start Frontend Server

In a new terminal:

```bash
cd projects/credchain-frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Verify Setup

1. Open `http://localhost:5173` in your browser
2. You should see the CredChain landing page
3. Click "Issuer Login" to test the issuer dashboard
4. Connect your wallet (Pera/Defly/Exodus)

## Step 6: Production Deployment

### Frontend (Vercel)

The frontend is already configured for Vercel deployment:

```bash
cd projects/credchain-frontend
npm run ci:vercel:deploy
```

**Environment Variables to set in Vercel:**
- `VITE_ALGOD_NETWORK=testnet`
- `VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud`
- `VITE_BACKEND_URL=<your_backend_url>`
- `VITE_ALGORAND_EXPLORER=https://testnet.explorer.algorand.org`

### Backend (Vercel Functions or Separate Server)

**Option 1: Vercel Functions**

Create `api/index.ts` in the backend project and configure `vercel.json`:

```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  }
}
```

**Option 2: Separate Server (Recommended)**

Deploy to a Node.js hosting service (Railway, Render, etc.):

1. Set up PostgreSQL database
2. Update `DATABASE_URL` in production environment
3. Run Prisma migrations: `npm run prisma:migrate`
4. Set all environment variables
5. Deploy the built application

**Production Environment Variables:**
```env
# Algorand
ALGORAND_NETWORK=testnet
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_TOKEN=
DEPLOYER_MNEMONIC=<your_mnemonic>

# Pinata IPFS
PINATA_JWT=<your_pinata_jwt>
NEXT_PUBLIC_PINATA_GATEWAY=<your_gateway_url>

# Database (PostgreSQL for production)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# App
PORT=3001
FRONTEND_URL=https://your-frontend-url.vercel.app

# Issuer Allowlist
ISSUER_ALLOWLIST=<comma_separated_addresses>

# Revocation Contract
REVOCATION_APP_ID=<deployed_app_id>
```

## Troubleshooting

### Backend won't start
- Check that all dependencies are installed: `npm install`
- Verify `.env` file exists and has all required variables
- Run Prisma generate: `npm run prisma:generate`

### Frontend can't connect to backend
- Verify `VITE_BACKEND_URL` matches your backend URL
- Check CORS settings in backend
- Ensure backend is running

### Contract deployment fails
- Verify `DEPLOYER_MNEMONIC` is set correctly
- Check that deployer account has sufficient ALGO for fees
- Ensure you're connected to TestNet

### IPFS uploads fail
- Verify `PINATA_JWT` is valid
- Check Pinata account status
- Verify gateway URL is correct

## Next Steps After Deployment

1. **Test Credential Issuance**
   - Connect issuer wallet
   - Upload a test certificate
   - Issue a credential to a test student address
   - Verify the NFT appears in student wallet

2. **Test Verification**
   - Copy the asset ID from issued credential
   - Visit `/verify/<assetId>` page
   - Verify status shows as "VERIFIED"

3. **Test Revocation**
   - Call revocation contract method
   - Verify credential shows as "REVOKED"

4. **Monitor**
   - Check backend logs for errors
   - Monitor Algorand explorer for transactions
   - Verify IPFS uploads are accessible
