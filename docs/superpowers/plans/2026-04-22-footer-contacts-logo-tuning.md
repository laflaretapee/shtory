# Footer Contacts Logo Tuning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Убрать лишний текстовый бренд в футере, сделать компактный контактный блок без карточек и показать явный логотип в шапке.

**Architecture:** Меняем только корневое приложение, которое деплоится на GitHub Pages. Поведение фиксируем тестами на футер, контакты и шапку, затем минимально переписываем JSX и CSS без перестройки маршрутов и данных.

**Tech Stack:** React, React Router, Vitest, Testing Library, Vite, plain CSS

---

### Task 1: Зафиксировать новое UI-поведение тестами

**Files:**
- Modify: `src/__tests__/contacts-cta.test.jsx`
- Modify: `src/__tests__/landing-content.test.jsx`

- [ ] Проверить, что блок контактов больше не рендерит карточки каналов и оставляет только компактные ссылки.
- [ ] Проверить, что в шапке и/или футере есть видимый логотип, а в футере больше нет заголовка `Тренд Штор`.

### Task 2: Обновить разметку футера, контактов и шапки

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/ContactsSection.jsx`
- Modify: `src/components/Header.jsx`

- [ ] В футере заменить горизонтальный lockup на вертикальный блок: логотип сверху, текст про пошив снизу, без отдельного заголовка бренда.
- [ ] В контактах убрать сетку карточек и собрать один компактный блок со ссылками/иконками, телефоном и короткой подписью.
- [ ] В шапке заменить фоновый логотип на явный `<img>`, чтобы знак точно отображался на главной.

### Task 3: Подогнать стили под новую компактную подачу

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/branding.css`

- [ ] Упростить футерный лейаут и вертикальный стек бренда.
- [ ] Удалить зависимость шапки от фонового логотипа и настроить размер логотипа через `<img>`.
- [ ] Добавить стили компактного контактного блока без карточек.

### Task 4: Проверить и опубликовать

**Files:**
- None

- [ ] Прогнать чистую проверку `npm ci && npm test && npm run build` в временной копии репозитория.
- [ ] Закоммитить изменения в `main`, запушить по SSH и дождаться успешного GitHub Pages workflow.
