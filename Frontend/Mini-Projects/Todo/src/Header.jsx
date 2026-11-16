import { authActions } from "./store";
import { useDispatch } from "react-redux";

const Header = () => {
const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className="header">
      <h2>Redux Auth</h2>

      <nav>
        <ul>
          <li>
            <button className="nav-btn">My Profile</button>
          </li>
          <li>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;