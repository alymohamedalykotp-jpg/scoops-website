// ---------------------------------------------------------------------------
// Storage layer.
//
// If DATABASE_URL is set (a Postgres connection string, e.g. from Neon),
// reservations are stored there permanently — safe for production, survives
// redeploys and restarts.
//
// If DATABASE_URL is NOT set, this falls back to a local data.json file,
// which is only meant for quick local testing on your own machine.
// ---------------------------------------------------------------------------

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const usingPostgres = Boolean(process.env.DATABASE_URL);

let pool;
if (usingPostgres) {
  const { Pool } = await import('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      party_size INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log('Storage: Postgres (persistent)');
} else {
  console.log('Storage: local data.json (dev only — set DATABASE_URL for production)');
}

const DB_PATH = new URL('./data.json', import.meta.url);

async function loadFile() {
  if (!existsSync(DB_PATH)) {
    await writeFile(DB_PATH, JSON.stringify({ reservations: [] }, null, 2));
  }
  const raw = await readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function saveFile(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

function rowToReservation(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    partySize: row.party_size,
    date: row.date,
    time: row.time,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

export async function getReservations() {
  if (usingPostgres) {
    const { rows } = await pool.query(
      'SELECT * FROM reservations ORDER BY created_at DESC'
    );
    return rows.map(rowToReservation);
  }
  const data = await loadFile();
  return data.reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addReservation(reservation) {
  if (usingPostgres) {
    await pool.query(
      `INSERT INTO reservations (id, name, email, phone, party_size, date, time, notes, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        reservation.id,
        reservation.name,
        reservation.email,
        reservation.phone,
        reservation.partySize,
        reservation.date,
        reservation.time,
        reservation.notes,
        reservation.status,
        reservation.createdAt,
      ]
    );
    return reservation;
  }
  const data = await loadFile();
  data.reservations.push(reservation);
  await saveFile(data);
  return reservation;
}

export async function updateReservation(id, updates) {
  if (usingPostgres) {
    const fields = [];
    const values = [];
    let i = 1;
    for (const [key, value] of Object.entries(updates)) {
      const column = key === 'partySize' ? 'party_size' : key;
      fields.push(`${column} = $${i}`);
      values.push(value);
      i += 1;
    }
    if (fields.length === 0) return null;
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE reservations SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
      values
    );
    return rows[0] ? rowToReservation(rows[0]) : null;
  }
  const data = await loadFile();
  const idx = data.reservations.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  data.reservations[idx] = { ...data.reservations[idx], ...updates };
  await saveFile(data);
  return data.reservations[idx];
}

export async function deleteReservation(id) {
  if (usingPostgres) {
    const { rowCount } = await pool.query('DELETE FROM reservations WHERE id = $1', [id]);
    return rowCount > 0;
  }
  const data = await loadFile();
  const before = data.reservations.length;
  data.reservations = data.reservations.filter((r) => r.id !== id);
  await saveFile(data);
  return data.reservations.length < before;
}
