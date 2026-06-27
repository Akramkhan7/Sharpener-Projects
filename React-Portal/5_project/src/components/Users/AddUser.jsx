import React, { useState } from "react";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [showPop, setShowPop] = useState(false);

  const userNameHandle = (e) => {
    setUsername(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const popUpMsg = () =>{
    setShowPop(false);
  }

  const addUserHandler = (e) => {
  e.preventDefault();

  const data = {
    username: username,
    age: age,
  };

  if (username.length === 0 || age.length === 0 || data.age < 0) {
    setShowPop(true);
    return;
  }

  setUsers((prev) => {
    return [data, ...prev];
  });

  setAge("");
  setUsername("");
};

  return (
   <div>
  {showPop ? (
   <div onClick={popUpMsg}>
      <div>Invalid Input</div>
      <p>Please enter valid name and age (non-empty values)</p>
      <button onClick={popUpMsg}>Okay</button>
    </div>
  ) : (
    <div>
      <form onSubmit={addUserHandler}>
        <label>Username</label>
        <input type="text" value={username} onChange={userNameHandle} />

        <label>Age</label>
        <input type="text" value={age} onChange={ageHandler} />

        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map((user, index) => (
          <h3 key={index}>
            {user.username} ({user.age} years old)
          </h3>
        ))}
      </div>
    </div>
  )}
</div>
  );
};

export default AddUser;
