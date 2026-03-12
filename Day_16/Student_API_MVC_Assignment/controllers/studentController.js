const students = [
  { id: 1, name: "Asha", course: "MERN" },
  { id: 2, name: "Ravi", course: "Node.js" },
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error("Invalid JSON payload"));
      }
    });

    req.on("error", reject);
  });
}

function getStudents(req, res) {
  sendJson(res, 200, students);
}

async function createStudent(req, res) {
  try {
    const payload = await parseBody(req);
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const course = typeof payload.course === "string" ? payload.course.trim() : "";

    if (!name || !course) {
      sendJson(res, 400, { message: "Fields required: name, course" });
      return;
    }

    const student = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      course,
    };

    students.push(student);
    sendJson(res, 201, student);
  } catch (error) {
    sendJson(res, 400, { message: error.message });
  }
}

function deleteStudent(req, res, studentId) {
  const id = Number(studentId);

  if (!Number.isInteger(id) || id < 1) {
    sendJson(res, 400, { message: "Invalid student id" });
    return;
  }

  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    sendJson(res, 404, { message: "Student not found" });
    return;
  }

  const removedStudent = students.splice(index, 1)[0];
  sendJson(res, 200, {
    message: "Student deleted",
    student: removedStudent,
  });
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
};
