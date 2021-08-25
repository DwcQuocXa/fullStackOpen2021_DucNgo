const { request, response } = require("express");
const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const PORT = process.env.PORT || 3001;

app.get("/", (request, response) => {
  response.send("<h1>Hello World!!!!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.status(200).send(`
  <div><p>Phone book has info for ${persons.length} people </p><p>${date}</p></div>
  `);
});

app.listen(PORT);
