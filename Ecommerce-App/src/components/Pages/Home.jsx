import { useState, useEffect, useRef, useCallback } from "react";
import Hero from "../Layout/Hero";
import { Container, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Form from "../Layout/Form";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [retry, setRetry] = useState(true);
  const [error, setError] = useState("");
  const timerRef = useRef();

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://ecommerce-http-f19-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
     await response.json();
   fetchMovies();
  };

  const deleteMovieHandler = async (id) =>{
    const res  = await fetch(`https://ecommerce-http-f19-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method : "DELETE",
    })
   
    setMovies((prevMovies)=>
      prevMovies.filter((movie)=> movie.id !== id)
    )
  }
  
 const fetchMovies = useCallback(async () => {
  setIsLoading(true);

  try {
    const response = await fetch(
      "https://ecommerce-http-f19-default-rtdb.firebaseio.com/movies.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong... Retrying");
    }

    const data = await response.json();

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        director: data[key].director,
      });
    }

    setMovies(loadedMovies);
    setError("");
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (retry && error) {
      const timer = setTimeout(() => {
        fetchMovies();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, retry]);

  return (
    <>
      <Form onSubmit={addMovieHandler} />

      <Container className="py-5">
        <h2 className="text-center mb-5">Movies</h2>

        {isLoading && (
          <div className="w-full h-full text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <>
            <h4>Error{error}</h4>
            <Button
              variant="danger"
              onClick={() => {
                setRetry(false);
                setError("Retry cancelled.");
              }}
            >
              Cancel Retry
            </Button>
          </>
        )}

        {!isLoading &&
  movies.map((movie) => (
    <div
      key={movie.id}
      className="border rounded p-3 mb-3 shadow-sm bg-light"
    >
      <h4 className="mb-2">{movie.title}</h4>

      <p className="mb-3">
        <strong>Director:</strong> {movie.director}
      </p>

      <div className="d-flex gap-2">
        <Button variant="primary">
          BUY TICKETS
        </Button>

        <Button
          variant="danger"
          onClick={() => deleteMovieHandler(movie.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  ))}
      </Container>
    </>
  );
}

export default Home;
