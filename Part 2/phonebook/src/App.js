import React, { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import AddingForm from "./components/AddingForm";
import RenderAll from "./components/RenderAll";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "84301298341204" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const handleAdd = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  };

  const handleFilter = (event) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilter(filteredPersons);
  };

  console.log(filter);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newPerson.name, number: newPerson.number };
    if (personObject.name !== "" && personObject.number !== "") {
      const checkDuplicate = persons.find(
        (person) =>
          person.name === newPerson.name || person.number === newPerson.number
      );
      if (checkDuplicate) {
        window.confirm(`${newPerson.name} is already added to phonebook`);
      } else {
        if (isNaN(newPerson.number)) {
          window.confirm("Please import number in number section");
        } else {
          setPersons(persons.concat(personObject));
          setNewPerson({ name: "", number: "" });
        }
      }
    } else {
      window.confirm("Please add a new person");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter inputValue={filter.name} handleFilter={handleFilter} />
      <AddingForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <RenderAll filter={filter} persons={persons} />
    </div>
  );
};

export default App;
