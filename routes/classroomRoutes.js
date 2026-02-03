/**
 * routes/classroomRoutes.js
 * -------------------------
 * Thin route layer.  Every handler:
 *   1. Extracts data from req
 *   2. Calls the controller
 *   3. Sends an appropriate JSON response
 *
 * No business logic lives here.
 */

const express = require("express");
const router = express.Router();
const ctrl = require("./classroomController");

// POST /api/classrooms  – add a new classroom
router.post("/", (req, res) => {
  try {
    const result = ctrl.addClassroom(req.body);
    res.status(result.success ? 201 : 400).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// GET  /api/classrooms  – list all classrooms
router.get("/", (req, res) => {
  try {
    res.status(200).json(ctrl.getAllClassrooms());
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// POST /api/classrooms/allocate  – greedy exam-seat allocation
router.post("/allocate", (req, res) => {
  try {
    const { totalStudents } = req.body;
    const result = ctrl.allocateExam(totalStudents);
    res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
