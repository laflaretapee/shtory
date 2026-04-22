# Reviews Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сделать блок отзывов динамической каруселью с показом по одной карточке слева направо.

**Architecture:** Сетка отзывов заменяется на один viewport с горизонтальным track и автопереключением по таймеру. Для устойчивости CI одинаковые изменения вносятся в корневое приложение и его дубликат в `shtory/`.

**Tech Stack:** React, Vitest, Testing Library, plain CSS, Vite

---

### Task 1: Зафиксировать карусель тестом

**Files:**
- Create: `src/__tests__/reviews-carousel.test.jsx`
- Create: `shtory/src/__tests__/reviews-carousel.test.jsx`

- [ ] Проверить, что на странице портфолио есть кнопки переключения отзывов.
- [ ] Проверить, что track меняет `transform` после автотика таймера.

### Task 2: Переделать компонент отзывов

**Files:**
- Modify: `src/components/ReviewsSection.jsx`
- Modify: `shtory/src/components/ReviewsSection.jsx`

- [ ] Добавить состояние текущего индекса.
- [ ] Добавить автосмену и кнопки назад/вперёд.
- [ ] Рендерить карточки в горизонтальном track по одной на экран.

### Task 3: Обновить стили карусели

**Files:**
- Modify: `src/styles/global.css`
- Modify: `shtory/src/styles/global.css`

- [ ] Добавить viewport, track, управляющие кнопки и компактную подачу одной карточки.
- [ ] Убедиться, что на мобильном блок остаётся читаемым.

### Task 4: Проверить и опубликовать

**Files:**
- None

- [ ] Прогнать `npm ci && npm test && npm run build` в чистой временной копии репозитория.
- [ ] Закоммитить изменения, запушить `main` и дождаться успешного GitHub Pages workflow.
