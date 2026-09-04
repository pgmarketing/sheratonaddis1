const { jsonResponse } = require('./_shared');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return jsonResponse(405, { error: 'Method not allowed' });

  const { passcode } = JSON.parse(event.body || '{}');
  if (passcode === process.env.ADMIN_KEY) {
    return jsonResponse(200, { ok: true });
  }
  return jsonResponse(401, { ok: false, error: 'Incorrect passcode' });
};
