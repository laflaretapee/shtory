import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function Hero({ hero }) {
  const assetBase = import.meta.env.BASE_URL
  const { scrollY } = useScroll()
  const mediaScale = useTransform(scrollY, [0, 420], [1, 1.06])
  const mediaY = useTransform(scrollY, [0, 420], [0, 24])

  return (
    <section className="hero-section" id="hero">
      <motion.div className="hero-media" aria-hidden="true" style={{ scale: mediaScale, y: mediaY }}>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${assetBase}og-image.svg`}
        >
          <source src={`${assetBase}media/hero-curtains.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </motion.div>

      <div className="container hero-inner">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.p className="eyebrow" variants={itemVariants}>
            {hero.eyebrow}
          </motion.p>
          <motion.h1 variants={itemVariants}>{hero.title}</motion.h1>
          <motion.p className="hero-text" variants={itemVariants}>
            {hero.description}
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <Link className="button" to={hero.primaryCta.to}>
              {hero.primaryCta.label}
            </Link>
            <Link className="button button-secondary button-light" to={hero.secondaryCta.to}>
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.ul className="hero-trust" aria-label="Преимущества на первом экране" variants={itemVariants}>
            {hero.trustBadges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
