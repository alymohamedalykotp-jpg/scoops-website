import express from 'express';
import cors from 'cors';
import { customAlphabet } from 'nanoid';
import {
  getReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} from './db.js';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

// Change these before deploying anywhere real. This demo uses a single
// shared admin password rather than real user accounts.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'scoops2026';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'scoops-admin-token';

const app = express();
app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// --- Public: create a reservation ---
app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, partySize, date, time, notes } = req.body;

  if (!name || !email || !phone || !partySize || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const reservation = {
    id: nanoid(),
    name,
    email,
    phone,
    partySize: Number(partySize),
    date,
    time,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await addReservation(reservation);
  res.status(201).json(reservation);
});

// --- Admin: login ---
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }
  res.status(401).json({ error: 'Incorrect password.' });
});

// --- Admin: list reservations ---
app.get('/api/reservations', requireAdmin, async (req, res) => {
  const reservations = await getReservations();
  res.json(reservations);
});

// --- Admin: update reservation status ---
app.patch('/api/reservations/:id', requireAdmin, async (req, res) => {
  const updated = await updateReservation(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// --- Admin: delete reservation ---
app.delete('/api/reservations/:id', requireAdmin, async (req, res) => {
  const ok = await deleteReservation(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

export default app;
