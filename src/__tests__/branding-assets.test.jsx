import fs from 'node:fs'
import path from 'node:path'

test('app loads branding overrides for the logo asset', () => {
  const main = fs.readFileSync(path.resolve(process.cwd(), 'src/main.jsx'), 'utf8')
  const css = fs.readFileSync(path.resolve(process.cwd(), 'src/styles/branding.css'), 'utf8')
  const logoData = fs.readFileSync(path.resolve(process.cwd(), 'src/branding/logoData.js'), 'utf8')

  expect(main).toContain("import './styles/branding.css'")
  expect(main).toContain("import { brandLogoDataUri } from './branding/logoData'")
  expect(main).toContain("document.querySelector('link[rel=\"icon\"]')")
  expect(main).toContain('brandLogoDataUri')
  expect(css).toContain('background-image: var(--brand-logo-image);')
  expect(css).toContain('.brand {')
  expect(css).toContain('.brand-mark,')
  expect(css).toContain('.brand-name {')
  expect(logoData).toContain("export const brandLogoDataUri = 'data:image/png;base64,")
  expect(logoData).toContain('iVBOR')
})

test('index keeps a favicon link that runtime branding can replace', () => {
  const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8')

  expect(html).toContain('<link rel="icon" type="image/svg+xml" href="./favicon.svg" />')
})
