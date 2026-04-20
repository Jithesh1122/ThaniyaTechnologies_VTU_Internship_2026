const boardInitialState = {
  columns: {
    todo: ["Task A", "Task B"],
    inProgress: [],
    done: [],
  },
};

function boardReducer(state, action) {
  switch (action.type) {
    case "MOVE_TASK": {
      const { from, to, taskName } = action.payload;

      return {
        columns: {
          ...state.columns,
          [from]: state.columns[from].filter((task) => task !== taskName),
          [to]: [...state.columns[to], taskName],
        },
      };
    }
    case "ADD_TASK": {
      const { column, taskName } = action.payload;
      return {
        columns: {
          ...state.columns,
          [column]: [...state.columns[column], taskName],
        },
      };
    }
    case "REMOVE_TASK": {
      const { column, taskName } = action.payload;
      return {
        columns: {
          ...state.columns,
          [column]: state.columns[column].filter((task) => task !== taskName),
        },
      };
    }
    default:
      return state;
  }
}

function runPractice() {
  console.log("Action-driven task board reducer simulation\n");

  const actions = [
    { type: "ADD_TASK", payload: { column: "todo", taskName: "Task C" } },
    {
      type: "MOVE_TASK",
      payload: { from: "todo", to: "inProgress", taskName: "Task A" },
    },
    {
      type: "MOVE_TASK",
      payload: { from: "inProgress", to: "done", taskName: "Task A" },
    },
    { type: "REMOVE_TASK", payload: { column: "todo", taskName: "Task B" } },
  ];

  let state = boardInitialState;

  console.log("Initial board state:");
  console.log(JSON.stringify(state, null, 2));
  console.log("");

  for (const action of actions) {
    state = boardReducer(state, action);
    console.log(`After action: ${action.type}`);
    console.log(JSON.stringify(state, null, 2));
    console.log("");
  }
}

runPractice();
