import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
