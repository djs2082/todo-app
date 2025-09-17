import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import './Robot.css'

export default function PasswordRobot({ hide = false }) {
  const controls = useAnimation()

  React.useEffect(() => {
    if (!hide) {
      controls.start({ rotate: [0, -18, 18, -12, 12, 0], transition: { repeat: Infinity, duration: 2 } })
    } else {
      controls.stop()
      controls.set({ rotate: 0 })
    }
  }, [hide, controls])

  return (
    <div className="robot-container">
      <div className="robot-wrapper">
        {/* Body */}
        <div className="robot-body-wrapper">
          <motion.div
            className="robot-body"
            initial={{ y: 10 }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Head */}
            <div className="robot-head">
              {/* Eyes */}
              <div className="robot-eyes">
                <motion.div
                  className="eye"
                  animate={hide ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.div
                  className="eye"
                  animate={hide ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18, delay: 0.02 }}
                />
              </div>

              {/* Hands that cover eyes */}
              <motion.div
                className="hand hand-left"
                initial={{ rotate: -12, x: -10, y: 0 }}
                animate={hide ? { x: 18, y: -20, rotate: -36 } : { x: -10, y: 0, rotate: -12 }}
                transition={{ type: 'spring', stiffness: 600, damping: 24 }}
              />
              <motion.div
                className="hand hand-right"
                initial={{ rotate: 12, x: 10, y: 0 }}
                animate={hide ? { x: -18, y: -20, rotate: 36 } : { x: 10, y: 0, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 600, damping: 24 }}
              />
            </div>

            {/* Torso */}
            <div className="robot-torso">
              <div className="torso-text">Passbot</div>
            </div>

            {/* Legs */}
            <div className="robot-legs">
              <div className="leg" />
              <div className="leg" />
            </div>
          </motion.div>
        </div>

        {/* Left arm (waving) */}
        <motion.div
          className="arm arm-left"
          animate={controls}
        >
          <div className="arm-segment">
            <div className="hand-end" />
          </div>
        </motion.div>

        {/* Right arm (static, also used to cover) */}
        <motion.div
          className="arm arm-right"
          animate={hide ? { rotate: -40, x: -10, y: -12 } : { rotate: 0, x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 22 }}
        >
          <div className="arm-segment">
            <div className="hand-end" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}