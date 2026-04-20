const initialState = {
  selectedUserId: null,
  activeFilter: "all",
  isDetailsModalOpen: false,
  errorMessage: null,
};

function uiReducer(state, action) {
  switch (action.type) {
    case "SELECT_USER":
      return {
        ...state,
        selectedUserId: action.payload.userId,
        isDetailsModalOpen: true,
        errorMessage: null,
      };
    case "APPLY_FILTER":
      return {
        ...state,
        activeFilter: action.payload.filter,
        selectedUserId: null,
        isDetailsModalOpen: false,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isDetailsModalOpen: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        errorMessage: action.payload.message,
      };
    case "RESET_VIEW":
      return { ...initialState };
    default:
      return state;
  }
}

function runPractice() {
  console.log("Reducer-driven UI state simulation\n");

  const actions = [
    { type: "SELECT_USER", payload: { userId: 42 } },
    { type: "APPLY_FILTER", payload: { filter: "active" } },
    { type: "SELECT_USER", payload: { userId: 19 } },
    { type: "SET_ERROR", payload: { message: "Profile load failed" } },
    { type: "CLOSE_MODAL" },
    { type: "RESET_VIEW" },
  ];

  let state = initialState;

  console.log("Initial state:");
  console.table(state);
  console.log("");

  for (const action of actions) {
    state = uiReducer(state, action);
    console.log(`After action: ${action.type}`);
    console.table(state);
    console.log("");
  }
}

runPractice();
