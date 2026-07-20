import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu as MenuIcon, X, IceCreamCone } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reserve a Table' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-cocoa/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-2xl font-bold text-cocoa"
          onClick={() => setOpen(false)}
        >
          <span className="grid place-items-center w-9 h-9 rounded-full bg-cherry text-cream">
            <IceCreamCone size={20} strokeWidth={2.5} />
          </span>
          Scoops
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body text-[15px] font-medium">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors hover:text-cherry ${
                  isActive ? 'text-cherry' : 'text-cocoa'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/reservations"
            className="rounded-full bg-cocoa text-cream px-5 py-2 text-sm font-semibold hover:bg-cherry transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          className="md:hidden text-cocoa"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3 font-body">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-1 ${isActive ? 'text-cherry font-semibold' : 'text-cocoa'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
