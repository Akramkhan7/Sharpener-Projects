import React, { useEffect, useState } from "react";
import BookmarkContext from "./BookmarkContext";

function BookmarkProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const [editBookmark, setEditBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  useEffect(() => {
    const fetchBookMark = async () => {
      try {
        const res = await fetch(
          "https://crudcrud.com/api/8d63184bc26141db8309d3be30fffe07/bookmarks",
        );

        const data = await res.json();
        console.log(data);
        setBookmarks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookMark();
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmarkHandler = (bookmark) => {
    setBookmarks((prev) => {
      return [...prev, bookmark];
    });
  };

  const deleteBookmarkHandler = (id) => {
    const filteredBookmarks = bookmarks.filter((bookmark) => bookmark._id !== id);
    setBookmarks(filteredBookmarks);
  };
  const updateBookmarkHandler = (updatedBookmark) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark._id === updatedBookmark._id ? updatedBookmark : bookmark,
      ),
    );
  };

  const value = {
    bookmarks,
    addBookmark: addBookmarkHandler,
    deleteBookmark: deleteBookmarkHandler,
    updateBookmark: updateBookmarkHandler,
    editBookmark,
    setEditBookmark,

    showModal,
    setShowModal,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {props.children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;
