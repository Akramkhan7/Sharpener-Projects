import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "./ ExpenseForm"
import { expenseActions } from "../Store/Expense-slice";

// so we replace them with simple mocks we control.
const mockDispatch = vi.fn();
let editingExpense = null;

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn) => fn({ expenses: { editingExpense } }),
}));

beforeEach(() => {
  mockDispatch.mockClear();
  editingExpense = null;
  global.fetch = vi.fn();
});

describe("ExpenseForm", () => {
  test("renders the form fields and Add Expense button", () => {
    render(<ExpenseForm />);
    expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Expense" })).toBeInTheDocument();
  });

  test("shows Update Expense button and fills fields when editing", () => {
    editingExpense = { id: "1", amount: "200", description: "Coffee", category: "Food" };
    render(<ExpenseForm />);
    expect(screen.getByPlaceholderText("Enter amount")).toHaveValue(200);
    expect(screen.getByPlaceholderText("Enter description")).toHaveValue("Coffee");
    expect(screen.getByRole("button", { name: "Update Expense" })).toBeInTheDocument();
  });

  test("adding an expense calls fetch with POST and the right data", async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ name: "new-id" }),
    });

    render(<ExpenseForm />);
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.type(screen.getByPlaceholderText("Enter description"), "Lunch");
    await user.selectOptions(screen.getByRole("combobox"), "Food");
    await user.click(screen.getByRole("button", { name: "Add Expense" }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch.mock.calls[0][1].method).toBe("POST");
  });

  test("dispatches addExpense with the new id after a successful add", async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ name: "new-id" }),
    });

    render(<ExpenseForm />);
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.type(screen.getByPlaceholderText("Enter description"), "Lunch");
    await user.selectOptions(screen.getByRole("combobox"), "Food");
    await user.click(screen.getByRole("button", { name: "Add Expense" }));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expenseActions.addExpense({
          id: "new-id",
          amount: "500",
          description: "Lunch",
          category: "Food",
        }),
      ),
    );
  });

  test("shows Adding... and disables the button while the request is pending", async () => {
    const user = userEvent.setup();
    fetch.mockReturnValueOnce(new Promise(() => {})); // never resolves

    render(<ExpenseForm />);
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.type(screen.getByPlaceholderText("Enter description"), "Lunch");
    await user.selectOptions(screen.getByRole("combobox"), "Food");
    await user.click(screen.getByRole("button"));

    expect(await screen.findByText("Adding...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("does not dispatch anything if the add request fails", async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({ ok: false });

    render(<ExpenseForm />);
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.type(screen.getByPlaceholderText("Enter description"), "Lunch");
    await user.selectOptions(screen.getByRole("combobox"), "Food");
    await user.click(screen.getByRole("button", { name: "Add Expense" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Add Expense" })).toBeEnabled(),
    );
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("does not crash if fetch itself fails (network error)", async () => {
    const user = userEvent.setup();
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ExpenseForm />);
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.type(screen.getByPlaceholderText("Enter description"), "Lunch");
    await user.selectOptions(screen.getByRole("combobox"), "Food");
    await user.click(screen.getByRole("button", { name: "Add Expense" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Add Expense" })).toBeEnabled(),
    );
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("updating an expense calls fetch with PUT to that expense's id", async () => {
    editingExpense = { id: "abc123", amount: "100", description: "Old", category: "Food" };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    const user = userEvent.setup();
    render(<ExpenseForm />);
    await user.click(screen.getByRole("button", { name: "Update Expense" }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch.mock.calls[0][0]).toContain("/expense/abc123.json");
    expect(fetch.mock.calls[0][1].method).toBe("PUT");
  });

  test("clears the form after updating, even if the update fails", async () => {
    editingExpense = { id: "abc123", amount: "100", description: "Old", category: "Food" };
    fetch.mockResolvedValueOnce({ ok: false });

    const user = userEvent.setup();
    render(<ExpenseForm />);
    await user.click(screen.getByRole("button", { name: "Update Expense" }));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(expenseActions.cancelEdit()),
    );
    expect(screen.getByPlaceholderText("Enter description")).toHaveValue("");
  });

  test("changing the category select updates its value", async () => {
    const user = userEvent.setup();
    render(<ExpenseForm />);
    await user.selectOptions(screen.getByRole("combobox"), "Travel");
    expect(screen.getByRole("combobox")).toHaveValue("Travel");
  });
});