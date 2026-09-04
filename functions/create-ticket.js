const { db } = require('./_firebase');
const { EVENT_NAME, TICKET_TYPES, generateTicketId, jsonResponse } = require('./_shared');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return jsonResponse(405, { error: 'Method not allowed' });

  const { name, email, phone, paymentRef, ticketType } = JSON.parse(event.body || '{}');
  if (!name || !email || !phone || !paymentRef) {
    return jsonResponse(400, { error: 'name, email, phone, and paymentRef are all required' });
  }
  if (!TICKET_TYPES[ticketType]) {
    return jsonResponse(400, { error: 'ticketType must be one of: ' + Object.keys(TICKET_TYPES).join(', ') });
  }

  const { label, price, perks } = TICKET_TYPES[ticketType];
  const ticketId = generateTicketId();
  const ticket = {
    ticketId,
    event: EVENT_NAME,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    ticketType,
    ticketLabel: label,
    price,
    perks,
    paymentRef: paymentRef.trim(),
    verified: false,
    checkedIn: false,
    issuedAt: new Date().toISOString(),
  };

  await db.collection('tickets').doc(ticketId).set(ticket);
  return jsonResponse(201, ticket);
};
