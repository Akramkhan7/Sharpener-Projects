import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrementHandler = () => {
    dispatch({ type: "DECREMENT" });
  };

  const incrementBy5Handler = () => {
    dispatch({ type: "INCREMENTBY5" });
  };

  const decrementBy5Handler = () => {
    dispatch({ type: "DECREMENTBY5" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Redux Counter</h1>

      <h2>{counter}</h2>

      <button onClick={incrementHandler}>Increment</button>

      <button onClick={decrementHandler}>Decrement</button>

      <br />
      <br />

      <button onClick={incrementBy5Handler}>IncrementBy5</button>

      <button onClick={decrementBy5Handler}>DecrementBy5</button>
    </div>
  );
}

export default Counter;