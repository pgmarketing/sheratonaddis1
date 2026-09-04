const { db } = require('./_firebase');
const { jsonResponse } = require('./_shared');

exports.handler = async (event) => {
  const q = ((event.queryStringParameters && event.queryStringParameters.q) || '').trim();
  if (!q) return jsonResponse(400, { error: 'Missing query' });

  try {
    if (q.includes('@')) {
      const snap = await db.collection('tickets').where('email', '==', q.toLowerCase()).get();
      if (snap.empty) return jsonResponse(404, { error: 'Ticket not found' });
      // Most recent purchase for that email
      const docs = snap.docs.map((d) => d.data()).sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));
      return jsonResponse(200, docs[0]);
    } else {
      const ref = await db.collection('tickets').doc(q.toUpperCase()).get();
      if (!ref.exists) return jsonResponse(404, { error: 'Ticket not found' });
      return jsonResponse(200, ref.data());
    }
  } catch (e) {
    return jsonResponse(500, { error: 'Lookup failed' });
  }
};
