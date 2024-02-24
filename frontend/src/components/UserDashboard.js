import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "../axiosInstance";
import "../dashboard.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const { state } = useContext(AuthContext);
  const userID = state.user._id;

  useEffect(() => {
    const getUserTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userID}/todos`
        );
        // console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserTodos();
  }, [userID]);

  return (
    <div className="dashboard-container">
      {userData ? (
        <div>
          <h2 className="dashboard-heading">User Dashboard</h2>
          <div className="user-info">
            <h3 className="user-heading">Welcome, {state.user.username}!</h3>
            <p className="user-email">Email: {state.user.email}</p>
          </div>
          <div className="todo-list">
            <h3 className="todo-heading">Your Todos:</h3>
            <ul className="todo-items">
              {userData.map(todo => (
                <li key={todo._id} className="todo-item">
                  <strong className="todo-title">{todo.title}</strong> -{" "}
                  <span className="todo-description">{todo.description}</span>
                  <NavLink to={`/todos/${todo._id}`} className="todo-link">
                    Go to todo
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
