# CredChain – Important .env Variables

## Backend (`credchain-backend/.env`)

| Variable | Required? | What to set |
|----------|-----------|-------------|
| **DATABASE_URL** | ✅ Yes | SQLite: `file:./dev.db` |
| **PINATA_JWT** | ✅ Yes (for minting) | JWT from [Pinata](https://app.pinata.cloud) → API Keys. Needed to upload certificates to IPFS. |
| **ALGOD_SERVER** | ✅ Yes | TestNet: `https://testnet-api.algonode.cloud` · LocalNet: `http://localhost` |
| **ALGOD_TOKEN** | Optional | Leave **empty** for Algonode. Only set for private nodes. |
| **PORT** | Optional | Default `3001`. Backend runs on this port. |
| **FRONTEND_URL** | Optional | Default `http://localhost:5173`. CORS origin for the frontend. |
| **ISSUER_ALLOWLIST** | ✅ Yes | Comma-separated Algorand addresses allowed to issue. Use digit `0` not letter `O`. |
| **DISPENSER_MNEMONIC** or **ISSUER_MNEMONIC** | ✅ For TestNet/MainNet | 25-word recovery phrase of **one** issuer in ISSUER_ALLOWLIST. Not needed for LocalNet. |
| **NEXT_PUBLIC_PINATA_GATEWAY** | Optional | Pinata gateway URL for IPFS links. Default `https://gateway.pinata.cloud`. |
| **REVOCATION_APP_ID** | Optional | Only if using on-chain revocation contract. |
| **KMD_SERVER**, **KMD_PORT**, **KMD_TOKEN** | For LocalNet only | Set when using LocalNet so backend can use KMD (no mnemonic). |

---

## Frontend (`credchain-frontend/.env`)

| Variable | Required? | What to set |
|----------|-----------|-------------|
| **VITE_BACKEND_URL** | ✅ Yes | Backend API URL, e.g. `http://localhost:3001`. |
| **VITE_ALGOD_SERVER** | ✅ Yes | Same network as backend: TestNet `https://testnet-api.algonode.cloud` or LocalNet `http://localhost`. |
| **VITE_ALGOD_PORT** | Depends | LocalNet: `4001`. TestNet: leave empty or omit. |
| **VITE_ALGOD_TOKEN** | Optional | LocalNet: long `a` string. TestNet: leave empty. |
| **VITE_ALGOD_NETWORK** | ✅ Yes | `localnet` or `testnet` (or `mainnet`). |
| **VITE_INDEXER_SERVER**, **VITE_INDEXER_PORT**, **VITE_INDEXER_TOKEN** | For indexer features | LocalNet: localhost + port 8980. TestNet: e.g. `https://testnet-idx.algonode.cloud`. |
| **VITE_KMD_*** | For LocalNet only | Needed only when **VITE_ALGOD_NETWORK=localnet** (KMD server, port, token, wallet, password). |
| **VITE_ALGORAND_EXPLORER** | Optional | Explorer link for tx/address. Default TestNet explorer. |

---

## Quick setup by scenario

### TestNet (Pera Wallet, no Docker)

**Backend `.env`**
- `DATABASE_URL=file:./dev.db`
- `PINATA_JWT=<your Pinata JWT>`
- `ALGOD_SERVER=https://testnet-api.algonode.cloud`
- `ALGOD_TOKEN=` (empty)
- `ISSUER_ALLOWLIST=<your issuer address>`
- `DISPENSER_MNEMONIC="word1 word2 ... word25"` (that issuer’s 25-word phrase)

**Frontend `.env`**
- `VITE_BACKEND_URL=http://localhost:3001`
- `VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud`
- `VITE_ALGOD_PORT=` (empty)
- `VITE_ALGOD_NETWORK=testnet`

### LocalNet (Docker, no mnemonic)

**Backend `.env`**
- `DATABASE_URL=file:./dev.db`
- `PINATA_JWT=<your Pinata JWT>`
- `ALGOD_SERVER=http://localhost`
- `ALGOD_PORT=4001`
- `KMD_SERVER=http://localhost`
- `KMD_PORT=4002`
- `KMD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
- `ISSUER_ALLOWLIST=` can be empty (signer = LocalNet dispenser)

**Frontend `.env`**
- Use the LocalNet block from `.env.template` (algod, indexer, KMD, and `VITE_ALGOD_NETWORK=localnet`).
- `VITE_BACKEND_URL=http://localhost:3001`

---

**Security:** Never commit real `.env` files or mnemonics. Add `.env` to `.gitignore` if not already.
