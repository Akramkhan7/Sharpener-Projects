import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

function createFakeStore() {
  return {
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => () => {},
  };
}

function AllProviders({ children }) {
  const store = createFakeStore();
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
}

function customRender(ui, options) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// re-export everything from RTL
export * from "@testing-library/react";
// override render with our custom, provider-wrapped version
export { customRender as render };