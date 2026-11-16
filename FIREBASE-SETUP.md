# Publishing on Firebase Hosting

One-off setup. After it, every `git push` to `main` rebuilds and publishes the site.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. Choose **Create a project**. Google Analytics is optional; you can switch it off.
3. Note the **project ID** shown under the project name (for example `andeslodgeperu-1a2b3`). It is not always the same as the name.

The free Spark plan is enough; do not upgrade to Blaze.

## 2. Project ID

Already filled in: `.firebaserc` and `.github/workflows/firebase-hosting.yml`
use the project ID `andes-lodge-peru-website`, and the workflow expects a GitHub
secret named `FIREBASE_SERVICE_ACCOUNT_ANDES_LODGE_PERU_WEBSITE`.

## 3. Let GitHub deploy to Firebase

In a terminal, inside the project folder:

```
npx firebase-tools login
npx firebase-tools init hosting:github
```

Answer the questions like this:

| Question | Answer |
|---|---|
| For which GitHub repository? | `edwinleonil/andeslodgeperu` |
| Set up the workflow to run a build script before every deploy? | No |
| Set up automatic deployment to your site's live channel when a PR is merged? | No |

This creates a deploy key in your Firebase project and stores it in the GitHub
repository as a secret. Check the name at GitHub > repository > Settings >
Secrets and variables > Actions; it must match the name in the workflow file
exactly.

If the command creates `firebase-hosting-merge.yml` or
`firebase-hosting-pull-request.yml` in `.github/workflows/`, delete them:
`firebase-hosting.yml` already does both jobs. If it offers to overwrite
`firebase.json`, say no.

## 4. Publish

```
git add .
git commit -m "Add Firebase Hosting deployment"
git push
```

Watch the run under the **Actions** tab on GitHub. When it is green, the site is
live at `https://andes-lodge-peru-website.web.app`. Check every page there.

## 5. Move the domain from Wix

1. Firebase console > Hosting > **Add custom domain**. Add `www.andeslodgeperu.com`,
   then `andeslodgeperu.com` set to redirect to the `www` address.
2. Firebase shows the DNS records to create. At your domain registrar, replace
   the records that point to Wix with those.
3. Wait until Firebase shows the domains as connected and HTTPS works (this can
   take from minutes to a day).
4. Check every page on the real domain, then cancel the Wix plan.

## Useful to know

- **Test a deploy by hand:** `npm run build` then `npx firebase-tools deploy --only hosting`.
- **Undo a bad release:** Firebase console > Hosting > release history > **Rollback**.
- **Pull requests** get a temporary preview address, posted as a comment on the PR.
- **Page addresses end in a slash** (`/amenities/`). The address without it
  redirects there, so old Wix links keep working.
