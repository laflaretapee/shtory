# Raevka Curtains Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the contact form with temporary messenger CTA actions, add an interactive materials section, and rebuild the portfolio around real photos from `VK-photos` while keeping the current React/Vite site structure.

**Architecture:** Keep the existing route structure and central `siteContent` data model, but replace form-driven contact flow with a clipboard-based messenger CTA pattern backed by a small reusable hook. Normalize a selected subset of `VK-photos` into stable public asset paths, then render them through an image-based portfolio component and a new `MaterialsSection` accordion integrated into the services page.

**Tech Stack:** Vite, React, React Router, Vitest, React Testing Library, CSS, static image assets

---

### Task 1: Replace The Contact Form With Temporary Messenger CTA Actions

**Files:**
- Create: `src/__tests__/contacts-cta.test.jsx`
- Create: `src/hooks/useContactCopy.js`
- Modify: `src/data/siteContent.js`
- Modify: `src/components/ContactsSection.jsx`
- Modify: `src/components/MobileStickyActions.jsx`
- Modify: `src/pages/ContactsPage.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/styles/global.css`
- Delete: `src/components/LeadFormSection.jsx`
- Delete: `src/hooks/useLeadForm.js`
- Delete: `src/__tests__/lead-form.test.jsx`

- [ ] **Step 1: Write the failing contact CTA regression test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import { AppShell } from '../App'

const writeText = vi.fn()

beforeEach(() => {
  writeText.mockReset()
  writeText.mockResolvedValue(undefined)
  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  })
})

test('contacts page copies the ready message instead of showing the form', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.queryByRole('textbox', { name: /имя/i }),
  ).not.toBeInTheDocument()

  const whatsappButton = screen.getByRole('button', { name: /whatsapp/i })
  expect(
    screen.getByRole('button', { name: /telegram/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /^vk$/i }),
  ).toBeInTheDocument()

  await user.click(whatsappButton)

  expect(writeText).toHaveBeenCalledWith(
    'Здравствуйте! Хочу узнать стоимость штор и договориться о замере.',
  )
  expect(screen.getByText(/текст скопирован/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/__tests__/contacts-cta.test.jsx -v`
Expected: FAIL because the contacts page still renders the lead form and does not expose messenger copy buttons.

- [ ] **Step 3: Add the messenger CTA content to `siteContent`**

```js
contacts: {
  phoneDisplay: '+7 (___) ___-__-__',
  phoneHref: '#contacts',
  whatsappLabel: 'WhatsApp',
  whatsappHref: '',
  telegramLabel: 'Telegram',
  telegramHref: '',
  vkLabel: 'VK',
  vkHref: '',
  workingHours: 'Ежедневно, по предварительной договоренности',
  serviceArea: 'Работаем по Раевке / Раевскому и Альшеевскому району',
  readyMessage:
    'Здравствуйте! Хочу узнать стоимость штор и договориться о замере.',
  channelStatus: 'Прямую ссылку подключим позже, пока можно скопировать готовый текст.',
},
contactsBlock: {
  title: 'Связаться удобно в мессенджере или VK',
  text: 'Выберите удобный канал, скопируйте готовое сообщение и напишите, когда будете готовы.',
},
```

- [ ] **Step 4: Implement the reusable clipboard hook and the new contacts UI**

```js
import { useState } from 'react'

export function useContactCopy(message) {
  const [copiedChannel, setCopiedChannel] = useState('')

  async function copy(channel) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message)
      setCopiedChannel(channel)
      return true
    }

    setCopiedChannel(channel)
    return false
  }

  return { copiedChannel, copy }
}
```

```jsx
const channels = [
  { id: 'whatsapp', label: contacts.whatsappLabel, tone: 'accent' },
  { id: 'telegram', label: contacts.telegramLabel, tone: 'secondary' },
  { id: 'vk', label: contacts.vkLabel, tone: 'secondary' },
]

{channels.map((channel) => (
  <button
    key={channel.id}
    type="button"
    className={channel.tone === 'accent' ? 'button' : 'button button-secondary'}
    onClick={() => copy(channel.id)}
  >
    {channel.label}
  </button>
))}

<p className="contact-status" role="status">
  {copiedChannel ? 'Текст скопирован. Можно вставить его в сообщение.' : contacts.channelStatus}
</p>
```

```jsx
export function ContactsPage() {
  return (
    <>
      <ContactsSection data={siteContent.contactsBlock} contacts={siteContent.contacts} />
      <FaqSection items={siteContent.faq} />
      <SeoLocalSection data={siteContent.localSeo} />
    </>
  )
}
```

- [ ] **Step 5: Remove the old form flow and update related CTA copy**

```bash
rm src/components/LeadFormSection.jsx
rm src/hooks/useLeadForm.js
rm src/__tests__/lead-form.test.jsx
```

```jsx
<Link className="home-next-card" to="/contacts">
  <span className="eyebrow eyebrow-dark">Связаться</span>
  <h3>Мессенджеры и VK</h3>
  <p>Скопируйте готовое сообщение и напишите удобным способом, когда будете готовы.</p>
  <span className="text-link">Открыть контакты →</span>
