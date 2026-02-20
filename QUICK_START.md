# CredChain Quick Start Guide

## 🚀 Quick Start (After Steps 1 & 2 Completed)

### Step 3: Deploy Contracts

```bash
cd projects/credchain-backend
npm install tsx --save-dev
tsx scripts/deploy-contract.ts
```

This will deploy the revocation contract and automatically update your `.env` file.

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd projects/credchain-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd projects/credchain-frontend
npm run dev
```

### Step 5: Test the Application

1. Open `http://localhost:5173`
2. Click "Issuer Login"
3. Connect your wallet (Pera/Defly/Exodus)
4. Fill out the credential issuance form
5. Upload a certificate file
6. Click "Mint Credential"
7. Wait for the transaction to complete
8. View the credential on the student dashboard

## 📝 Important Notes

- **Backend builds successfully** ✅
- **Frontend builds successfully** ✅
- **Revocation contract import fixed** ✅
- **All TypeScript errors resolved** ✅

## 🔗 Useful Links

- Backend API: http://localhost:3001
- Frontend: http://localhost:5173
- Health Check: http://localhost:3001/health
- Algorand TestNet Explorer: https://testnet.explorer.algorand.org

## ⚠️ Before Production

1. Deploy contracts to TestNet (Step 3)
2. Set `REVOCATION_APP_ID` in backend `.env`
3. Test all flows thoroughly
4. Set up production database (PostgreSQL)
5. Configure production environment variables
6. Deploy backend to hosting service
7. Deploy frontend to Vercel

See `DEPLOYMENT_GUIDE.md` for detailed production deployment instructions.
