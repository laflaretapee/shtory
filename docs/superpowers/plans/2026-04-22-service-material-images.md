# Service And Material Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Привязать фото `1-6.webp` к блоку пошива, замера и установки, а `7-12.webp` к блоку материалов.

**Architecture:** Новые файлы публикуются как статические ассеты и прописываются в `siteContent`. Карточки услуг начинают рендерить реальные изображения вместо пустого плейсхолдера. Для CI синхронизируются обе копии приложения в репозитории.

**Tech Stack:** React, Vite, Vitest, Testing Library, plain CSS

---

### Task 1: Зафиксировать ожидаемые изображения тестами

**Files:**
- Modify: `src/__tests__/materials.test.jsx`
- Modify: `shtory/src/__tests__/materials.test.jsx`

- [ ] Проверить, что карточки услуг рендерят изображения `1.webp` и `6.webp`.
- [ ] Проверить, что блок материалов рендерит изображения `7.webp` и `12.webp`.

### Task 2: Опубликовать новые WebP-ассеты

**Files:**
- Create: `public/media/services/1.webp` ... `public/media/services/6.webp`
- Create: `public/media/materials/7.webp` ... `public/media/materials/12.webp`
- Create: `shtory/public/media/services/1.webp` ... `shtory/public/media/services/6.webp`
- Create: `shtory/public/media/materials/7.webp` ... `shtory/public/media/materials/12.webp`

- [ ] Скопировать исходные `1-12.webp` из рабочей папки в публичные директории обеих копий приложения.

### Task 3: Подключить новые пути в данных и компонентах

**Files:**
- Modify: `src/data/siteContent.js`
- Modify: `src/components/ServicesSection.jsx`
- Modify: `shtory/src/data/siteContent.js`
- Modify: `shtory/src/components/ServicesSection.jsx`

- [ ] Добавить `image` в каждый service item с путями `media/services/1.webp` ... `media/services/6.webp`.
- [ ] Заменить `materials` paths на `media/materials/7.webp` ... `media/materials/12.webp`.
- [ ] Рендерить `<img>` в карточках услуг вместо пустого placeholder div.

### Task 4: Проверить и опубликовать

**Files:**
- None

- [ ] Прогнать `npm ci && npm test && npm run build` в чистой временной копии репозитория.
- [ ] Закоммитить изменения, запушить `main` и дождаться успешного GitHub Pages workflow.
