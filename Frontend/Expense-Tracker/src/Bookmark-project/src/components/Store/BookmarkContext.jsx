import React from "react";

const BookmarkContext = React.createContext({
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: () => {},
  updateBookmark: () => {},
  editBookmark: null,
  setEditBookmark: () => {},
  showModal: false,
  setShowModal: () => {},
});

export default BookmarkContext;
