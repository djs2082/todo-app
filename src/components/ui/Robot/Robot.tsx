import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import './Robot.css'
import { useTheme } from '../../../context/ThemeContext'

export default function PasswordRobot({ hide = false }) {
  const controls = useAnimation()

  React.useEffect(() => {
    if (!hide) {
      // Start gentle rotation when visible
      controls.start({ rotate: [0, -5, 5, -3, 3, 0], transition: { repeat: Infinity, duration: 2 } })
    } else {
      // Stop animation when hidden
      controls.stop()
      controls.set({ rotate: 0 })
    }
  }, [hide, controls])

  return (
    <div className="robot-container">
      <motion.div className="robot-wrapper" animate={controls}>
        {/* Circle around the head */}
        <div className={`robot-circle ${hide ? 'shutter-down' : ''}`}>
          {/* NPM-style shutter that slides down when hide is true */}
          <motion.div 
            className="robot-shutter"
            initial={{ y: -160 }}
            animate={{ y: hide ? 0 : -160 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 30
            }}
          >
            <div className="npm-logo-container">
              <div className="shutter-strip">
                <span className="shutter-strip-text">KARYA</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Head */}
        <div className="robot-head">
          {/* Face */}
          <div className="robot-face">
            {/* Eyes and mouth */}
            <div className="face-elements">
              <motion.div
                className="eye"
                animate={hide ? 
                  { opacity: 0, scale: 0.8 } : 
                  { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="mouth"
                animate={hide ? 
                  { opacity: 0, scaleX: 0.6 } : 
                  { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="eye"
                animate={hide ? 
                  { opacity: 0, scale: 0.8 } : 
                  { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.2, delay: 0.05 }}
              />
            </div>

            {/* Hands that cover eyes - now move down when hiding as shutter comes down */}
            <motion.div
              className="cover-hand left"
              initial={{ y: 0, x: 0 }}
              animate={hide ? 
                { y: 20, x: 0, opacity: 0 } : 
                { y: 0, x: 0, opacity: 1 }
              }
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <motion.div
              className="cover-hand right"
              initial={{ y: 0, x: 0 }}
              animate={hide ? 
                { y: 20, x: 0, opacity: 0 } : 
                { y: 0, x: 0, opacity: 1 }
              }
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
