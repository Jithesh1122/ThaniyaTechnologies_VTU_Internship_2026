const localStorageMock = {
  token: "sample-jwt-token",
  user: JSON.stringify({ id: 7, role: "candidate", name: "Asha" }),
};

function restoreSession(storage) {
  if (!storage.token || !storage.user) {
    return { isAuthenticated: false, user: null };
  }

  return {
    isAuthenticated: true,
    user: JSON.parse(storage.user),
  };
}

function canAccessRoute(route, session) {
  const protectedRoutes = ["/dashboard", "/profile"];

  if (!protectedRoutes.includes(route)) {
    return true;
  }

  return session.isAuthenticated;
}

function runPractice() {
  console.log("Authentication state restoration simulation\n");

  const restoredSession = restoreSession(localStorageMock);
  console.log("Restored session:");
  console.table(restoredSession);
  console.log("");

  const routes = ["/", "/login", "/dashboard", "/profile"];

  for (const route of routes) {
    const allowed = canAccessRoute(route, restoredSession);
    console.log(`${route} -> ${allowed ? "allowed" : "redirect to login"}`);
  }
}

runPractice();
