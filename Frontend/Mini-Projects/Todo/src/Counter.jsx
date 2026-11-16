import { useDispatch, useSelector } from "react-redux";
import { authActions, counterActions } from "./store";


const Counter = () => {
const dispatch = useDispatch();


const counter = useSelector((state) => state.counter.counter);
const showCounter = useSelector((state) => state.counter.showCounter)


  
  return (
    <main className="counter">
      <h1>Redux Counter</h1>

  {showCounter && <div className="value">{counter}</div>}

      <div>
        <button onClick={()=>dispatch(counterActions.increment())}>
          Increment
        </button>

        <button onClick={()=>dispatch(counterActions.decrement())}>
          Decrement
        </button>

        <button onClick={()=>dispatch(counterActions.toggleCounter())}>
          Toggle Counter
        </button>
      </div>

      <button className="logout" >
        Logout
      </button>
    </main>
  );
};

export default Counter;