import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddingForm from "./components/AddingForm";
import RenderAll from "./components/RenderAll";
import dataFunction from "./services/dataFunction";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const timer = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {
    dataFunction.getAll().then((initialPerson) => setPersons(initialPerson));
  }, []);

  const handleAdd = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  };

  const handleFilter = (event) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilter(filteredPersons);
  };

  const handleDelete = (id) => {
    const deletePerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      dataFunction
        .deleteData(id)
        .then(
          () => setPersons(persons.filter((person) => person.id !== id)),
          setMessage(`Information of ${deletePerson.name} has been deleted`),
          setMessageType("noti"),
          timer()
        )
        .catch(() => {
          setMessage(
            `Information of ${deletePerson.name} has already been removed from server`
          );
          timer();
          setMessageType("error");
        });
    }
  };

  const handleReplace = (duplicatedPerson, newPersonObject) => {
    if (
      window.confirm(
        `${newPersonObject.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      dataFunction
        .update(duplicatedPerson.id, newPersonObject)
        .then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id !== duplicatedPerson.id ? person : returnedPerson
            )
          )
        );
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newPerson.name, number: newPerson.number };
    if (personObject.name !== "" && personObject.number !== "") {
      const duplicatedPerson = persons.filter(
        (person) => person.name === newPerson.name
      );
      if (duplicatedPerson.length > 0) {
        handleReplace(duplicatedPerson[0], personObject);
        setMessage(`${personObject.name}'s number has changed`);
        timer();
        setMessageType("noti");
      } else {
        if (isNaN(newPerson.number)) {
          setMessage("Please import number in number section");
          timer();
          setMessageType("noti");
        } else {
          if (personObject.name.length < 3) {
            setMessage(
              `Person validation failed: name: Path name (${personObject.name}) is shorter than the minimum allowed length (3).`
            );
            timer();
            setMessageType("error");
          } else if (personObject.number.length < 3) {
            setMessage(
              `Person validation failed: number: Path number (${personObject.number}) is shorter than the minimum allowed length (8).`
            );
            timer();
            setMessageType("error");
          } else {
            dataFunction
              .create(personObject)
              .then(
                (returnedPerson) => setPersons(persons.concat(returnedPerson)),
                setMessage(`Added ${personObject.name}`),
                timer(),
                setNewPerson({ name: "", number: "" }),
                setMessageType("noti")
              )
              .catch((error) => {
                console.log(error.response.data.error.message);
                setMessage(`Something went wrong`);
                timer();
                setMessageType("error");
              });
          }
        }
      }
    } else {
      timer();
      setMessage("Please add a new person");
      setMessageType("noti");
    }
  };

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      <h2>Phonebook</h2>
      <SearchFilter inputValue={filter.name} handleFilter={handleFilter} />
      <AddingForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <RenderAll
        filter={filter}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
