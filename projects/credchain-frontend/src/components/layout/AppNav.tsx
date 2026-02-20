import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import WalletConnect from '../wallet/WalletConnect'

interface AppNavProps {
  showWallet?: boolean
}

export default function AppNav({ showWallet = true }: AppNavProps) {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isLanding
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/10'
          : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className={`font-display font-bold text-xl tracking-tight transition-colors ${
            isLanding ? 'text-white hover:text-white/90' : 'text-cred-ink hover:text-cred-primary'
          }`}
        >
          CredChain
        </Link>
        <div className="flex items-center gap-4">
          {!isLanding && (
            <div className="flex gap-1 text-sm">
              <Link
                to="/issuer"
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/issuer'
                    ? 'bg-cred-primary/10 text-cred-primary'
                    : 'text-cred-muted hover:text-cred-ink hover:bg-slate-100'
                }`}
              >
                Issuer
              </Link>
              <Link
                to="/student"
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/student'
                    ? 'bg-cred-primary/10 text-cred-primary'
                    : 'text-cred-muted hover:text-cred-ink hover:bg-slate-100'
                }`}
              >
                Student
              </Link>
            </div>
          )}
          {showWallet && <WalletConnect required={!isLanding} />}
        </div>
      </div>
    </motion.nav>
  )
}
