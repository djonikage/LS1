# Lady's Secrets — Одностраничный сайт

Lady's Secrets — это одностраничный сайт Проект реализован на React с использованием Vite, Tailwind CSS и современных UI-компонентов.

## Структура проекта

```
├── index.html
├── package.json
├── README.md
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── Attributions.md
    ├── index.css
    ├── main.tsx
    ├── components/
    │   ├── Bestsellers.tsx
    │   ├── Categories.tsx
    │   ├── ContactModal.tsx
    │   ├── Header.tsx
    │   ├── Hero.tsx
    │   ├── Lookbook.tsx
    │   ├── NewArrivals.tsx
    │   ├── ProductDetailModal.tsx
    │   ├── ProductGalleryModal.tsx
    │   ├── PromoBar.tsx
    │   ├── figma/
    │   │   └── ImageWithFallback.tsx
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       └── ...
    └── styles/
        └── globals.css
```

## Основные технологии

- **React** — библиотека для построения пользовательских интерфейсов.
- **Vite** — быстрый сборщик и dev-сервер.
- **Tailwind CSS** — утилитарный CSS-фреймворк.
- **shadcn/ui** — набор UI-компонентов.
- **Radix UI** — доступные компоненты для React.
- **Lucide Icons** — иконки.
- **Embla Carousel** — карусель для галерей.

## Быстрый старт

1. **Установите зависимости:**

   ```sh
   npm install
   ```

2. **Запустите dev-сервер:**

   ```sh
   npm run dev
   ```

   Сервер будет доступен по адресу [http://localhost:3000](http://localhost:3000).

3. **Сборка проекта:**

   ```sh
   npm run build
   ```

   Результат сборки появится в папке `dist`.

## Страницы и компоненты

- **Hero** — главный баннер.
- **PromoBar** — промо-строка.
- **Categories** — категории товаров.
- **Bestsellers** — блок популярных товаров.
- **NewArrivals** — новинки.
- **Lookbook** — галерея образов.
- **ProductDetailModal** — модальное окно с деталями товара.
- **ProductGalleryModal** — модальное окно галереи.
- **ContactModal** — форма обратной связи.
- **Header** — шапка сайта.

## UI и стили

- Все стили хранятся в `src/styles/globals.css` и `src/index.css`.
- Для компонентов используются утилиты из `src/components/ui`.

## Лицензии и атрибуции

- Компоненты UI — [shadcn/ui](https://ui.shadcn.com/) (MIT).
- Фото — [Unsplash](https://unsplash.com/license).
- Подробнее см. `src/Attributions.md`.

## Конфигурация

- Основные настройки Vite — `vite.config.ts`.
- Зависимости и скрипты — `package.json`.

## Контакты и обратная связь

Для связи с автором используйте форму обратной связи на сайте или откройте `ContactModal`.

---


