# Rafstreymi – vefsíða

Vue 3 + Vite + Tailwind CSS. Static site, deployed to GitHub Pages.

## Run it locally

```
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173/Rafstreymi/).

## Publish

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site
and publishes it to https://dummdumm.github.io/Rafstreymi/.

In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

Note: `.github` is a hidden folder. If you upload through the GitHub website it
is skipped, so either use `git push` or create
`.github/workflows/deploy.yml` by hand with "Add file → Create new file".

## Where to change things

| What                         | File                          |
| ---------------------------- | ----------------------------- |
| Phone, e-mail, address, hours, the four numbers | `src/data/site.js` |
| Services                     | `src/data/services.js`        |
| Projects and their photos    | `src/data/projects.js`        |
| Colours and fonts            | `tailwind.config.js`          |
| Team (Marinó and Jóhann)     | `src/data/team.js`            |
| Quote request form           | `src/views/RequestView.vue`   |

## Before going live

- `src/data/projects.js`: only the first project is real. The rest are sample
  entries. Replace them and add photos to `src/assets/projects/`.
- `src/data/team.js`: the owners' e-mail addresses and phone numbers are placeholders.
- The footer links "Persónuvernd" and "Skilmálar" point nowhere yet.
- The verkbeiðni form sends through FormSubmit to info@rafstreymi.is. The first
  request triggers a confirmation e-mail to that address, which must be
  confirmed once before requests start arriving.
