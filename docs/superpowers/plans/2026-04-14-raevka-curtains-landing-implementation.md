# Raevka Curtains Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready React landing page for a custom curtain business in Raevka / Raevsky with premium UI, full Russian copy, lead form, SEO content, and responsive behavior.

**Architecture:** The landing will use a Vite + React single-page app with a centralized content model for copy, SEO metadata, FAQ, testimonials, and temporary contact data. The page will be composed from focused section components and styled with a single design-token-driven CSS layer. Testing will use Vitest + React Testing Library for critical rendering and interaction flows.

**Tech Stack:** Vite, React, Vitest, React Testing Library, CSS, JSON-LD schema, local hero video asset

---

### Task 1: Bootstrap The React App And Test Harness

**Files:**
- Create: `shtory/package.json`
- Create: `shtory/vite.config.js`
- Create: `shtory/index.html`
- Create: `shtory/src/main.jsx`
- Create: `shtory/src/App.jsx`
- Create: `shtory/src/styles/global.css`
- Create: `shtory/src/test/setup.js`
- Create: `shtory/src/__tests__/app-shell.test.jsx`
- Create: `shtory/public/media/hero-curtains.mp4`

- [ ] **Step 1: Create the project configuration**

```json
{
  "name": "shtory-raevka-landing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.4",
    "vite": "^5.4.10"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`  
Expected: installation completes without errors and creates `package-lock.json`

- [ ] **Step 3: Add the first failing test for the landing shell**

```jsx
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders the main landing headline and primary CTA', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /шторы на заказ в раевке и раевском/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('link', { name: /заказать замер/i }),
  ).toBeInTheDocument()
})
```

- [ ] **Step 4: Run the test and verify RED**

Run: `npm test -- src/__tests__/app-shell.test.jsx`  
Expected: FAIL because `App` does not yet render the landing headline and CTA

- [ ] **Step 5: Create the minimal app shell**

```jsx
export default function App() {
  return (
    <main>
      <h1>Шторы на заказ в Раевке и Раевском</h1>
      <a href="#lead-form">Заказать замер</a>
    </main>
  )
}
```

- [ ] **Step 6: Run the test and verify GREEN**

Run: `npm test -- src/__tests__/app-shell.test.jsx`  
Expected: PASS

- [ ] **Step 7: Copy and normalize the hero asset**

Run: `cp "Website_hero_animation_202604141452 (online-video-cutter.com).mp4" public/media/hero-curtains.mp4`  
Expected: file exists at `public/media/hero-curtains.mp4`

- [ ] **Step 8: Commit the bootstrap**

```bash
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing add shtory/package.json shtory/package-lock.json shtory/vite.config.js shtory/index.html shtory/src/main.jsx shtory/src/App.jsx shtory/src/styles/global.css shtory/src/test/setup.js shtory/src/__tests__/app-shell.test.jsx shtory/public/media/hero-curtains.mp4
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing commit -m "feat: bootstrap react landing app"
```

### Task 2: Build The Content Model And Core Landing Sections

**Files:**
- Create: `shtory/src/data/siteContent.js`
- Create: `shtory/src/components/Header.jsx`
- Create: `shtory/src/components/Hero.jsx`
- Create: `shtory/src/components/TrustBar.jsx`
- Create: `shtory/src/components/BenefitsSection.jsx`
- Create: `shtory/src/components/CatalogSection.jsx`
- Create: `shtory/src/components/ServicesSection.jsx`
- Create: `shtory/src/components/WhyUsSection.jsx`
- Create: `shtory/src/components/StepsSection.jsx`
- Create: `shtory/src/components/PortfolioSection.jsx`
- Modify: `shtory/src/App.jsx`
- Test: `shtory/src/__tests__/landing-content.test.jsx`

- [ ] **Step 1: Write a failing test for required sections**

```jsx
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders the required commercial sections', () => {
  render(<App />)

  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /виды штор и услуги/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /почему выбирают нас/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /наши работы/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/__tests__/landing-content.test.jsx`  
Expected: FAIL because sections are missing

- [ ] **Step 3: Create the content model with Russian copy and temporary contacts**

```js
export const siteContent = {
  companyName: 'Салон штор в Раевке',
  seo: {
    title: 'Шторы на заказ в Раевке — пошив, тюль, установка',
    description: 'Пошив штор на заказ в Раевке: замер, подбор ткани, тюль, портьеры, римские и рулонные шторы. Консультация и установка под ключ.',
    h1: 'Шторы на заказ в Раевке и Раевском',
    slug: 'shtory-raevka',
  },
  contacts: {
    phoneDisplay: '+7 (___) ___-__-__',
    phoneHref: 'tel:+7',
    whatsappHref: '#contacts',
    telegramHref: '#contacts',
    workingHours: 'Ежедневно, по предварительной договоренности',
    serviceArea: 'Работаем по Раевке / Раевскому и Альшеевскому району',
  },
}
```

- [ ] **Step 4: Implement the core sections and wire them into `App.jsx`**

```jsx
<Header />
<Hero />
<TrustBar />
<BenefitsSection />
<CatalogSection />
<ServicesSection />
<WhyUsSection />
<StepsSection />
<PortfolioSection />
```

- [ ] **Step 5: Run the test and verify GREEN**

Run: `npm test -- src/__tests__/landing-content.test.jsx`  
Expected: PASS

- [ ] **Step 6: Commit the content and core sections**

