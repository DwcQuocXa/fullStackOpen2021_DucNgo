import React from "react";

function AddingForm({ addPerson, newPerson, handleAdd }) {
  return (
    <form onSubmit={addPerson}>
      <h2>add a new</h2>
      <div>
        name: <input value={newPerson.name} name="name" onChange={handleAdd} />
      </div>
      <div>
        number:
        <input value={newPerson.number} name="number" onChange={handleAdd} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default AddingForm;
