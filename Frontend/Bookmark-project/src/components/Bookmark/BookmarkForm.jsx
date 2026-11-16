import React, { useContext, useEffect, useState } from "react";
import BookmarkContext from "../Store/BookmarkContext";
import { GoogleGenAI } from "@google/genai";
import './Bookmark.css';


function BookmarkForm(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const bookCtx = useContext(BookmarkContext);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const generateCategoryHandler = async () => {
    if (!title || !url) {
      alert("Enter title and URL first.");
      return;
    }
    try {
      const prompt = `
Categorize this website into ONLY ONE category.

Title: ${title}

URL: ${url}

Possible categories:
AI
Shopping
Education
Entertainment
Coding
Finance
Health
News
Productivity
Social Media

Return ONLY the category name.
`;

      const response = await ai.models.generateContent({
       model: "gemini-2.5-flash-lite",

        contents: prompt,
      });

      setCategory(response.text.trim());
    } catch (err) {
        console.log(err);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || url.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const bookmark = {
      title,
      url,
      category,
    };

    try {
      if (bookCtx.editBookmark) {
        // UPDATE
        const res = await fetch(
          `https://crudcrud.com/api/8d63184bc26141db8309d3be30fffe07/bookmarks/${bookCtx.editBookmark._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookmark),
          },
        );

        if (!res.ok) {
          throw new Error("Failed to update bookmark");
        }

        bookCtx.updateBookmark({
          ...bookCtx.editBookmark,
          title,
          url,
        });
      } else {
        // ADD
        const res = await fetch(
          "https://crudcrud.com/api/8d63184bc26141db8309d3be30fffe07/bookmarks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookmark),
          },
        );

        const data = await res.json();

        bookCtx.addBookmark(data);
      }

      // Clear form and close modal
      setTitle("");
      setUrl("");

      bookCtx.setEditBookmark(null);
      bookCtx.setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bookCtx.editBookmark) {
      setTitle(bookCtx.editBookmark.title);
      setUrl(bookCtx.editBookmark.url);
    } else {
      setTitle("");
      setUrl("");
    }
  }, [bookCtx.editBookmark]);

  return (
    <form className="bookmark-form" onSubmit={onSubmitHandler}>
      <h2>{bookCtx.editBookmark ? "Update bookmark" : "Add website"}</h2>

      <label htmlFor="title">Title :</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="url">Url :</label>
      <input
        id="url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          readOnly
          placeholder="AI will generate category"
        />
      </div>

      <div className="form-buttons">
        <button className="submit-btn" type="submit">
          {bookCtx.editBookmark ? "Update" : "Add"}
        </button>
        <button className="close-btn" type="button" onClick={props.onClose}>
          Close
        </button>
        <button className="submit-btn" type="button" onClick={generateCategoryHandler}>
          Generate Category
        </button>
      </div>
    </form>
  );
}

export default BookmarkForm;
