import { useDispatch } from "react-redux";
import { authActions } from "./store";

const Login = () => {

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(authActions.login());
  };

  return (
    <main className="login">
      <section>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="control">
            <label>Password</label>
            <input type="password" />
          </div>

          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Login;