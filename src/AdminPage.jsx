import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://backend-1-4ee8.onrender.com/get-users");
        setUsers(response.data); 
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users. Please try again later.");
        setUsers([]); 
      }
    };

    fetchUsers(); 
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>MBTI Result</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.result}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found or unable to fetch data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
