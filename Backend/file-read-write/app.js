
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  if (req.url === "/" && req.method === "GET") {

    res.setHeader("Content-Type", "text/html");

    res.end(`
      <input type="text" id="username" placeholder="Enter your name" />
      <button onclick="addName()">Add</button>

      <h3 id="result"></h3>

      <script>
        function addName() {
          const name = document.getElementById("username").value;

          fetch("/submit", {
            method: "POST",
            body: name
          })
          .then(res => res.text())
          .then(data => {
            document.getElementById("result").innerText = data;
          });
        }
      </script>
    `);

  }

  else if (req.url === "/submit" && req.method === "POST") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      fs.writeFile("formData.txt", body, (err) => {
        if (err) {
          res.statusCode = 500;
          return res.end("Error saving name");
        }

        res.end("Saved Name: " + body);
      });

    });

  }

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
