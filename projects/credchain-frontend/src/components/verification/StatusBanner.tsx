import { motion } from 'framer-motion'

interface StatusBannerProps {
  status: 'VERIFIED' | 'INVALID' | 'REVOKED'
}

export default function StatusBanner({ status }: StatusBannerProps) {
  const config = {
    VERIFIED: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: '✓',
      message: 'Credential Verified',
      sub: 'This credential has been verified on the blockchain.',
    },
    INVALID: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕',
      message: 'Credential Invalid',
      sub: 'This credential could not be verified.',
    },
    REVOKED: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: '!',
      message: 'Credential Revoked',
      sub: 'This credential has been revoked.',
    },
  }

  const { bg, border, text, icon, message, sub } = config[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bg} border ${border} rounded-2xl p-5`}
    >
      <div className="flex items-center gap-4">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold ${text} ${
            status === 'VERIFIED' ? 'bg-emerald-100' : status === 'INVALID' ? 'bg-red-100' : 'bg-amber-100'
          }`}
        >
          {icon}
        </motion.span>
        <div>
          <h3 className={`font-display font-bold text-lg ${text}`}>{message}</h3>
          <p className={`text-sm ${text} opacity-90`}>{sub}</p>
        </div>
      </div>
    </motion.div>
  )
}
