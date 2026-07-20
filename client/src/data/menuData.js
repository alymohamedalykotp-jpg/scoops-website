// ---------------------------------------------------------------------------
// MENU DATA
// ---------------------------------------------------------------------------
// This file was drafted from photos of Scoops' handwritten chalkboard menus.
// The chalkboard photos were low-resolution, so exact prices could not all
// be read with full confidence. Every price below is marked as a best-guess
// placeholder — please open this file and correct any that are off before
// publishing. Everything here (names, sizes, prices, descriptions) is plain
// data, so editing it is just editing text, no code changes needed.
// ---------------------------------------------------------------------------

export const menu = [
  {
    id: 'scoops',
    title: 'Scoops',
    subtitle: 'Hand-dipped, by the cone or the cup',
    items: [
      { name: 'Single Scoop', price: 3.5, note: 'cup or cake cone' },
      { name: 'Double Scoop', price: 4.75, note: 'cup or cake cone' },
      { name: 'Triple Scoop', price: 5.95, note: 'cup or cake cone' },
      { name: 'Waffle Cone Upgrade', price: 0.75 },
      { name: 'Extra Scoop', price: 1.5 },
      { name: 'Kiddie Scoop', price: 2.75 },
    ],
  },
  {
    id: 'sundaes',
    title: 'Sundaes & Specialties',
    subtitle: 'The good stuff, piled high',
    items: [
      {
        name: 'Banana Split',
        price: 6.99,
        note: 'three scoops, whipped cream, cherries',
      },
      {
        name: 'Brownie Sundae',
        price: 6.25,
        note: 'warm brownie, vanilla, hot fudge',
      },
      { name: 'Classic Sundae', price: 4.5, note: 'two scoops, choice of topping' },
      { name: 'Build-Your-Own Sundae', price: 5.5 },
    ],
  },
  {
    id: 'shakes',
    title: 'Shakes & Frozen Drinks',
    items: [
      { name: 'Milkshake', price: 5.25, note: '16 oz, any flavor' },
      { name: 'Iced Coffee Shake', price: 5.75, note: 'blended coffee, whipped cream' },
      { name: 'Frozen Hot Chocolate', price: 5.5, note: 'whipped cream, chocolate drizzle' },
    ],
  },
  {
    id: 'brews',
    title: 'Brews',
    subtitle: 'Hot & iced coffee',
    items: [
      { name: 'Drip Coffee', price: 2.75, note: '12 / 16 oz' },
      { name: 'Cold Brew', price: 3.75 },
      { name: 'Latte', price: 4.25, note: 'hot or iced' },
      { name: 'Cappuccino', price: 4.25 },
      { name: 'Mocha', price: 4.75 },
      { name: 'Espresso', price: 2.75, note: 'single or double shot' },
      { name: 'Hot Chocolate', price: 3.25 },
    ],
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    subtitle: 'Fresh biscuit sandwiches',
    items: [
      { name: 'Sausage, Egg & Cheese Biscuit', price: 4.95 },
      { name: 'Bacon, Egg & Cheese Biscuit', price: 4.95 },
      { name: 'Egg & Cheese Biscuit', price: 3.95 },
    ],
  },
];

export default menu;
