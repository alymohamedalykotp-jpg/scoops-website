import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { adminLogin } from '../api';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminLogin(password);
      onLogin(token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[70vh] grid place-items-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-3xl border border-cocoa/10 shadow-sm p-8 grid gap-5"
      >
        <div className="text-center">
          <span className="inline-grid place-items-center w-12 h-12 rounded-full bg-cocoa text-cream mb-4">
            <Lock size={20} />
          </span>
          <h1 className="font-display font-bold text-2xl text-cocoa">
            Staff Login
          </h1>
          <p className="text-cocoa/60 text-sm mt-1">
            Enter the admin password to manage reservations.
          </p>
        </div>

        <label className="grid gap-1.5 text-sm text-left">
          <span className="font-medium text-cocoa/80">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-cocoa/20 px-4 py-2.5 focus:border-teal transition-colors"
          />
        </label>

        {error && <p className="text-cherry-dark text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-cocoa text-cream px-6 py-2.5 font-semibold hover:bg-cherry transition-colors disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}
