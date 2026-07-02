import React from "react";

function Form() {
  return (
    <section>
      <form className="form">
        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default Form;