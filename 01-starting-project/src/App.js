import Cart from "./components/Cart/Cart";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <>
      <Header />
      <Cart />
      <main>
        <Meals />
        <Cart />
      </main>
    </>
  );
}

export default App;
