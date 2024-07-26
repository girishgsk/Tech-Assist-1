import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="card text-center">
        <div className="card-header">
          <h3>User Data</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            Company :- <strong>{user.company}</strong>
          </p>
          <p className="card-text">
            Email :- <strong>{user.email}</strong>
          </p>
        </div>
        <div className="card-footer text-body-secondary">Tech-Assist</div>
      </div>
    </div>
  );
};

export default Profile;
