const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request made");

  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/") {
    res.statusCode = 200;
     res.end("Hello world");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("Hello About");
  } else if (req.url === "/node") {
    res.statusCode = 200;
    res.end("Hello Node");
  } else {
    if (req.url === "/home") {
      res.statusCode = 200;
      res.end("Hello Home");
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  }
});

let port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
