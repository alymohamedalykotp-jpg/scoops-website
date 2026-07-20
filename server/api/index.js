// Vercel serverless entrypoint. Vercel automatically turns any file in
// /api into a serverless function; exporting the Express app here lets
// Vercel route all requests to it.
import app from '../app.js';

export default app;
