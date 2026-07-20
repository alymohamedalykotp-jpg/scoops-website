import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { menu } from '../data/menuData';
import ScallopDivider from '../components/ScallopDivider';

const categoryAccent = {
  scoops: 'text-cherry',
  sundaes: 'text-butter',
  shakes: 'text-teal',
  brews: 'text-cocoa-2',
  breakfast: 'text-cherry',
};

export default function Menu() {
  return (
    <>
      <section className="bg-cocoa text-cream py-16">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-butter mb-3">
            Chalkboard to table
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl">
            The Menu
          </h1>
          <p className="text-cream/70 mt-4 max-w-lg mx-auto">
            Prices below were transcribed from our in-store chalkboards and
            are updated from time to time — always double-check specials with
            your server.
          </p>
        </div>
      </section>
      <ScallopDivider color="var(--color-cocoa)" flip />

      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="grid gap-16">
          {menu.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-cocoa/30 text-sm">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2
                  className={`font-display font-bold text-2xl md:text-3xl ${
                    categoryAccent[category.id] || 'text-cocoa'
                  }`}
                >
                  {category.title}
                </h2>
              </div>
              {category.subtitle && (
                <p className="text-cocoa/60 mb-6 ml-9">{category.subtitle}</p>
              )}

              <ul className="ml-9 divide-y divide-cocoa/10 border-t border-b border-cocoa/10">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <div>
                      <p className="font-body font-medium text-cocoa">
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="text-sm text-cocoa/50">{item.note}</p>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-cherry whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/reservations"
            className="inline-block rounded-full bg-cherry text-cream px-8 py-3 font-semibold hover:bg-cherry-dark transition-colors"
          >
            Reserve a Table
          </Link>
        </div>
      </section>
    </>
  );
}
