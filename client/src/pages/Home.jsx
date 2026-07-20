import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScallopDivider from '../components/ScallopDivider';
import bananaSplit from '../assets/banana-split.png';
import brownieSundae from '../assets/brownie-sundae.png';
import coffeePour from '../assets/coffee-pour.jpg';
import breakfast from '../assets/breakfast-sandwiches.jpg';
import frappeStorefront from '../assets/frappe-storefront.jpg';
import latte from '../assets/latte.jpg';
import coffeeShake from '../assets/coffee-shake.jpg';
import drinkStorefront from '../assets/scoops-drink-storefront.jpg';
import hotChocolateDuo from '../assets/hot-chocolate-duo.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const gallery = [
  { src: bananaSplit, alt: 'Banana split with three scoops, whipped cream, and cherries' },
  { src: coffeePour, alt: 'Fresh cup of drip coffee' },
  { src: breakfast, alt: 'Tray of fresh biscuit breakfast sandwiches' },
  { src: frappeStorefront, alt: 'Iced mocha frappe held outside the shop' },
  { src: brownieSundae, alt: 'Warm brownie sundae with vanilla ice cream and fudge' },
  { src: latte, alt: 'Latte with foam swirl' },
  { src: coffeeShake, alt: 'Two chocolate shakes with whipped cream' },
  { src: drinkStorefront, alt: 'Iced coffee drink held in front of the Scoops storefront' },
  { src: hotChocolateDuo, alt: 'Frozen hot chocolate in a Scoops cup' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-cherry-dark bg-cherry/10 px-3 py-1 rounded-full mb-5">
              Scratch-made daily
            </span>
            <h1 className="font-display font-black text-cocoa text-5xl md:text-6xl leading-[1.05] mb-5">
              Ice cream, coffee,
              <br />
              and a place to sit a while.
            </h1>
            <p className="text-cocoa/70 text-lg leading-relaxed max-w-md mb-8">
              Hand-dipped scoops, hand-pulled espresso, and biscuit sandwiches
              made fresh every morning. Come by, or save yourself a table.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/reservations"
                className="rounded-full bg-cherry text-cream px-7 py-3 font-semibold hover:bg-cherry-dark transition-colors shadow-sm"
              >
                Reserve a Table
              </Link>
              <Link
                to="/menu"
                className="rounded-full border-2 border-cocoa text-cocoa px-7 py-3 font-semibold hover:bg-cocoa hover:text-cream transition-colors"
              >
                See the Menu
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden border-8 border-white shadow-xl rotate-3">
              <img
                src={bananaSplit}
                alt="Banana split sundae with whipped cream and cherries"
                className="w-full h-[380px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-butter/90 grid place-items-center rotate-[-8deg] shadow-lg hidden sm:grid">
              <p className="font-display font-bold text-cocoa text-center text-sm leading-tight px-2">
                Made
                <br />
                fresh
                <br />
                daily
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ScallopDivider color="var(--color-cocoa)" />

      {/* STRIP */}
      <section className="bg-cocoa text-cream py-4">
        <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-center gap-x-10 gap-y-2 font-display text-sm tracking-wide uppercase">
          <span>Small-batch scoops</span>
          <span className="text-cherry">•</span>
          <span>Hand-pulled espresso</span>
          <span className="text-cherry">•</span>
          <span>Fresh biscuit breakfast</span>
          <span className="text-cherry">•</span>
          <span>Family owned</span>
        </div>
      </section>

      <ScallopDivider color="var(--color-cocoa)" flip />

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">
            From the counter
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-cocoa">
            A little taste of what's inside
          </h2>
        </motion.div>

        <div className="columns-2 sm:columns-3 gap-4 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <motion.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="w-full rounded-2xl break-inside-avoid shadow-sm border-4 border-white"
            />
          ))}
        </div>
      </section>

      <ScallopDivider color="var(--color-teal)" />

      {/* CTA */}
      <section className="bg-teal text-cream py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Planning a visit with a group?
          </h2>
          <p className="text-cream/90 mb-8 leading-relaxed">
            Reserve a table ahead of time and we'll have it ready when you
            walk in — no waiting on the sidewalk for a scoop.
          </p>
          <Link
            to="/reservations"
            className="inline-block rounded-full bg-cream text-teal px-8 py-3 font-semibold hover:bg-butter transition-colors"
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      <ScallopDivider color="var(--color-teal)" flip />
    </>
  );
}
