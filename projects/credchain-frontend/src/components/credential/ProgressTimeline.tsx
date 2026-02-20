import { motion } from 'framer-motion'

interface ProgressTimelineProps {
  steps: string[]
}

export default function ProgressTimeline({ steps }: ProgressTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-cred p-6"
    >
      <h3 className="font-display text-xl font-semibold text-cred-ink mb-4">Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-start gap-3"
          >
            <span
              className={`mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full ${
                step.startsWith('Error') ? 'bg-red-400' : 'bg-emerald-500'
              }`}
            />
            <p
              className={`flex-1 text-sm ${
                step.startsWith('Error') ? 'text-red-600' : 'text-cred-ink'
              }`}
            >
              {step}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
