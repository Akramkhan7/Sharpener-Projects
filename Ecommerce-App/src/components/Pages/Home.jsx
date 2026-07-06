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

  const addMovieHandler = (movie) => {
    console.log(movie);
  };
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://swapi.info/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }

      const data = await response.json();

      setMovies(data);
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
              key={movie.episode_id}
              className="border rounded p-4 mb-3 shadow-sm"
            >
              <h4>{movie.title}</h4>

              <p>
                <strong>Director:</strong> {movie.director}
              </p>

              <Button variant="info" className="text-white fw-bold">
                BUY TICKETS
              </Button>
            </div>
          ))}
      </Container>
    </>
  );
}

export default Home;
