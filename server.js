/**
 * server.js
 * ---------
 * Entry-point.  Responsibilities:
 *   • Create the Express app
 *   • Register middleware (JSON body-parser, static files)
 *   • Mount API routes
 *   • Serve the SPA for every non-API path
 *   • Start listening
 */

const express = require("express");
const path = require("path");
const classroomRoutes = require("./routes/classroomRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────
app.use(express.json());                          // parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // serve /public

// ─── API ROUTES ────────────────────────────────────────────────────────────
app.use("/api/classrooms", classroomRoutes);

// ─── SPA FALLBACK ──────────────────────────────────────────────────────────
// Any route that is not /api/* returns the main HTML page so the
// single-page app can handle client-side navigation.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── 404 for unknown API routes ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// ─── Global error handler ─────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on the server." });
});

// ─── LISTEN ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓  College Exam Seat Planner running at http://localhost:${PORT}\n`);
});
