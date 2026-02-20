# CredChain

**Blockchain-verified credentials on Algorand.** Issue, hold, and verify tamper-proof credentials as ARC-3 NFTs with optional on-chain revocation.

---

## Features

### For issuers

- **Issue credentials as NFTs** — Upload a certificate (PDF/image), add student details and dates, and mint an ARC-3 NFT on Algorand. Certificates and metadata are stored on IPFS (Pinata); the NFT points to the metadata URL.
- **Issuer allowlist** — Backend restricts issuance to a configurable list of Algorand addresses. Only allowlisted issuers can call the issue API.
- **Progress feedback** — Step-by-step progress (validate issuer → IPFS upload → metadata → mint → DB) so you see exactly where issuance is in the pipeline.
- **Wallet-based auth** — Connect with Pera, Defly, or Exodus (or LocalNet KMD). The backend signs minting with a configured issuer wallet; the connected wallet must match that signer.

### For students

- **Receive credentials in your wallet** — Credentials are sent to the student’s Algorand address. Students view their holdings on the **My Credentials** dashboard (assets loaded from chain).
- **Share & verify** — Generate a QR code or copy a verification link (`/verify/:assetId`) to share with employers or verifiers. No login required to verify.

### For verifiers

- **Instant verification** — Open a link or scan a QR to get a **VERIFIED**, **REVOKED**, or **INVALID** result. Verification checks:
  - Asset exists on-chain  
  - Credential record in database  
  - Issuer in allowlist (if configured)  
  - Revocation status (DB + optional on-chain revocation app)
- **Rich result** — When verified, view student name, title, description, dates, issuer, certificate URL, metadata URL, and transaction hash with links to Algorand Explorer.

### Platform & tech

- **ARC-3 compliant** — Credential NFTs follow [ARC-3](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md) (name, description, image URL, properties for student/issuer/dates).
- **IPFS via Pinata** — Certificates and metadata JSON are pinned to IPFS; gateway URLs are stored and exposed for verification.
- **Optional on-chain revocation** — Revocation can be tracked in the database and/or via a dedicated Algorand app (`REVOCATION_APP_ID`). Verification consults both.
- **Multi-network** — Frontend supports **LocalNet**, **TestNet**, and **MainNet** (configurable via env). Backend uses Algorand (TestNet/MainNet) and Pinata.
- **Modern stack** — React (Vite) + TypeScript, Tailwind + DaisyUI, Framer Motion; Express + Prisma (SQLite); AlgoKit Utils and generated contract clients for Algorand.

---

## Project structure

```
credchain/
├── projects/
│   ├── credchain-frontend/   # React + Vite, wallet connect, issuer/student/verify UIs
│   └── credchain-backend/   # Express API, Prisma, IPFS, Algorand minting & verification
├── README.md
└── ...
```

- **Frontend**: Landing, Issuer Dashboard (issue), Student Dashboard (my credentials), Verification page (`/verify/:assetId`). Wallet: Pera, Defly, Exodus; LocalNet can use KMD.
- **Backend**: REST API for issue, verify, share (QR), and optional IPFS upload; Prisma models: `Issuer`, `Credential`, `Revocation`; Algorand client for minting and (optional) revocation contract.

---

## Prerequisites

- **Node.js** ≥ 20 and **npm** ≥ 9  
- **Algorand**: For TestNet/MainNet use AlgoNode or your own algod; for LocalNet use AlgoKit (`algokit localnet start`)  
- **Pinata** account (for IPFS) — create a JWT at [pinata.cloud](https://pinata.cloud)  
- **Issuer wallet**: For TestNet/MainNet, an Algorand account whose address is in `ISSUER_ALLOWLIST` and whose mnemonic is in `DISPENSER_MNEMONIC` (backend signs with this)

---

## Quick start

### 1. Backend

```bash
cd projects/credchain-backend
# Create .env with the variables listed in the Configuration section below
npm install
npx prisma generate
npx prisma migrate dev   # creates SQLite DB and tables
npm run dev              # http://localhost:3001
```

### 2. Frontend

```bash
cd projects/credchain-frontend
npm install
npm run dev   # http://localhost:5173
```

### 3. Use the app

- Open **http://localhost:5173**
- **Issuer**: Connect wallet (must match backend signer if allowlist is used) → Issuer Login → fill form, upload certificate → Issue. Then share the verification link or QR.
- **Student**: Connect wallet → Student Login → see credentials (NFTs) in your wallet.
- **Verify**: Open `/verify/<assetId>` or scan the generated QR.

---

## Configuration

### Backend (`projects/credchain-backend/.env`)

| Variable | Purpose |
|----------|--------|
| `ALGORAND_NETWORK` | `testnet` or `mainnet` |
| `ALGOD_SERVER` | Algod URL (e.g. AlgoNode TestNet) |
| `ALGOD_TOKEN` | Algod API token (empty for public nodes) |
| `PINATA_JWT` | Pinata JWT for IPFS uploads |
| `NEXT_PUBLIC_PINATA_GATEWAY` | Pinata gateway host (e.g. `xxx.mypinata.cloud`) |
| `DATABASE_URL` | Prisma DB URL (e.g. `file:./dev.db`) |
| `PORT` | API port (default `3001`) |
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |
| `ISSUER_ALLOWLIST` | Comma-separated Algorand addresses allowed to issue |
| `DISPENSER_MNEMONIC` | 25-word mnemonic of the wallet that signs minting (TestNet/MainNet) |
| `REVOCATION_APP_ID` | (Optional) On-chain revocation app ID |

### Frontend (`projects/credchain-frontend/.env`)

Use the existing `.env` blocks for **LocalNet**, **TestNet**, or **MainNet**. Key variables:

- `VITE_ENVIRONMENT` — `local` \| `testnet` \| `production`
- `VITE_BACKEND_URL` — Backend API (e.g. `http://localhost:3001`)
- `VITE_ALGOD_*`, `VITE_INDEXER_*` — Algod and indexer (and for LocalNet, `VITE_KMD_*`)

---

## API overview

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/agents/issue` | Issue credential (body: issuerAddress, studentAddress, studentName, title, issueDate, certificateFile, certificateFileName, optional description, expiryDate) |
| `GET`  | `/api/agents/verify/:assetId` | Verify credential; returns status and details |
| `POST` | `/api/agents/share` | Generate QR and verification URL for an asset (body: `assetId`) |
| `POST` | `/api/ipfs/upload` | Upload file to IPFS (body: file, fileName) |
| `GET`  | `/health` | Health check |

---

## Development

- **Backend**
  - `npm run dev` — run with `tsx watch`
  - `npm run build` / `npm start` — compile and run
  - `npx prisma studio` — inspect SQLite data
- **Frontend**
  - `npm run dev` — Vite dev server
  - `npm run build` — production build
  - `npm run generate:app-clients` — regenerate Algorand app clients (e.g. revocation) if contract specs change

---

## License

ISC (see `projects/credchain-backend/package.json`).
