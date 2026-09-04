const { db } = require('./_firebase');
const { jsonResponse, requireAdmin } = require('./_shared');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return jsonResponse(405, { error: 'Method not allowed' });
  if (!requireAdmin(event)) return jsonResponse(401, { error: 'Invalid admin passcode' });

  const { ticketId } = JSON.parse(event.body || '{}');
  if (!ticketId) return jsonResponse(400, { error: 'ticketId required' });

  const ref = db.collection('tickets').doc(ticketId.toUpperCase());
  const doc = await ref.get();
  if (!doc.exists) return jsonResponse(404, { error: 'Ticket not found' });

  await ref.update({ verified: true, verifiedAt: new Date().toISOString() });
  const updated = await ref.get();
  return jsonResponse(200, updated.data());
};
