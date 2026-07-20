// In local dev, Vite proxies "/api" to the backend (see vite.config.js).
// In production, set VITE_API_URL to your deployed backend's URL,
// e.g. https://scoops-api.onrender.com
const BASE = `${import.meta.env.VITE_API_URL || ''}/api`;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function createReservation(payload) {
  return request('/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function adminLogin(password) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function fetchReservations(token) {
  return request('/reservations', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateReservation(token, id, updates) {
  return request(`/reservations/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(updates),
  });
}

export function deleteReservation(token, id) {
  return request(`/reservations/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
