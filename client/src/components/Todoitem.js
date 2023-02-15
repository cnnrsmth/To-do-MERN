/*Todoitem component is responsible for enabling the user to make changes to existing to do items, such 
as checking the box for completion, editing text content, and deleting a to-do item. It makes various
calls to different api's to enable these changes.*/

import "./todoitem.css";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faEdit } from '@fortawesome/fontawesome-free-solid'


const Todoitem = (props) => {
    
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(props.todo.task);
    const [completed, setCompleted] = useState(props.todo.completed);

    const handleEditClick = () => {
        setEditing(true);
    }

    //handle the editing operation. utilises the todo._id as a unique identifier for the route handler
    //to make subsequent edits to the database entry
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: editText }),
            });
            const data = await response.json();
            console.log(data);
            setEditing(false);
        } catch (error) {
            console.error(error);
        }
        props.onFormSubmit()
    };

    //handle the completion operation. toggles the complete property of the task document, which then changes
    //the UI for the associated todo item
    const handleCheck = async (e) => {
        try {
            const response = await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !completed }),
            });
            const data = await response.json();
            console.log(data);
            setCompleted(!completed);
        } catch (error) {
            console.error(error);
        }
    }

    //handle the delete operation. deletes the associated todo from the database
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/todos/${props.todo._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
            setEditing(false);
        } catch (error) {
            console.error(error);
        }
        props.onFormSubmit()
    };

    return(
        <div className={`todo todo-item completed-${completed}`}>
            <input
            type="checkbox"
            checked={completed}
            onChange={handleCheck}
            />
            {editing ? (
                <form className={`submit-form checked-${completed}`} onSubmit={handleEditSubmit}>
                    <input type="text" value={editText} onChange={e => setEditText(e.target.value)} />
                    <button className="btn save" type="submit">Save</button>
                </form>
            ) : (
                <>
                    <div className="btn-input">
                        <label className={`input-form completed-${completed}`}>{props.todo.task}</label>
                    </div>
                    <div className="todo-buttons">
                        <button className="btn" onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Todoitem;