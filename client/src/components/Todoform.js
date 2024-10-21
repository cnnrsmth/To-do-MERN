import React, { useState } from "react";
import "./Todoform.css"; // Import the dedicated CSS for Todoform

const TodoForm = (props) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ task: newTodo }),
      });
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 400) {
          alert("Invalid content type");
        } else if (response.status === 422) {
          alert(error.error);
        } else if (response.status === 403) {
          alert(error.error);
        }
        return;
      }
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
    props.onFormSubmit();
  };

  return (
    <form className="todoform-wrapper" onSubmit={handleAddTodo}>
      <div className="todoform-input-flex">
        <input
          type="text"
          value={newTodo}
          placeholder="Type to-do here..."
          onChange={(e) => setNewTodo(e.target.value)}
          className="formbold-form-input" // Use the input class for consistent styling
        />
        <button type="submit" className="todoform-btn">
          +
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
