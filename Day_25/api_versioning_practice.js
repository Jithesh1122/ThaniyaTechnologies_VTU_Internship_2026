/**
 * Practical API versioning simulation.
 * Demonstrates version-aware response handling.
 */

const user = {
  id: "U1",
  fullName: "Asha Shetty",
  email: "asha@example.com",
  role: "editor",
};

function getUserResponse(apiVersion) {
  if (apiVersion === "v1") {
    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
  }

  if (apiVersion === "v2") {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }

  return {
    error: "Unsupported API version",
  };
}

console.log("v1 response:", getUserResponse("v1"));
console.log("v2 response:", getUserResponse("v2"));
console.log("unknown response:", getUserResponse("v3"));
