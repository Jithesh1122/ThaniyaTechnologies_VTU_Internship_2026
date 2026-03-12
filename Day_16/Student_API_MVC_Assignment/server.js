const http = require("http");
const { handleStudentRoutes } = require("./routes/studentRoutes");

const PORT = 3001;

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

const server = http.createServer((req, res) => {
  const handled = handleStudentRoutes(req, res);
  if (!handled) {
    sendNotFound(res);
  }
});

server.listen(PORT, () => {
  console.log(`Student API MVC server running on http://localhost:${PORT}`);
});
