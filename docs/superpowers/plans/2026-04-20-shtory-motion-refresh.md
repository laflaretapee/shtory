# Shtory Quiet Premium Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing `shtory` landing so the site keeps a premium motion rhythm after the curtain hero, uses a denser information layout, replaces the old contacts/cards flow with a cleaner form-first contact page, expands portfolio photos from `VK-photos`, and removes `Раевском` wording across user-facing content.

**Architecture:** Keep the existing React Router and `siteContent`-driven structure, but isolate the new interaction logic into focused UI components and a small portfolio asset helper. Use `framer-motion` for staggered hero/header motion and soft reveal transitions, keep the reviews slider and portfolio pagination state local to their sections, and serve copied `VK-photos` from stable public asset paths.

**Tech Stack:** React 18, React Router, Vite, Vitest, React Testing Library, CSS, Framer Motion, static image assets in `public/media/portfolio`

---

### Task 1: Add regression coverage and motion dependency

**Files:**
- Create: `src/__tests__/motion-refresh.test.jsx`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Write the failing integration test for the new interactive layout**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio starts with 3 cards and reveals more on demand', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getAllByRole('article', { name: /портфолио/i })).toHaveLength(3)

  await user.click(screen.getByRole('button', { name: /показать ещё/i }))

  expect(screen.getAllByRole('article', { name: /портфолио/i }).length).toBeGreaterThan(3)
})

test('contacts page renders the new form layout and icon-only social links', () => {
  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { level: 2, name: /связаться/i })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /телефон/i })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /сообщение/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/telegram/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^vk$/i)).toBeInTheDocument()
})

