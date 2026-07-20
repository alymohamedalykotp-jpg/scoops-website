import { Link } from 'react-router-dom';
import { AtSign, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream mt-24">
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold mb-3">Scoops</p>
          <p className="text-cream/70 text-sm leading-relaxed">
            Small-batch ice cream, hand-pulled espresso, and biscuit
            sandwiches — made from scratch, served with a smile.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-4 text-sm text-cream/80 hover:text-butter transition-colors"
          >
            <AtSign size={16} /> scoopsshop
          </a>
        </div>

        <div className="text-sm">
          <p className="font-semibold mb-3 text-butter">Visit</p>
          <p className="flex items-start gap-2 mb-2 text-cream/80">
            <MapPin size={16} className="shrink-0 mt-0.5" />
            123 Main Street, Your Town
          </p>
          <p className="flex items-center gap-2 mb-2 text-cream/80">
            <Phone size={16} /> (662) 260-2600
          </p>
          <p className="flex items-start gap-2 text-cream/80">
            <Clock size={16} className="shrink-0 mt-0.5" />
            Mon–Sat 10am–9pm · Sun 12pm–8pm
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold mb-3 text-butter">Explore</p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <Link to="/menu" className="hover:text-butter transition-colors">
                Full Menu
              </Link>
            </li>
            <li>
              <Link
                to="/reservations"
                className="hover:text-butter transition-colors"
              >
                Reserve a Table
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-butter transition-colors">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Scoops. All rights reserved.
      </div>
    </footer>
  );
}
