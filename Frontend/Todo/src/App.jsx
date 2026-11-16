import { useSelector } from 'react-redux';
import Counter from './Counter'
import Header from './Header'
import Login from './Login';
import Todo from './Todo'


function App() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {isAuth && <Header />}
      {!isAuth && <Login />}
      {isAuth && <Counter />}
    </>
  );
}

export default App