</Link>
```

```jsx
export function MobileStickyActions() {
  return (
    <div className="mobile-sticky-actions">
      <Link className="button button-secondary" to="/contacts">
        WhatsApp
      </Link>
      <Link className="button" to="/contacts">
        Telegram и VK
      </Link>
    </div>
  )
}
```

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run: `npm test -- src/__tests__/contacts-cta.test.jsx src/__tests__/landing-content.test.jsx -v`
Expected: PASS with the contacts CTA test green and the route smoke test still green.

- [ ] **Step 7: Commit the contact flow refresh**

```bash
git add src/__tests__/contacts-cta.test.jsx src/hooks/useContactCopy.js src/data/siteContent.js src/components/ContactsSection.jsx src/components/MobileStickyActions.jsx src/pages/ContactsPage.jsx src/pages/HomePage.jsx src/styles/global.css
git add -u src/components/LeadFormSection.jsx src/hooks/useLeadForm.js src/__tests__/lead-form.test.jsx
git commit -m "feat: replace form with messenger cta flow"
```

### Task 2: Add The Materials Accordion To The Services Page

**Files:**
- Create: `src/__tests__/materials.test.jsx`
- Create: `src/components/MaterialsSection.jsx`
- Modify: `src/data/siteContent.js`
- Modify: `src/pages/ServicesPage.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing materials interaction test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('services page expands one materials card at a time', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/services']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { level: 2, name: /материалы/i }),
  ).toBeInTheDocument()

  const tulleButton = screen.getByRole('button', { name: /лёгкий тюль/i })
  const blackoutButton = screen.getByRole('button', { name: /блэкаут и затемняющие решения/i })

  await user.click(tulleButton)
  expect(
    screen.getByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).toBeVisible()

  await user.click(blackoutButton)
  expect(
    screen.getByText(/помогает затемнить комнату и добавить ощущение камерности/i),
  ).toBeVisible()
  expect(
    screen.queryByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/__tests__/materials.test.jsx -v`
Expected: FAIL because there is no materials section on the services page.

- [ ] **Step 3: Add the approved materials data to `siteContent`**

```js
materials: [
  {
    title: 'Лёгкий тюль',
    kicker: 'Воздух и мягкий свет',
    summary: 'Для комнат, где важно сохранить ощущение лёгкости.',
    description:
      'Мягко рассеивает дневной свет и не перегружает окно. Хорошо подходит для кухни, гостиной и светлых интерьеров, где хочется сохранить воздух.',
    bestFor: 'Лучше всего для кухни, гостиной и комнат с хорошим естественным светом.',
  },
  {
    title: 'Плотные портьерные ткани',
    kicker: 'Глубина и уют',
    summary: 'Когда хочется добавить комнате собранность и спокойствие.',
    description:
      'Дают больше глубины и помогают визуально собрать окно. Подходят для спальни, гостиной и тех случаев, где нужна более выразительная подача.',
    bestFor: 'Лучше всего для спальни, гостиной и частного дома.',
  },
  {
    title: 'Фактурные ткани',
    kicker: 'Выразительный характер',
    summary: 'Для интерьеров, где важна не только цветовая гамма, но и пластика ткани.',
    description:
      'Добавляют глубину даже спокойной палитре и делают оформление окна интереснее без лишнего декора.',
    bestFor: 'Лучше всего для гостиных, кабинетов и интерьеров с нейтральной палитрой.',
  },
  {
    title: 'Блэкаут и затемняющие решения',
    kicker: 'Больше приватности',
    summary: 'Когда нужна защита от яркого света и ощущение камерности.',
    description:
      'Помогает затемнить комнату и добавить ощущение камерности. Удобен для спален, детских и комнат с активным утренним солнцем.',
    bestFor: 'Лучше всего для спален, детских и южных окон.',
  },
  {
    title: 'Натуральные спокойные фактуры',
    kicker: 'Тёплая сдержанность',
    summary: 'Для интерьеров, где важны мягкость и естественность.',
    description:
      'Работают спокойно и дорого, поддерживают светлые стены, дерево и природные оттенки в интерьере.',
    bestFor: 'Лучше всего для спальни, гостиной и современного частного дома.',
  },
  {
    title: 'Практичные ткани для кухни и детской',
    kicker: 'Удобство на каждый день',
    summary: 'Когда важны уход, аккуратность и повседневная практичность.',
    description:
      'Подходят для активных зон дома, где текстиль должен быть аккуратным, удобным и не слишком капризным в уходе.',
    bestFor: 'Лучше всего для кухни, детской и семейных пространств.',
  },
],
```

- [ ] **Step 4: Implement the accordion component and wire it into `ServicesPage`**

```jsx
import { useState } from 'react'

export function MaterialsSection({ items }) {
  const [openTitle, setOpenTitle] = useState(items[0]?.title ?? '')

  return (
    <section className="section section-contrast" id="materials">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Материалы</p>
          <h2>Материалы и фактуры, которые помогают выбрать настроение окна</h2>
          <p>Коротко показываем, чем отличаются самые востребованные решения и в каких комнатах они раскрываются лучше.</p>
        </div>

        <div className="materials-grid">
          {items.map((item) => {
            const expanded = item.title === openTitle
            return (
              <article className={`material-card${expanded ? ' material-card-open' : ''}`} key={item.title}>
                <button
                  type="button"
                  className="material-trigger"
                  aria-expanded={expanded}
                  onClick={() => setOpenTitle(item.title)}
                >
                  <span className="pill">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </button>
                {expanded ? (
                  <div className="material-body">
                    <p>{item.description}</p>
                    <p className="muted"><strong>Лучше всего:</strong> {item.bestFor}</p>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

```jsx
export function ServicesPage() {
  return (
    <>
      <CatalogSection items={siteContent.curtainTypes}>
        <ServicesSection items={siteContent.services} />
      </CatalogSection>
      <MaterialsSection items={siteContent.materials} />
      <WhyUsSection data={siteContent.whyUs} />
      <StepsSection items={siteContent.steps} />
      <PricingSection data={siteContent.pricing} />
      <PromoSection data={siteContent.promo} />
    </>
  )
}
```

- [ ] **Step 5: Run the focused tests and verify GREEN**

Run: `npm test -- src/__tests__/materials.test.jsx src/__tests__/landing-content.test.jsx -v`
Expected: PASS with the new materials accordion rendered on `/services`.

- [ ] **Step 6: Commit the materials section**

```bash
git add src/__tests__/materials.test.jsx src/components/MaterialsSection.jsx src/data/siteContent.js src/pages/ServicesPage.jsx src/styles/global.css
git commit -m "feat: add materials accordion section"
```

### Task 3: Normalize VK Photos And Rebuild The Portfolio Around Real Images

**Files:**
- Create: `public/media/portfolio/portfolio-01.jpg`
- Create: `public/media/portfolio/portfolio-02.jpg`
- Create: `public/media/portfolio/portfolio-03.jpg`
- Create: `public/media/portfolio/portfolio-04.jpg`
- Create: `public/media/portfolio/portfolio-05.jpg`
- Create: `public/media/portfolio/portfolio-06.jpg`
- Create: `public/media/portfolio/portfolio-07.jpg`
- Create: `public/media/portfolio/portfolio-08.jpg`
- Create: `src/__tests__/portfolio-gallery.test.jsx`
- Modify: `src/data/siteContent.js`
- Modify: `src/components/PortfolioSection.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Copy the selected VK photos into stable public paths**

```bash
mkdir -p public/media/portfolio
cp VK-photos/1_QmG22OI2ROcChrKSyOsK1kReOv9c4Cz8_g1Btky2CQKImsBH7q_KgPvcVcDuzGkfTQW3mTGPSHKNfEfmeZ7ZF4.jpg public/media/portfolio/portfolio-01.jpg
cp VK-photos/4Mps2uNPDlCh02X49cq9YGkJgFasIXaseFKNCT69aQ7aUO9I_UzaVws-QMTRYYhM72rvIf7JRtnp4v1iBK6UMQhv.jpg public/media/portfolio/portfolio-02.jpg
cp VK-photos/4R2ATeDG4KB6tL5asptcVeGJFo1U9f-DUuD6OKwEWgBe9ueYCfRFKVRJy-3OeH6fMpWJnomRGxnBj5In1lOEXiQY.jpg public/media/portfolio/portfolio-03.jpg
cp VK-photos/8PpAiU4oEvpFqaokfEyFS8QcMp5OB_wUZ2Kviw8TEp3JYrECkQv1VOs6MAT5Lm2kxXy0XKGeoV211OtQ_UqyW3i1.jpg public/media/portfolio/portfolio-04.jpg
cp VK-photos/I9FC6uQwIe6H-rjWthae_zsGBo6nHZKs4JxZs8upSm9cTVm1QgQOLTtM3hyVhQaO1Dw7oFp9qwsmVj1AEi1h6ypw.jpg public/media/portfolio/portfolio-05.jpg
cp VK-photos/d_6ZJSeEypCLEk3TjFsElO4M22e59Ya0ph8FQhzHAcRPr14h7ZQOYjBJA-s0tH8J3pLPd_VIDiaZd20Pz0LSuFaI.jpg public/media/portfolio/portfolio-06.jpg
cp VK-photos/e4YaFBDGvVcxMnWLkiLcm3IRtnQscbXY1GT5DVaZivmnHZlidaCwkiJKj-dyRr4TsCTTTO3z_Pmwa-T6_9NuGRmT.jpg public/media/portfolio/portfolio-07.jpg
cp VK-photos/gCH1mwB7TChLnzruvqqsN1LLgHtwpwJ4rfI1BJPp-i3BsdRXh3YrBIHIp7Cb4R_Z2q15lS4ll0MjTBEamdovmfMY.jpg public/media/portfolio/portfolio-08.jpg
```

- [ ] **Step 2: Write the failing portfolio gallery test**

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio page renders real images from the normalized media folder', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  const images = screen.getAllByRole('img')
  expect(images.length).toBeGreaterThanOrEqual(8)
  expect(images[0]).toHaveAttribute('src', expect.stringContaining('/media/portfolio/portfolio-'))
})
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm test -- src/__tests__/portfolio-gallery.test.jsx -v`
Expected: FAIL because the portfolio still renders decorative placeholders instead of image tags.

- [ ] **Step 4: Replace placeholder portfolio media with image-driven cards and a richer home preview**

```js
portfolio: [
  {
    title: 'Готовое оформление окна',
    description: 'Спокойное текстильное решение с акцентом на аккуратную посадку ткани.',
    result: 'Окно выглядит собранно и поддерживает интерьер без перегруза.',
    alt: 'Реальная работа по шторам в жилом интерьере в Раевке',
    image: '/media/portfolio/portfolio-01.jpg',
  },
  {
    title: 'Светлый комплект с тюлем',
    description: 'Лёгкая подача окна для комнаты, где важно сохранить воздух и дневной свет.',
    result: 'Интерьер остаётся светлым и уютным.',
    alt: 'Светлые шторы и тюль в жилом интерьере',
    image: '/media/portfolio/portfolio-02.jpg',
  },
]
```

```jsx
<article className="portfolio-card" key={item.title}>
  <img className="portfolio-media" src={item.image} alt={item.alt} loading="lazy" />
  <div className="portfolio-body">
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <p className="muted">
      <strong>Результат:</strong> {item.result}
    </p>
  </div>
</article>
```

```jsx
<Link className="home-next-card home-next-card-portfolio" to="/portfolio">
  <img
    className="home-next-preview"
    src={siteContent.portfolio[0].image}
    alt={siteContent.portfolio[0].alt}
  />
  <span className="eyebrow eyebrow-dark">Наши работы</span>
  <h3>Портфолио с реальными фото</h3>
  <p>Посмотрите, как выглядят готовые решения с живой посадкой ткани и фактурой в интерьере.</p>
  <span className="text-link">Смотреть →</span>
</Link>
```

- [ ] **Step 5: Run the focused tests and verify GREEN**

Run: `npm test -- src/__tests__/portfolio-gallery.test.jsx src/__tests__/landing-content.test.jsx -v`
Expected: PASS with real image nodes present on `/portfolio` and the shared route smoke test still passing.

- [ ] **Step 6: Commit the portfolio refresh**

```bash
git add public/media/portfolio/portfolio-01.jpg public/media/portfolio/portfolio-02.jpg public/media/portfolio/portfolio-03.jpg public/media/portfolio/portfolio-04.jpg public/media/portfolio/portfolio-05.jpg public/media/portfolio/portfolio-06.jpg public/media/portfolio/portfolio-07.jpg public/media/portfolio/portfolio-08.jpg
git add src/__tests__/portfolio-gallery.test.jsx src/data/siteContent.js src/components/PortfolioSection.jsx src/pages/HomePage.jsx src/styles/global.css
git commit -m "feat: rebuild portfolio with real photos"
```

### Task 4: Run Full Verification, Build The Site, And Publish To GitHub

**Files:**
- Modify: `package-lock.json` (only if dependency graph changes during test runs)

- [ ] **Step 1: Run the full automated test suite**

Run: `npm test`
Expected: PASS with all route, SEO, FAQ, contacts, materials, and portfolio tests green.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with a fresh `dist/` output and no build errors.

- [ ] **Step 3: Review the final working tree before publishing**

Run: `git status -sb`
Expected: only the intended `src/`, `public/media/portfolio/`, `docs/superpowers/`, and generated lockfile changes are present.

- [ ] **Step 4: Commit the final implementation state**

```bash
git add src public/media/portfolio docs/superpowers/specs/2026-04-19-raevka-curtains-content-refresh-design.md docs/superpowers/plans/2026-04-19-raevka-curtains-content-refresh.md
git commit -m "feat: refresh curtain content and contact flow"
```

- [ ] **Step 5: Push the branch to the remote**

Run: `git push origin main`
Expected: PASS and the branch updates on GitHub for the Pages deploy workflow.
