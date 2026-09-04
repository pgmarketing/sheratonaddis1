# PMG Ticketing — Netlify + Firebase version

This version uses **Netlify** to host the site and run the backend
(as serverless functions), and **Firebase Firestore** as the database.
No server for you to manage — Netlify runs the functions on demand.

## What's in this folder

```
public/index.html          the whole website
netlify/functions/         one file per backend action
netlify.toml                tells Netlify how to build + routes /api/* to functions
package.json                 the one dependency: firebase-admin
```

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com and create a new project.
2. In the project, go to **Build → Firestore Database → Create database**.
   Start in production mode.
3. Go to **Project settings → Service accounts → Generate new private
   key**. This downloads a JSON file — keep it secret, don't commit it
   anywhere public.

## 2. Create a Netlify site

1. Go to https://app.netlify.com and create a new site.
2. Easiest path: push this folder to a GitHub repo, then in Netlify
   choose "Import an existing project" and connect that repo. Netlify
   will read `netlify.toml` automatically and know what to do.
   (You can also drag-and-drop deploy without git, but connecting a
   repo makes future updates much easier.)

## 3. Set your environment variables in Netlify

In your Netlify site: **Site configuration → Environment variables**,
add:

| Key | Value |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | The entire contents of the Firebase JSON key file from step 1, pasted as one value |
| `ADMIN_KEY` | Whatever passcode your door/admin staff should use |

For `FIREBASE_SERVICE_ACCOUNT`, open the downloaded JSON file, copy
everything between (and including) the outer `{ }`, and paste it in as
a single-line value.

## 4. Deploy

If you connected a GitHub repo, Netlify deploys automatically on every
push. Otherwise, trigger a deploy from the Netlify dashboard.

Once deployed, your site is live at the `.netlify.app` URL Netlify
gives you — the next section covers pointing your own domain at it.

## 5. Connect your own domain

In Netlify: **Site configuration → Domain management → Add a domain**.
Follow the instructions there — usually adding a couple of DNS records
(a CNAME or A record) at wherever you bought the domain. Netlify
handles HTTPS automatically once the domain is connected.

## Testing locally before deploying (optional but recommended)

```bash
npm install -g netlify-cli
npm install
netlify dev
```

This runs the whole site (frontend + functions) on your machine at
`http://localhost:8888`, using your real `.env` values if you create
one locally with the same two variables as above.

## Still worth doing before a big event

- **Firestore security rules** — by default a new Firestore database
  in production mode blocks all client access, which is what you want
  since only your Netlify Functions (using the admin SDK) should
  touch it. Don't loosen these rules unless you know why.
- **Rate limiting** on ticket creation — Netlify Functions don't limit
  this by default. Consider Netlify's rate limiting settings or adding
  a simple check.
- A **second admin key or account** if more than one staff member
  needs to run the door — this version shares one passcode.
