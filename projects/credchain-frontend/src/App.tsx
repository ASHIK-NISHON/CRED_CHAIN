import { SupportedWallet, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import Landing from './pages/Landing'
import IssuerDashboard from './pages/IssuerDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Verification from './pages/Verification'
import ClaimCredential from './pages/ClaimCredential'

let supportedWallets: SupportedWallet[]
if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  supportedWallets = [
    { id: WalletId.PERA },
    { id: WalletId.DEFLY },
    { id: WalletId.EXODUS },
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  supportedWallets = [
    { id: WalletId.PERA },
    { id: WalletId.DEFLY },
    { id: WalletId.EXODUS },
  ]
}

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/issuer" element={<IssuerDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/verify/:assetId" element={<Verification />} />
            <Route path="/claim/:assetId" element={<ClaimCredential />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </SnackbarProvider>
  )
}