test('site content no longer exposes wording with Раевском', async () => {
  const text = await import('../data/siteContent')
  expect(JSON.stringify(text.siteContent)).not.toMatch(/Раевском/u)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/__tests__/motion-refresh.test.jsx -v`
Expected: FAIL because the current portfolio shows all cards, contacts still use messenger cards, and content still contains `Раевском`.

- [ ] **Step 3: Add `framer-motion` before UI implementation**

```bash
npm install framer-motion
```

- [ ] **Step 4: Verify the dependency was added cleanly**

Run: `npm ls framer-motion`
Expected: PASS with one installed dependency in the project tree.

### Task 2: Normalize portfolio assets and rebuild content data

**Files:**
- Create: `src/data/portfolioAssets.js`
- Modify: `src/data/siteContent.js`
- Modify: `src/__tests__/portfolio-gallery.test.jsx`
- Create or replace assets in: `public/media/portfolio/*.jpg`

- [ ] **Step 1: Write the failing portfolio dataset test**

```jsx
import { siteContent } from '../data/siteContent'
import { expect, test } from 'vitest'

test('portfolio data contains more than three real photo entries', () => {
  expect(siteContent.portfolio.length).toBeGreaterThan(9)
  expect(siteContent.portfolio.every((item) => item.image.startsWith('media/portfolio/'))).toBe(true)
})
```

- [ ] **Step 2: Run the dataset test and verify RED**

Run: `npm test -- src/__tests__/portfolio-gallery.test.jsx -v`
Expected: FAIL because the current dataset is small and not prepared for paged reveal.

- [ ] **Step 3: Copy a wide selection of `VK-photos` into stable public asset names**

```bash
mkdir -p public/media/portfolio
find /home/dinar/sites/shtory/VK-photos -maxdepth 1 -type f | sort | head -n 18 | \
awk '{ printf("cp \"%s\" public/media/portfolio/project-%02d.jpg\n", $0, NR) }' | bash
```

- [ ] **Step 4: Create the asset helper and rebuild `siteContent.portfolio`**

```js
export const portfolioAssets = Array.from({ length: 18 }, (_, index) => {
  const id = String(index + 1).padStart(2, '0')
  return `media/portfolio/project-${id}.jpg`
})
```

```js
import { portfolioAssets } from './portfolioAssets'

const portfolioText = [
  ['Портфолио 01', 'Реальное оформление окна с мягкой посадкой ткани.', 'Фотография показывает живую работу в интерьере.'],
  ['Портфолио 02', 'Спокойное решение для жилой комнаты без лишней тяжести.', 'Окно выглядит собранно и уместно в реальном помещении.'],
  ['Портфолио 03', 'Нейтральная подача штор с акцентом на свет и фактуру.', 'Фотография помогает оценить ткань в живой обстановке.'],
]

portfolio: portfolioAssets.map((image, index) => {
  const [title, description, result] = portfolioText[index % portfolioText.length]
  const num = String(index + 1).padStart(2, '0')

  return {
    title: `${title}`,
    description,
    result,
    alt: `Реальная фотография штор в интерьере ${num}`,
    image,
  }
}),
```

- [ ] **Step 5: Remove every `Раевском`/`Раевскому` user-facing occurrence from `siteContent.js`**

```bash
rg -n "Раевск" src/data/siteContent.js
```

Target replacements:

```txt
Шторы на заказ в Раевке и Раевском -> Шторы на заказ в Раевке
Работаем по Раевке / Раевскому и Альшеевскому району -> Работаем по Раевке и Альшеевскому району
Пошив и установка штор в Раевке / Раевском -> Пошив и установка штор в Раевке
```

- [ ] **Step 6: Re-run content tests and verify GREEN**

Run: `npm test -- src/__tests__/motion-refresh.test.jsx src/__tests__/portfolio-gallery.test.jsx -v`
Expected: PASS for content shape and wording cleanup after the data file is rebuilt.

### Task 3: Implement the new portfolio, reviews, FAQ, and services behavior

**Files:**
- Modify: `src/components/PortfolioSection.jsx`
- Modify: `src/components/ReviewsSection.jsx`
- Modify: `src/components/FaqSection.jsx`
- Modify: `src/components/ServicesSection.jsx`
- Modify: `src/pages/PortfolioPage.jsx`
- Modify: `src/styles/global.css`
- Modify: `src/__tests__/faq.test.jsx`
- Modify: `src/__tests__/landing-content.test.jsx`

- [ ] **Step 1: Write the failing interaction test updates**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('faq shows one compact active answer at a time', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  const triggers = screen.getAllByRole('button', { name: /стоит|можно|вы/i })
  await user.click(triggers[0])
  expect(screen.getAllByText(/зависит|да|точную стоимость/i).length).toBeGreaterThan(0)
})
```

```jsx
test('reviews render as a slider track with navigation affordances', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('region', { name: /отзывы клиентов/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /предыдущий отзыв/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /следующий отзыв/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- src/__tests__/faq.test.jsx src/__tests__/landing-content.test.jsx src/__tests__/motion-refresh.test.jsx -v`
Expected: FAIL because the current FAQ is a long accordion, the reviews section is a static grid, and the portfolio has no reveal button.

- [ ] **Step 3: Implement paged portfolio reveal**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const INITIAL_COUNT = 3
const STEP = 3

export function PortfolioSection({ items, heading = 'Наши работы' }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Портфолио</p>
          <h2>{heading}</h2>
        </div>

        <div className="portfolio-feature-grid">
          {visibleItems.map((item, index) => (
            <motion.article
              key={`${item.image}-${index}`}
              aria-label="Портфолио"
              className="portfolio-card portfolio-card-large"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <img alt={item.alt} className="portfolio-media portfolio-media-large" src={item.image} />
              <div className="portfolio-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="muted">
                  <strong>Результат:</strong> {item.result}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {hasMore ? (
          <div className="portfolio-more">
            <button className="button button-secondary" type="button" onClick={() => setVisibleCount((count) => count + STEP)}>
              Показать ещё
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Implement the reviews carousel and compact FAQ/services layouts**

```jsx
import { useEffect, useState } from 'react'

export function ReviewsSection({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleItems = [
    items[activeIndex % items.length],
    items[(activeIndex + 1) % items.length],
    items[(activeIndex + 2) % items.length],
  ]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [items.length])

  return (
    <section className="section section-warm" id="reviews" aria-label="Отзывы клиентов">
      <div className="container">
        <div className="reviews-head">
          <div className="section-intro section-intro-compact">
            <p className="eyebrow eyebrow-dark">Отзывы</p>
            <h2>Что говорят клиенты</h2>
          </div>
          <div className="reviews-nav">
            <button type="button" aria-label="Предыдущий отзыв" onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)}>‹</button>
            <button type="button" aria-label="Следующий отзыв" onClick={() => setActiveIndex((current) => (current + 1) % items.length)}>›</button>
          </div>
        </div>
        <div className="reviews-slider">
          <div className="reviews-track">
            {visibleItems.map((item) => (
              <article className="review-card" key={item.name}>
                <p className="review-text">«{item.text}»</p>
                <strong className="review-author">{item.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

```jsx
const [activeIndex, setActiveIndex] = useState(0)
const activeItem = items[activeIndex]
```

```jsx
<div className="faq-rail" role="tablist" aria-label="Вопросы по шторам">
  {items.map((item, index) => (
    <button
      key={item.question}
      className={index === activeIndex ? 'faq-chip faq-chip-active' : 'faq-chip'}
      type="button"
      onClick={() => setActiveIndex(index)}
    >
      {item.question}
    </button>
  ))}
</div>
<article className="faq-active-card">
  <h3>{activeItem.question}</h3>
  <p>{activeItem.answer}</p>
</article>
```

```jsx
<div className="cards-grid services-grid services-grid-compact">
```

- [ ] **Step 5: Re-run the interaction tests and verify GREEN**

Run: `npm test -- src/__tests__/faq.test.jsx src/__tests__/landing-content.test.jsx src/__tests__/motion-refresh.test.jsx -v`
Expected: PASS with the new slider, compact FAQ, and reveal interactions covered.

### Task 4: Rebuild header, hero, contacts, footer, and home cards with quiet premium motion

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/ContactsSection.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/MobileStickyActions.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/styles/global.css`
- Modify: `src/__tests__/app-shell.test.jsx`

- [ ] **Step 1: Write the failing shell test updates**

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('header keeps the compact contact action and footer uses icon links', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: /заказать замер/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/telegram/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^vk$/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the shell test and verify RED**

Run: `npm test -- src/__tests__/app-shell.test.jsx src/__tests__/motion-refresh.test.jsx -v`
Expected: FAIL because the footer still renders text links and the contacts page still uses the old card layout.

- [ ] **Step 3: Implement scroll-state header, layered hero entrance, and new contacts/footer layouts**

```jsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

<header className={scrolled ? 'site-header site-header-scrolled' : 'site-header'}>
```

```jsx
import { motion } from 'framer-motion'

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.55 } }),
}
```

```jsx
<div className="contacts-shell">
  <div className="contacts-copy">
    <p className="eyebrow eyebrow-dark">Контакты</p>
    <h2>Связаться удобно</h2>
    <p>Оставьте имя, телефон и короткое сообщение. Если удобнее, можно сразу открыть один из каналов ниже.</p>
    <div className="social-icon-row">
      <a aria-label="WhatsApp" href={contacts.channels[0].href || '/contacts'}>WA</a>
      <a aria-label="Telegram" href={contacts.channels[1].href || '/contacts'}>TG</a>
      <a aria-label="VK" href={contacts.channels[2].href || '/contacts'}>VK</a>
    </div>
  </div>
  <form className="contact-form-card">
    <label>
      <span>Имя</span>
      <input name="name" type="text" />
    </label>
    <label>
      <span>Телефон</span>
      <input name="phone" type="text" />
    </label>
    <label>
      <span>Сообщение</span>
      <textarea name="message" />
    </label>
    <button className="button" type="submit">Отправить запрос</button>
  </form>
</div>
```

- [ ] **Step 4: Tighten the home cards and footer content**

```jsx
<section className="section section-warm home-next">
  <div className="container home-next-grid home-next-grid-premium">
```

```jsx
<h3>Портфолио с реальными фото</h3>
<p>Сначала покажем несколько сильных примеров, а дальше можно открыть больше реальных работ.</p>
```

```jsx
<ul className="footer-socials" aria-label="Соцсети">
  <li><Link aria-label="WhatsApp" to="/contacts">WA</Link></li>
  <li><Link aria-label="Telegram" to="/contacts">TG</Link></li>
  <li><Link aria-label="VK" to="/contacts">VK</Link></li>
</ul>
```

- [ ] **Step 5: Run the focused UI tests and verify GREEN**

Run: `npm test -- src/__tests__/app-shell.test.jsx src/__tests__/motion-refresh.test.jsx -v`
Expected: PASS with the new shell, footer, and contacts layout covered.

### Task 5: Full verification and publishable branch state

**Files:**
- Modify as needed: `src/**/*`
- Verify: `src/__tests__/*.jsx`

- [ ] **Step 1: Run the complete targeted suite**

Run: `npm test -- src/__tests__/app-shell.test.jsx src/__tests__/branding-assets.test.jsx src/__tests__/contacts-cta.test.jsx src/__tests__/faq.test.jsx src/__tests__/landing-content.test.jsx src/__tests__/materials.test.jsx src/__tests__/motion-refresh.test.jsx src/__tests__/portfolio-gallery.test.jsx src/__tests__/seo.test.jsx -v`
Expected: PASS across updated shell, content, motion refresh, portfolio, SEO, and branding checks.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with a generated `dist/` bundle and no blocking Vite errors.

- [ ] **Step 3: Inspect git scope before commit**

Run: `git status --short`
Expected: Only the intended refresh files, tests, docs plan, and copied portfolio images are staged or modified.

- [ ] **Step 4: Commit the completed refresh**

```bash
git add docs/superpowers/plans/2026-04-20-shtory-motion-refresh.md package.json package-lock.json
git add public/media/portfolio src
git commit -m "feat: refresh shtory landing motion and layout"
```
