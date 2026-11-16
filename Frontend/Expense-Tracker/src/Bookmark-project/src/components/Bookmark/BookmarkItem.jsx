import React, { useContext } from "react";
import BookmarkContext from "../Store/BookmarkContext";
import './Bookmark.css';


function BookmarkItem({ bookmark }) {
  const bookCtx = useContext(BookmarkContext);



  const deleteHandler = async () => {
    console.log(bookmark);
    try {
      const res = await fetch(
        `https://crudcrud.com/api/8d63184bc26141db8309d3be30fffe07/bookmarks/${bookmark._id}`,
        {
          method: "DELETE",
        },
      );

    
      bookCtx.deleteBookmark(bookmark._id);
    } catch (err) {
      console.log(err);
    }
  };


  const editHandler = async () =>{
    bookCtx.setEditBookmark(bookmark);
  bookCtx.setShowModal(true);
  }

  return (
    <div className="bookmark-card">
      <h3>{bookmark.title}</h3>
      <p className="category">{bookmark.category || "Uncategorized"}</p>

      <a href={bookmark.url} target="_blank" rel="noreferrer">
        {bookmark.url}
      </a>

      <div className="card-buttons">
        <button className="edit-btn" onClick={editHandler}>
          Edit
        </button>
        <button className="delete-btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookmarkItem;
