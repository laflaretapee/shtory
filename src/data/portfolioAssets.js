export const portfolioAssets = Array.from({ length: 18 }, (_, index) => {
  const id = String(index + 1).padStart(2, '0')
  return `media/portfolio/project-${id}.jpg`
})
