const admin = require('firebase-admin');

// FIREBASE_SERVICE_ACCOUNT should be set as a Netlify environment variable
// containing the full contents of your Firebase service account JSON file,
// as a single-line string.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

const db = admin.firestore();

module.exports = { db, admin };
