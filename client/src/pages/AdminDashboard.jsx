import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Trash2, LogOut, RefreshCw } from 'lucide-react';
import {
  fetchReservations,
  updateReservation,
  deleteReservation,
} from '../api';

const statusStyles = {
  pending: 'bg-butter/20 text-cocoa border-butter/40',
  confirmed: 'bg-teal/15 text-teal border-teal/40',
  cancelled: 'bg-cherry/10 text-cherry-dark border-cherry/40',
};

const filters = ['all', 'pending', 'confirmed', 'cancelled'];

export default function AdminDashboard({ token, onLogout }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchReservations(token);
      setReservations(data);
    } catch (err) {
      setError(err.message || 'Could not load reservations.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setStatus(id, status) {
    setReservations((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status } : r))
    );
    try {
      await updateReservation(token, id, { status });
    } catch {
      load();
    }
  }

  async function remove(id) {
    if (!confirm('Delete this reservation? This cannot be undone.')) return;
    setReservations((rs) => rs.filter((r) => r.id !== id));
    try {
      await deleteReservation(token, id);
    } catch {
      load();
    }
  }

  const visible = useMemo(
    () =>
      filter === 'all'
        ? reservations
        : reservations.filter((r) => r.status === filter),
    [reservations, filter]
  );

  const counts = useMemo(() => {
    const base = { all: reservations.length, pending: 0, confirmed: 0, cancelled: 0 };
    reservations.forEach((r) => {
      base[r.status] = (base[r.status] || 0) + 1;
    });
    return base;
  }, [reservations]);

  function logout() {
    onLogout();
    navigate('/admin');
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-1">
            Staff dashboard
          </p>
          <h1 className="font-display font-bold text-3xl text-cocoa">
            Reservations
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-full border border-cocoa/20 px-4 py-2 text-sm font-medium hover:bg-cocoa/5 transition-colors"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full bg-cocoa text-cream px-4 py-2 text-sm font-medium hover:bg-cherry transition-colors"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors capitalize ${
              filter === f
                ? 'bg-cocoa text-cream border-cocoa'
                : 'border-cocoa/20 text-cocoa/70 hover:bg-cocoa/5'
            }`}
          >
            {f} <span className="opacity-60">({counts[f] || 0})</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 text-cherry-dark text-sm bg-cherry/10 border border-cherry/30 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-cocoa/60">Loading reservations…</p>
      ) : visible.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-cocoa/20 rounded-2xl">
          <p className="text-cocoa/60">No reservations here yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-cocoa/10">
          <table className="w-full text-sm">
            <thead className="bg-cocoa/5 text-cocoa/60 text-left uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 font-medium">Guest</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Party</th>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Notes</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa/10 bg-white">
              {visible.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-cocoa whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 text-cocoa/70 whitespace-nowrap">
                    <div>{r.email}</div>
                    <div className="text-xs text-cocoa/50">{r.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-cocoa/70">{r.partySize}</td>
                  <td className="px-4 py-3 text-cocoa/70 whitespace-nowrap">
                    <div>{r.date}</div>
                    <div className="text-xs text-cocoa/50">{r.time}</div>
                  </td>
                  <td className="px-4 py-3 text-cocoa/60 max-w-[200px] truncate">
                    {r.notes || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        title="Confirm"
                        onClick={() => setStatus(r.id, 'confirmed')}
                        className="p-1.5 rounded-full hover:bg-teal/15 text-teal transition-colors"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button
                        title="Cancel"
                        onClick={() => setStatus(r.id, 'cancelled')}
                        className="p-1.5 rounded-full hover:bg-cherry/15 text-cherry-dark transition-colors"
                      >
                        <XCircle size={18} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => remove(r.id)}
                        className="p-1.5 rounded-full hover:bg-cocoa/10 text-cocoa/60 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
