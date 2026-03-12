# Student API MVC Assignment

This project implements a Student API using an MVC-style structure with Node.js and the built-in `http` module.

## Structure
- `controllers/studentController.js`
- `routes/studentRoutes.js`
- `server.js`

## Endpoints
- `GET /students`
- `POST /students`
- `DELETE /students/:id`

## MVC Mapping
- Controller: contains student API logic and response handling
- Routes: matches request method/path and forwards to controller
- Server: creates the HTTP server and connects routes

## How To Run
1. Open terminal in `Day_16/Student_API_MVC_Assignment`
2. Run `node server.js`
3. Use `http://localhost:3001`

## Sample Requests
```bash
curl http://localhost:3001/students

curl -X POST http://localhost:3001/students ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Meena\",\"course\":\"Express\"}"

curl -X DELETE http://localhost:3001/students/2
```
