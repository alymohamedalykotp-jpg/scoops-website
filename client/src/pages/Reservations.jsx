import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { createReservation } from '../api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  partySize: 2,
  date: '',
  time: '',
  notes: '',
};

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function Reservations() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await createReservation(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">
          Save your spot
        </p>
        <h1 className="font-display font-black text-4xl text-cocoa mb-3">
          Reserve a Table
        </h1>
        <p className="text-cocoa/70 max-w-md mx-auto">
          Tell us when you're coming and how many, and we'll have a table
          waiting. We'll confirm by email or phone.
        </p>
      </div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-teal/10 border-2 border-teal text-cocoa p-8 text-center"
        >
          <CheckCircle2 className="mx-auto mb-3 text-teal" size={40} />
          <h2 className="font-display font-bold text-2xl mb-2">
            You're on the books!
          </h2>
          <p className="text-cocoa/70 mb-6">
            We've received your reservation request and will reach out to
            confirm the details.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="rounded-full border-2 border-cocoa px-6 py-2 font-semibold hover:bg-cocoa hover:text-cream transition-colors"
          >
            Make another reservation
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-cocoa/10 shadow-sm p-6 md:p-10 grid gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" htmlFor="name">
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass}
                placeholder="Jamie Rivera"
              />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass}
                placeholder="(555) 123-4567"
              />
            </Field>
          </div>

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Date" htmlFor="date">
              <input
                id="date"
                type="date"
                required
                min={todayISO()}
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Time" htmlFor="time">
              <input
                id="time"
                type="time"
                required
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Party size" htmlFor="partySize">
              <input
                id="partySize"
                type="number"
                min={1}
                max={20}
                required
                value={form.partySize}
                onChange={(e) => update('partySize', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Notes (optional)" htmlFor="notes">
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              className={inputClass}
              placeholder="High chair, allergy info, birthday shout-out, etc."
            />
          </Field>

          {status === 'error' && (
            <p className="flex items-center gap-2 text-cherry-dark text-sm">
              <AlertCircle size={16} /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-cherry text-cream px-8 py-3 font-semibold hover:bg-cherry-dark transition-colors disabled:opacity-60 justify-self-start"
          >
            {status === 'loading' ? 'Booking…' : 'Confirm Reservation'}
          </button>
        </form>
      )}
    </section>
  );
}

const inputClass =
  'w-full rounded-xl border border-cocoa/20 bg-cream/40 px-4 py-2.5 text-cocoa placeholder:text-cocoa/40 focus:border-teal focus:bg-white transition-colors';

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5 text-sm text-left">
      <span className="font-medium text-cocoa/80">{label}</span>
      {children}
    </label>
  );
}
