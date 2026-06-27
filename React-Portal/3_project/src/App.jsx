import React from "react";
import useFetch from "./hooks/useFetch";

const App = () => {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=10");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
