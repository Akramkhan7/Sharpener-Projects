import React, { useState } from "react";

function Form(props) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");

  const addMovieHandlerFun = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      director: director,
    };
    props.onSubmit(data);
  };

  return (
    <form
      onSubmit={addMovieHandlerFun}
      className="border rounded p-4 shadow mx-auto mt-5"
      style={{ maxWidth: "500px" }}
    >
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Director</label>
        <textarea
          className="form-control"
          rows="3"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Movie
      </button>
    </form>
  );
}

export default Form;
