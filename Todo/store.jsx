import { createStore } from "redux";

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1,
      };

    case "DECREMENT":
      return {
        counter: state.counter - 1,
      };

    case "INCREMENTBY5":
      return {
        counter: state.counter + 5,
      };

    case "DECREMENTBY5":
      return {
        counter: state.counter - 5,
      };

    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;