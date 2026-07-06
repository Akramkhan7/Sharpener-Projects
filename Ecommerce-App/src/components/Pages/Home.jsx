import { useState, useEffect } from "react";
import Hero from "../Layout/Hero";
import { Container, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://swapi.info/api/films");
      const data = await response.json();

      console.log(data);
      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Hero />

      <Container className="py-5">
        <h2 className="text-center mb-5">Movies</h2>

        {isLoading && (
          <div className="w-full h-full text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
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
