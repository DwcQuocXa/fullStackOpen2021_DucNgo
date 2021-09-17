const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/person");
const { count } = require("./models/person");

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

app.get("/info", (request, response) => {
  const date = new Date();
  Person.find()
    .estimatedDocumentCount()
    .then((count) =>
      response
        .status(200)
        .send(
          `<div><p>Phone book has infor for ${count} people </p><p>${date}</p></div>`
        )
    );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  // const newId =
  //   persons.length > 0 ? Math.floor(Math.random() * 10000000 + 4) : 0;
  // return newId;
  Person.estimatedDocumentCount().then((count) => {
    if (count) {
      const newId = Math.floor(Math.random() * 10000000 + 4);
      return newId;
    } else {
      const newId = 0;
      return newId;
    }
  });
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  newPerson
    .save()
    .then((savePerson) => savePerson.toJSON())
    .then((formattedPerson) => response.json(formattedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    returnOriginal: false,
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
