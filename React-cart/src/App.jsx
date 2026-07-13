import Header from "./Header";
import Cart from "./Cart";
import Product from "./Product";

function App() {
  return (
    <div className="min-h-screen bg-zinc-800">
      <Header />

      <main className="max-w-5xl mx-auto py-10">
        <Cart />

        <h2 className="text-center text-3xl font-bold text-white mt-14 mb-10 uppercase">
          Buy Your Favorite Products
        </h2>

        <div className="space-y-8">
          <Product
            title="Test"
            price="$6.00"
            description="This is a first product - amazing!"
          />

          <Product
            title="Second Product"
            price="$12.00"
            description="This is another awesome product."
          />
        </div>
      </main>
    </div>
  );
}

export default App;