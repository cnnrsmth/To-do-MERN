/*Todoform component is responsible for setting new to do's which are subsequently loaded up on the page.
It makes a call to an api which stores the tasks in a database. Middleware is used to validate the type
of content, number of chars, and email domain of the user entering the todo item. The user can be associated
with the to-do entry via the use of middelware, and joining the noSQL collections*/

import React, { useState } from 'react';

const Todoform = (props) => {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    
    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/todos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ task: newTodo }),
            });
            if (!response.ok) {
                const error = await response.json();
                if (response.status === 400) {
                    alert('Invalid content type')
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
        } catch(error) {
            console.log(error);
        }
        props.onFormSubmit();
    };

    return(
        <form className="App-form" onSubmit={handleAddTodo}>
            <input 
                type="text" 
                value={newTodo}
                placeholder="Type to-do here..." 
                onChange={(e) => setNewTodo(e.target.value)}
                className="app-form-input"
            />
            <button type="submit">+</button>
        </form>
    )
}

export default Todoform;