/*App.js is responsible for making a fetch to the api to store the tasks to local storage and subsequently
pass them as props to the necessary components. Any fetch made to get the items utilises the local storage
GWT such that the middleware can unpack the payload and compute accordingly
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Todoitem from "./components/Todoitem";
import Todoform from "./components/Todoform";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [todos, setTodos] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:8080/todos/getTasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTodos(data);
      setFormSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const isLoginOrRegisterPage =
      window.location.pathname.includes("login") ||
      window.location.pathname.includes("register");
    if (!isLoginOrRegisterPage) {
      fetchTodos();
    }
  }, [formSubmitted]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <>
              <div className="form-title-wrapper">
                <h2 className="form-title">TASK MANAGER</h2>
                <p className="form-instructions">Get shit done 💪</p>
              </div>
              <Todoform onFormSubmit={handleFormSubmit} />
              {todos.map((todo) => (
                <Todoitem
                  key={todo._id}
                  todo={todo}
                  onFormSubmit={handleFormSubmit}
                />
              ))}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
