const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
let persons = require("./Persons");

app.use(express.json());
app.use(express.static("build"));

app.use(morgan("tiny"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.status(200).send("<h1>Hello World!!!!</h1>");
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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const personMatchesId = persons.find((person) => person.id === id);
  if (personMatchesId) {
    response.json(personMatchesId);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const newId =
    persons.length > 0 ? Math.floor(Math.random() * 10000000 + 4) : 0;
  return newId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const duplicatedName = persons.find((person) => person.name === body.name);
  if (duplicatedName) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = new persons({
    name: body.name,
    number: body.number,
    id: generateId(),
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
