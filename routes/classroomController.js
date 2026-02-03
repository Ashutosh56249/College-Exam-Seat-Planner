

const store = require("./dataStore");


function validateClassroom(body) {
  const { roomId, capacity, floorNo, nearWashroom } = body || {};

  
  if (roomId === undefined || roomId === null || String(roomId).trim() === "") {
    return { valid: false, message: "roomId is required and must be a non-empty string." };
  }

  
  if (capacity === undefined || capacity === null || isNaN(Number(capacity)) || Number(capacity) <= 0 || !Number.isInteger(Number(capacity))) {
    return { valid: false, message: "capacity is required and must be a positive integer." };
  }

 
  if (floorNo === undefined || floorNo === null || isNaN(Number(floorNo)) || Number(floorNo) < 0 || !Number.isInteger(Number(floorNo))) {
    return { valid: false, message: "floorNo is required and must be a non-negative integer." };
  }

  
  const nw = nearWashroom === true || nearWashroom === "true";
  if (nearWashroom !== true && nearWashroom !== false && nearWashroom !== "true" && nearWashroom !== "false" && nearWashroom !== undefined) {
    return { valid: false, message: "nearWashroom must be a boolean (true / false)." };
  }

  return { valid: true };
}

// ─── ADD CLASSROOM 

function addClassroom(body) {
  const validation = validateClassroom(body);
  if (!validation.valid) return { success: false, message: validation.message };

  const roomId = String(body.roomId).trim();

  // Uniqueness check
  if (store.classrooms.find((c) => c.roomId === roomId)) {
    return { success: false, message: `A classroom with roomId "${roomId}" already exists.` };
  }

  const classroom = {
    roomId,
    capacity: Number(body.capacity),
    floorNo: Number(body.floorNo),
    nearWashroom: body.nearWashroom === true || body.nearWashroom === "true"
  };

  store.classrooms.push(classroom);
  return { success: true, message: "Classroom added successfully.", data: classroom };
}

// ─── GET ALL CLASssROOMS ──────

function getAllClassrooms() {
  return { success: true, data: store.classrooms };
}



function allocateExam(totalStudents) {
  // ── input validation ──
  if (totalStudents === undefined || totalStudents === null || isNaN(Number(totalStudents)) || !Number.isInteger(Number(totalStudents)) || Number(totalStudents) <= 0) {
    return { success: false, message: "totalStudents must be a positive integer." };
  }

  totalStudents = Number(totalStudents);

  
  if (store.classrooms.length === 0) {
    return { success: false, message: "No classrooms available. Add classrooms first." };
  }

  
  const totalCapacity = store.classrooms.reduce((sum, c) => sum + c.capacity, 0);
  if (totalCapacity < totalStudents) {
    return { success: false, message: "Not enough seats available" };
  }

  
  const sorted = [...store.classrooms].sort((a, b) => {
    if (a.floorNo !== b.floorNo) return a.floorNo - b.floorNo;   
    return b.capacity - a.capacity;                                
  });

  
  let remaining = totalStudents;
  const allocated = [];

  for (const room of sorted) {
    if (remaining <= 0) break;
    allocated.push({ ...room, studentsAssigned: Math.min(room.capacity, remaining) });
    remaining -= room.capacity;
  }

  return {
    success: true,
    message: `Successfully allocated seats for ${totalStudents} student(s).`,
    data: {
      totalStudents,
      roomsUsed: allocated.length,
      allocated
    }
  };
}

module.exports = { addClassroom, getAllClassrooms, allocateExam };
