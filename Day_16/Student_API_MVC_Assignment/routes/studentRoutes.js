const {
  getStudents,
  createStudent,
  deleteStudent,
} = require("../controllers/studentController");

function handleStudentRoutes(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && requestUrl.pathname === "/students") {
    getStudents(req, res);
    return true;
  }

  if (req.method === "POST" && requestUrl.pathname === "/students") {
    createStudent(req, res);
    return true;
  }

  if (req.method === "DELETE" && requestUrl.pathname.startsWith("/students/")) {
    const studentId = requestUrl.pathname.split("/")[2];
    deleteStudent(req, res, studentId);
    return true;
  }

  return false;
}

module.exports = {
  handleStudentRoutes,
};