```bash
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing add shtory/src/data/siteContent.js shtory/src/components/Header.jsx shtory/src/components/Hero.jsx shtory/src/components/TrustBar.jsx shtory/src/components/BenefitsSection.jsx shtory/src/components/CatalogSection.jsx shtory/src/components/ServicesSection.jsx shtory/src/components/WhyUsSection.jsx shtory/src/components/StepsSection.jsx shtory/src/components/PortfolioSection.jsx shtory/src/App.jsx shtory/src/__tests__/landing-content.test.jsx
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing commit -m "feat: add landing content sections"
```

### Task 3: Add Pricing, Reviews, FAQ, SEO Block, Contacts, Footer, And Interactions

**Files:**
- Create: `shtory/src/components/PricingSection.jsx`
- Create: `shtory/src/components/PromoSection.jsx`
- Create: `shtory/src/components/ReviewsSection.jsx`
- Create: `shtory/src/components/FaqSection.jsx`
- Create: `shtory/src/components/SeoLocalSection.jsx`
- Create: `shtory/src/components/LeadFormSection.jsx`
- Create: `shtory/src/components/ContactsSection.jsx`
- Create: `shtory/src/components/Footer.jsx`
- Create: `shtory/src/components/MobileStickyActions.jsx`
- Create: `shtory/src/hooks/useLeadForm.js`
- Modify: `shtory/src/App.jsx`
- Test: `shtory/src/__tests__/lead-form.test.jsx`
- Test: `shtory/src/__tests__/faq.test.jsx`

- [ ] **Step 1: Write a failing test for form validation**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('shows validation errors before successful submit', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: /получить консультацию/i }))

  expect(screen.getByText(/укажите имя/i)).toBeInTheDocument()
  expect(screen.getByText(/укажите телефон/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/__tests__/lead-form.test.jsx`  
Expected: FAIL because form behavior is not implemented

- [ ] **Step 3: Write a failing test for FAQ accordion behavior**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('expands faq answer on click', async () => {
  const user = userEvent.setup()
  render(<App />)

  const trigger = screen.getByRole('button', { name: /сколько стоит заказать шторы в раевке/i })
  await user.click(trigger)

  expect(screen.getByText(/точную стоимость мы рассчитываем после замера/i)).toBeVisible()
})
```

- [ ] **Step 4: Run the FAQ test and verify RED**

Run: `npm test -- src/__tests__/faq.test.jsx`  
Expected: FAIL because accordion behavior is missing

- [ ] **Step 5: Implement the remaining sections and interactions**

Required output:

- pricing with careful `от` ranges and CTA;
- promo block;
- 5 natural reviews;
- FAQ with 10+ entries;
- local SEO text block;
- lead form with validation and success state;
- contacts with temporary data;
- footer with privacy and consent links;
- mobile sticky actions for call and WhatsApp.

- [ ] **Step 6: Run the interaction tests and verify GREEN**

Run: `npm test -- src/__tests__/lead-form.test.jsx src/__tests__/faq.test.jsx`  
Expected: PASS

- [ ] **Step 7: Commit interactive and bottom-of-page sections**

```bash
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing add shtory/src/components/PricingSection.jsx shtory/src/components/PromoSection.jsx shtory/src/components/ReviewsSection.jsx shtory/src/components/FaqSection.jsx shtory/src/components/SeoLocalSection.jsx shtory/src/components/LeadFormSection.jsx shtory/src/components/ContactsSection.jsx shtory/src/components/Footer.jsx shtory/src/components/MobileStickyActions.jsx shtory/src/hooks/useLeadForm.js shtory/src/App.jsx shtory/src/__tests__/lead-form.test.jsx shtory/src/__tests__/faq.test.jsx
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing commit -m "feat: add landing interactions and conversion blocks"
```

### Task 4: Polish The Visual System, SEO Metadata, And Final Delivery Checks

**Files:**
- Create: `shtory/src/components/SeoHead.jsx`
- Create: `shtory/src/components/StructuredData.jsx`
- Modify: `shtory/src/styles/global.css`
- Modify: `shtory/src/App.jsx`
- Create: `shtory/public/favicon.svg`
- Create: `shtory/public/og-image.svg`
- Create: `shtory/public/robots.txt`
- Create: `shtory/public/sitemap.xml`
- Test: `shtory/src/__tests__/seo.test.jsx`

- [ ] **Step 1: Write a failing test for SEO-critical content**

```jsx
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders the seo-driven h1 and faq section', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /шторы на заказ в раевке и раевском/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /faq/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify RED if needed**

Run: `npm test -- src/__tests__/seo.test.jsx`  
Expected: FAIL only if the final SEO-critical structure is still incomplete

- [ ] **Step 3: Implement finishing polish**

Required output:

- full premium CSS system with variables and responsive breakpoints;
- sticky header states;
- hero overlay and video handling;
- semantic heading structure;
- JSON-LD for `LocalBusiness`, `Service`, `FAQPage`;
- temporary metadata and OG tags via `SeoHead`;
- public assets `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/__tests__/seo.test.jsx`  
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `npm test`  
Expected: all tests PASS

- [ ] **Step 6: Run the production build**

Run: `npm run build`  
Expected: build succeeds and outputs `dist/`

- [ ] **Step 7: Commit the final polish**

```bash
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing add shtory/src/components/SeoHead.jsx shtory/src/components/StructuredData.jsx shtory/src/styles/global.css shtory/src/App.jsx shtory/src/__tests__/seo.test.jsx shtory/public/favicon.svg shtory/public/og-image.svg shtory/public/robots.txt shtory/public/sitemap.xml
git -C /home/dinar/sites/.worktrees/raevka-curtains-landing commit -m "feat: polish seo and visual system for curtains landing"
```
