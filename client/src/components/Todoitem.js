import "./todoitem2.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/fontawesome-free-solid";

const Todoitem = (props) => {
  const [editing, setEditing] = useState(false); // Track edit state
  const [editText, setEditText] = useState(props.todo.task);
  const [completed, setCompleted] = useState(props.todo.completed);

  // Handle edit click
  const handleEditClick = () => {
    setEditing(true);
  };

  // Handle save after editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: editText }),
      });
      setEditing(false); // Exit edit mode after save
      props.onFormSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle checking the checkbox (toggle complete state)
  const handleCheck = async () => {
    try {
      await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      setCompleted(!completed);
      props.onFormSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting the item
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.onFormSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      {!editing && ( // Only show checkbox if not editing
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheck}
          className="todo-checkbox"
        />
      )}
      {editing ? (
        <form className="todo-edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="todo-edit-input styled-input"
          />
          <button className="todo-edit-btn gradient-btn" type="submit">
            +
          </button>
        </form>
      ) : (
        <>
          <span className="todo-text">{props.todo.task}</span>
          <div className="todo-actions">
            <button className="action-btn" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="action-btn" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todoitem;
