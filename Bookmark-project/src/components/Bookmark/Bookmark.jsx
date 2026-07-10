import React, { useContext } from "react";
import BookmarkForm from "./BookmarkForm";
import Modal from "../Modal/Modal";
import BookmarkList from "./BookmarkList";
import BookmarkContext from "../Store/BookmarkContext";
import './Bookmark.css';

function Bookmark() {
  const bookCtx = useContext(BookmarkContext);

  const openModalHandler = () => {
    bookCtx.setEditBookmark(null); 
    bookCtx.setShowModal(true);
  };

  const closeModalHandler = () => {
    bookCtx.setShowModal(false);
    bookCtx.setEditBookmark(null);
  };

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h1>Bookmark Website</h1>
        <button className="add-btn" onClick={openModalHandler}>
          Add New
        </button>
      </div>

      {bookCtx.showModal && (
        <Modal onClose={closeModalHandler}>
          <BookmarkForm onClose={closeModalHandler} />
        </Modal>
      )}

      <div className="bookmark-list">
        <BookmarkList />
      </div>
    </div>
  );
}

export default Bookmark;