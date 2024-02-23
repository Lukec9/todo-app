import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

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
    <div>
      {userData ? (
        <div>
          <h2>User Dashboard</h2>
          <div>
            <h3>Username: {state.user.username}</h3>
            <p>Email: {state.user.email}</p>
          </div>
          <div>
            <h3>Todos:</h3>
            <ul>
              {userData.map(todo => (
                <li key={todo._id}>
                  <strong>{todo.title}</strong> - {todo.description}
                  <br />
                  <NavLink to={`/todos/${todo._id}`}>Go to todo</NavLink>
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
