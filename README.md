# 🎓 College Exam Seat Planner

A full-stack web app that lets administrators add classrooms and
intelligently allocate exam seats using a **greedy floor-first** strategy.

---

## 📁 Project Structure

```
exam-seat-planner/
├── server.js                        # Express entry-point
├── dataStore.js                     # In-memory data store (shared singleton)
├── package.json
├── routes/
│   └── classroomRoutes.js           # HTTP route definitions
├── controllers/
│   └── classroomController.js       # Business logic (validation + allocation)
└── public/
    └── index.html                   # Single-page frontend (HTML + CSS + JS)
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js          # or:  npm start

# 3. Open the app
# ➜  http://localhost:3000
```

> **Node.js ≥ 16** is required.

---

## 🌐 REST API Reference

| Method | Endpoint                  | Body (JSON)                                      | Description              |
|--------|---------------------------|--------------------------------------------------|--------------------------|
| POST   | `/api/classrooms`         | `{ roomId, capacity, floorNo, nearWashroom }`    | Add a classroom          |
| GET    | `/api/classrooms`         | –                                                | List all classrooms      |
| POST   | `/api/classrooms/allocate`| `{ totalStudents }`                              | Run greedy allocation    |

### Allocation algorithm (greedy)

1. Sort rooms **ascending** by `floorNo` (lower floors first).
2. On the same floor, sort **descending** by `capacity` (bigger rooms first).
3. Pick rooms sequentially until `totalStudents` is covered.
4. If the combined capacity of **all** rooms is less than `totalStudents`,
   the API returns `{ success: false, message: "Not enough seats available" }`.

---

## ✅ Validation Rules

| Field          | Rule                                  |
|----------------|---------------------------------------|
| `roomId`       | Non-empty string, unique              |
| `capacity`     | Positive integer (> 0)                |
| `floorNo`      | Non-negative integer (≥ 0)            |
| `nearWashroom` | Boolean (`true` / `false`)            |
| `totalStudents`| Positive integer (> 0)                |

---

## 📝 Notes

* Data is stored **in memory** – it resets when the server restarts.
* The frontend is a single HTML file with no build step.
* All business logic is isolated in `classroomController.js`; routes are
  thin wrappers that only handle HTTP concerns.

# Ashutosh Patel (Developer)
