import Hero from "../Layout/Hero";
import { Button, Container, Row, Col } from "react-bootstrap";

function Home() {
  const tours = [
    {
      id: 1,
      date: "JUL 16",
      city: "DETROIT, MI",
      venue: "DTE ENERGY MUSIC THEATRE",
    },
    {
      id: 2,
      date: "JUL 19",
      city: "TORONTO, ON",
      venue: "BUDWEISER STAGE",
    },
    {
      id: 3,
      date: "JUL 22",
      city: "BRISTOW, VA",
      venue: "JIGGY LUBE LIVE",
    },
    {
      id: 4,
      date: "JUL 29",
      city: "PHOENIX, AZ",
      venue: "AK-CHIN PAVILION",
    },
    {
      id: 5,
      date: "AUG 2",
      city: "LAS VEGAS, NV",
      venue: "T-MOBILE ARENA",
    },
    {
      id: 6,
      date: "AUG 7",
      city: "CONCORD, CA",
      venue: "CONCORD PAVILION",
    },
  ];

  async function getMovies() {
    const res = await fetch("https://swapi.info/api/films");
    const x = await res.json();;
    console.log(x);
  }

  getMovies();
  return (
    <>
      <Hero />

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">TOURS</h2>

        {tours.map((tour) => (
          <Row
            key={tour.id}
            className="align-items-center border-bottom py-3"
          >
            <Col md={2} className="fw-bold">
              {tour.date}
            </Col>

            <Col md={3} className="text-secondary">
              {tour.city}
            </Col>

            <Col md={5} className="text-secondary">
              {tour.venue}
            </Col>

            <Col md={2} className="text-end">
              <Button
                variant="info"
                className="text-white fw-bold px-4"
              >
                BUY TICKETS
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Home;