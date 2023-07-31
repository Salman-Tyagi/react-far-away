import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function addItems(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItemHandler(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleCheckboxHandler(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearListHandler() {
    setItems([]);
  }

  return (
    <div className="app ">
      <Logo />
      <Form onAddItems={addItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItemHandler}
        onToggleCheckbox={toggleCheckboxHandler}
        onClearList={clearListHandler}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛄</h1>;
}

function Form({ onAddItems }) {
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

  const descriptionChangeHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const dropDownChangeHandler = (e) => {
    e.preventDefault();
    setQuantity(e.target.value * 1);
  };

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

function PackingList({ items, onDeleteItem, onToggleCheckbox, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed * 1 - b.packed * 1);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteItem={onDeleteItem}
            toggleCheckBox={onToggleCheckbox}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input items</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed items</option>
        </select>
        <button onClick={onClearList}>Clear</button>
      </div>
    </div>
  );
}

function Item({ item, deleteItem, toggleCheckBox }) {
  return (
    <li style={item.packed ? { textDecoration: "line-through" } : {}}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggleCheckBox(item.id)}
      />
      <span>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everthing! Ready to go ⭐"
          : `You have ${numItems} items in your list, and you already packed
        ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
