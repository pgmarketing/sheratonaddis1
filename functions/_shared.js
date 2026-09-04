const EVENT_NAME = "Ethiopian New Year's Eve Concert 2019";
const TICKET_PRICE = "25,000 ETB";

function generateTicketId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'NYE-';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function requireAdmin(event) {
  const key = event.headers['x-admin-key'] || event.headers['X-Admin-Key'];
  return key === process.env.ADMIN_KEY;
}

module.exports = { EVENT_NAME, TICKET_PRICE, generateTicketId, jsonResponse, requireAdmin };
