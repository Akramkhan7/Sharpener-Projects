import React from "react";
import { useState } from "react";
import List from "../List/List";
import { GoogleGenAI } from "@google/genai";

function Form() {
  const [data, setData] = useState([]);
  const [vegName, setVegName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [buyValues, setBuyValues] = useState({});

  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
const [listening, setListening] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleAISubmit = async (e) => {
    e.preventDefault();
    const text = aiInput;
    if (!text) return;
    setLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const prompt = `
    You are an expense extraction assistant.
    Extract details in JSON format from the text: "${text}".
    Include:
    - title (short name of expense)
    - amount (in number)
    - category (like Food, Travel, etc.)
    - description (short summary)
    - date (use current date: ${today})
    `;
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log(res);

      const responseText = res.text;

      const cleanedText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleanedText);

      const newExpense = {
        title: data.title || "Unknown",
        category: data.category || "General",
        description: data.description || "No description",
        amount: data.amount || 0,
        date: data.date || today,
      };

      setExpenses((prev) => [...prev, newExpense]);

      console.log("Parsed object:", data); // JS object you can use

      setAiInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 const voiceInput = () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => setListening(true);

  recognition.onend = () => setListening(false);

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setAiInput(transcript);
  };

  recognition.start();
};

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const temp = {
      id: Math.random(),
      vegName: vegName,
      price: price,
      quantity: quantity,
    };

    setData((prev) => {
      return [temp, ...prev];
    });
    setPrice("");
    setVegName("");
    setQuantity("");
  };

  const onDeleteHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const onBuyHandler = (id) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const buyQty = buyValues[id] || 0;

          if (buyQty > Number(item.quantity)) {
            return item;
          }

          return {
            ...item,
            quantity: Number(item.quantity) - buyQty,
          };
        }

        return item;
      }),
    );
  };

  const handleBuyInput = (id, value) => {
    setBuyValues((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  return (
    <div className="container">
      {/* AI Form  */}

      <form onSubmit={handleAISubmit}>
        <h2>Add Using AI</h2>

        <input
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="Example: Add 5kg potatoes for ₹200"
        />

        <div className="btn-group gap-2">
          <button type="button" onClick={voiceInput}>{listening ? "listening..." : "🎤 Speak"}</button>

          <button type="submit">
            {loading ? "Extracting..." : "Extract with AI"}
          </button>
        </div>
      </form>

      <List
        formData={data}
        onDelete={onDeleteHandler}
        onBuy={onBuyHandler}
        handleInput={handleBuyInput}
      />

      <hr />

      <h2>AI Extracted Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <div>
          {expenses.map((expense, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{expense.title}</h3>

              <p>
                <strong>Description:</strong> {expense.description}
              </p>

              <p>
                <strong>Category:</strong> {expense.category}
              </p>

              <p>
                <strong>Amount:</strong> ₹{expense.amount}
              </p>

              <p>
                <strong>Date:</strong> {expense.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Form;
