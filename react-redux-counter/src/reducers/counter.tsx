interface Action {
    type: string;
}

const counter = (state = 0, action: Action) => {
  switch (action.type) {
    case "INCREAMENT":
      return state + 1;
    case "DECREAMENT":
      return state - 1;
    default:
      return state;
  }
};

export default counter;