import React, { useContext } from 'react'
import BookmarkContext from '../Store/BookmarkContext'
import BookmarkItem from './BookmarkItem'
import './Bookmark.css';


function BookmarkList() {
    const bookCtx = useContext(BookmarkContext);
    console.log(bookCtx.bookmarks);
  return (
    <>
      {bookCtx.bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark._id} bookmark={bookmark} />
      ))}
    </>
  );
}

export default BookmarkList
