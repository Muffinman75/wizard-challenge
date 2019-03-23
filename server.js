const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

let server;

app.use("/", express.static("/client/public/index.html"));

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

function runServer() {
  const port = 8000;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

app.post("/user-form", jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = [
    "title",
    "name",
    "dateOfBirth",
    "location",
    "dateTime",
    "feedback"
  ];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Title: ${req.body.title}`);
    console.log(`Name: ${req.body.name}`);
    console.log(`Date Of Birth: ${req.body.dateOfBirth}`);
    console.log(`Location: ${req.body.location}`);
    console.log(`Date & Time: ${req.body.dateTime}`);
    console.log(`Feedback: ${req.body.feedback}`);
    return res.status(201).json(req.body);
  }
});

module.exports = { app, runServer, closeServer };
