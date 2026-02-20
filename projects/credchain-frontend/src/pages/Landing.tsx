import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppNav from '../components/layout/AppNav'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Landing() {
  return (
    <div className="min-h-screen gradient-mesh relative overflow-hidden">
      {/* Soft orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-cred-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <AppNav />

      <div className="container mx-auto px-4 py-12 sm:py-20 relative">
        {/* Hero */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-20"
        >
          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight"
          >
            CredChain
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
          >
            Blockchain-Verified Credentials on Algorand
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/issuer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-white text-cred-primary shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Issuer Login
            </Link>
            <Link
              to="/student"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 border-white/80 text-white hover:bg-white/15 hover:border-white backdrop-blur-sm transition-all duration-200"
            >
              Student Login
            </Link>
          </motion.div>
        </motion.div>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 sm:p-10 mb-16 border border-white/10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: '1', title: 'Issue', description: 'Issuers upload certificates and mint them as ARC-3 NFTs on Algorand' },
              { step: '2', title: 'Receive', description: 'Students receive credentials directly to their Algorand wallet' },
              { step: '3', title: 'Verify', description: 'Anyone can verify credentials instantly via QR code or link' },
            ].map((card) => (
              <motion.div
                key={card.step}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white/15 rounded-2xl p-6 sm:p-8 text-center border border-white/10"
              >
                <div className="text-5xl font-display font-bold text-white/90 mb-4">{card.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm sm:text-base">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {[
            { icon: '🔒', title: 'Immutable', description: 'Credentials stored on-chain, cannot be tampered' },
            { icon: '⚡', title: 'Fast', description: '3.3-second finality on Algorand' },
            { icon: '🌐', title: 'Decentralized', description: 'No single point of failure' },
            { icon: '✅', title: 'Verifiable', description: 'Instant verification via blockchain' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-white/75 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <footer className="text-center text-white/50 text-sm">
          Built on Algorand • Powered by ARC-3 NFTs
        </footer>
      </div>
    </div>
  )
}
