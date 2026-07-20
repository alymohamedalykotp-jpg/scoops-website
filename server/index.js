// Local development entrypoint. In production on Vercel, api/index.js is
// used instead (see that file) — this file is only for `npm start` on
// your own machine.
import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Scoops server running on http://localhost:${PORT}`);
});
