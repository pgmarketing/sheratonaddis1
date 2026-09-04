const { db } = require('./_firebase');
const { jsonResponse, requireAdmin } = require('./_shared');

exports.handler = async (event) => {
  if (!requireAdmin(event)) return jsonResponse(401, { error: 'Invalid admin passcode' });

  const snap = await db.collection('tickets').orderBy('issuedAt', 'desc').get();
  const rows = snap.docs.map((d) => d.data());
  return jsonResponse(200, rows);
};
