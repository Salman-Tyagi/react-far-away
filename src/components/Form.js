import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function descriptionChangeHandler(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function dropDownChangeHandler(e) {
    e.preventDefault();
    setQuantity(e.target.value * 1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={dropDownChangeHandler}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={descriptionChangeHandler}
      ></input>
      <button>Add</button>
    </form>
  );
}
