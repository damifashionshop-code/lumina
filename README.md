# ✨ Lumina — позитивный self-discovery отчёт

Развлекательный сайт: матрица + нумерология + икигай в одном красивом, добром отчёте.
**Только игра и вдохновение — никаких предсказаний, диагнозов и консультаций.**

## Стек (всё бесплатно)
- Vite + React 18 + TypeScript
- Tailwind CSS (стили, glassmorphism, анимации)
- React Router (страницы Terms / Privacy / Disclaimer / How it works)
- Чистый SVG (матрица, radar chart, венн-икигай, кольца) — без платных библиотек
- Web Audio API (клики, чаймы, ambient-музыка) — без платных аудио-ассетов
- Canvas (звёздное небо, share-карточка PNG)

## Возможности
- RU / EN переключение языка
- Hero → согласие (обязательные чекбоксы) → форма → loading-шоу → отчёт
- Все расчёты локально в браузере, данные никуда не отправляются
- «Скачать PDF» — через печать браузера (print-стили включены)
- Share: Web Share API + копирование текста + PNG-карточка для сторис
- Звук и музыка выключаемы (музыка ВСЕГДА выключена по умолчанию)
- Анимации отключаемы + уважение prefers-reduced-motion
- Кнопка «Очистить мои данные»
- Доступность: контраст, aria-атрибуты, клавиатурная навигация, alt/role у графики

## Запуск локально
```bash
npm install
npm run dev        # http://localhost:5173
```

## Сборка и деплой на Vercel (бесплатный план)
```bash
npm run build      # статика в dist/
```
1. Залейте репозиторий на GitHub.
2. На vercel.com → Add New Project → импортируйте репозиторий.
3. Framework: Vite (определится автоматически). Build: `npm run build`, Output: `dist`.
4. Deploy. Роутинг работает через HashRouter, поэтому дополнительных rewrites не нужно.

Альтернативы (тоже бесплатно): Netlify, GitHub Pages, Cloudflare Pages.

## Где подключать будущие платные функции (поиск по коду: `FUTURE`)
| Что | Где |
|---|---|
| Премиум-отчёт, оплата (Stripe/Paddle) | `src/lib/report.ts`, `src/screens/ReportScreen.tsx` |
| Генерация PDF (jsPDF / serverless) | `src/screens/ReportScreen.tsx`, print-стили в `src/index.css` |
| Email-capture (только с явным согласием) | `src/lib/report.ts` |
| Аналитика (privacy-friendly, напр. Plausible) | `src/lib/report.ts` |
| Донаты и этичные партнёрские рекомендации | `src/components/Footer.tsx` |
| Реферальная механика «открой бонусную карту» | `src/lib/share.ts` |

## Юридическое
Тексты Terms / Privacy / Disclaimer — черновики (`src/pages/Legal.tsx`).
**Перед запуском проверьте их у юриста под юрисдикцию страны запуска.**
