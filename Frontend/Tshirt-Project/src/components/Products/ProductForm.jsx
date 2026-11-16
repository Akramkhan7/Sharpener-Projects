import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import classes from "./Products.module.css";
import { GoogleGenAI } from "@google/genai";

function ProductForm({ setProducts }) {
  const [tshirtName, setTshirtName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [largeQty, setLargeQty] = useState("");
  const [mediumQty, setMediumQty] = useState("");
  const [smallQty, setSmallQty] = useState("");

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    if (!tshirtName.trim() || !price) {
      setSuggestion("Please enter a product name and price first.");
      return;
    }

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

    if (!apiKey) {
      setSuggestion("AI is not configured. Add REACT_APP_GEMINI_API_KEY to your .env file and restart the app.");
      return;
    }

    setLoading(true);
    setSuggestion("");

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
    Product Name: ${tshirtName}
    Current Price: ₹${price}

    Suggest whether this is a good selling price.
    If not, recommend a better price in 2-3 lines.
    `;

      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setSuggestion(res.text || "No suggestion returned.");
    } catch (error) {
      console.error(error);

      const message =
        error?.status === 429 || /quota|rate limit/i.test(error?.message || "")
          ? "Google AI quota has been exceeded for this key. Please try again later or use a different API key."
          : "Unable to generate suggestion right now.";

      setSuggestion(message);
    } finally {
      setLoading(false);
    }
  };

  const cartCtx = useContext(CartContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: Math.random(),
      tshirtName,
      description,
      price,
      largeQty,
      mediumQty,
      smallQty,
    };

    cartCtx.addProduct(data);

    setTshirtName("");
    setDescription("");
    setPrice("");
    setLargeQty("");
    setMediumQty("");
    setSmallQty("");
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes["product-form"]}>
      <label>T-Shirt Name</label>
      <input
        type="text"
        value={tshirtName}
        onChange={(e) => setTshirtName(e.target.value)}
        placeholder="Enter T-Shirt Name"
      />

      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
      />

      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
      />

      <label>Large</label>
      <input
        type="number"
        value={largeQty}
        onChange={(e) => setLargeQty(e.target.value)}
        placeholder="Large Quantity"
      />

      <label>Medium</label>
      <input
        type="number"
        value={mediumQty}
        onChange={(e) => setMediumQty(e.target.value)}
        placeholder="Medium Quantity"
      />

      <label>Small</label>
      <input
        type="number"
        value={smallQty}
        onChange={(e) => setSmallQty(e.target.value)}
        placeholder="Small Quantity"
      />

      <button type="submit">Add Product</button>
      <button type="button" onClick={getSuggestion}>
        Get AI Suggestion
      </button>

      {loading && <p>Generating suggestion...</p>}

      {suggestion && (
        <div>
          <h3>AI Suggestion</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </form>
  );
}

export default ProductForm;
