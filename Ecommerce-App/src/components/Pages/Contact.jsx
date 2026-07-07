import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const enteredData = {
      name,
      email,
      phone,
    };

    const addDataHandler = async () => {
      const res = await fetch(
        "https://ecommerce-http-f19-default-rtdb.firebaseio.com/data.json",
        {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data);
    };

    addDataHandler();

    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name=""
        id=""
      />

      <label htmlFor="">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name=""
        id=""
      />

      <label htmlFor="">Phn.No.</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        name=""
        id=""
      />

      <button type="onsubmit">Submit</button>
    </form>
  );
}

export default Contact;
