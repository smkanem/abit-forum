# Описание
Это приложение на Nuxt

# Перед запуском

## Установка зависимостей
```shell
npm i
```

## Переменные окружения
Все переменные окружения прописывать в `.env`:
- `NUXT_DEV_PORT`?: номер порта в режиме разработки
- `NUXT_SITE_NAME`: название сайта для Nuxt Sitemap
- `NUXT_PUBLIC_SITE_URL`: URL сайта (без пути, например `https://smkanem.github.io`)
- `NUXT_APP_BASE_URL`?: базовый путь приложения (например `/abit-forum/` для GitHub Pages); по умолчанию `/`

# Разработка

```shell
npm run dev
```

# Продакшн-сборка

Приложение собирается как статический сайт:
```shell
npm run generate
```
Результат — в `.output/public`, его можно захостить на любом статическом хостинге.

## Деплой на GitHub Pages

Деплой автоматический через `.github/workflows/deploy-pages.yml`: при пуше в `master`
воркфлоу собирает сайт (`nuxt generate` с `NUXT_APP_BASE_URL=/<repo>/`) и публикует
`.output/public` через `actions/deploy-pages`. Его же можно запустить вручную из вкладки
Actions → Deploy to GitHub Pages → Run workflow.

Перед первым деплоем нужно один раз включить Pages в настройках репозитория:
**Settings → Pages → Source → GitHub Actions**.

Сайт будет доступен по адресу `https://<owner>.github.io/<repo>/`.
