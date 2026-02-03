/**
 * dataStore.js
 * -----------
 * In-memory store for classrooms.  Exported as a plain object so every
 * module that imports it shares the SAME array reference – no database needed.
 */

const store = {
  classrooms: [] // { roomId, capacity, floorNo, nearWashroom }
};

module.exports = store;
