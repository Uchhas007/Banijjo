import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [userIdeas, setUserIdeas] = useState([]);

  // Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all users (optional, only needed if you want full user info from backend)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/users");
        if (user) {
          const matchedUser = res.data.find((u) => u.email === user.email);
          if (matchedUser) setUser(matchedUser);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUserData();
  }, [user?.email]);

  // Fetch all ideas
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/ideas");
        setIdeas(res.data);
      } catch (err) {
        console.error("Error fetching ideas:", err);
      }
    };
    fetchIdeas();
  }, []);

  // Filter ideas for logged-in user
  useEffect(() => {
    if (user && ideas.length > 0) {
      const filtered = ideas.filter((idea) => idea.userEmail === user.email);
      setUserIdeas(filtered);
    }
  }, [user, ideas]);

  const handleEditProfile = () => {
    // redirect to edit profile page
    window.location.href = "/profile/edit";
  };

  const handleChangePassword = () => {
    window.location.href = "/profile/change-password";
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      // call delete API here
      console.log("Profile deleted!");
    }
  };

  const handleEditIdea = (ideaId) => {
    window.location.href = `/ideas/edit/${ideaId}`;
  };

  const handleDeleteIdea = (ideaId) => {
    if (window.confirm("Are you sure you want to delete this idea?")) {
      // call delete API here
      console.log("Idea deleted!", ideaId);
      // update UI
      setUserIdeas(userIdeas.filter((idea) => idea.id !== ideaId));
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="container my-5">
      <h2>User Profile</h2>
      <div className="card p-4 mb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="btn btn-warning" onClick={handleChangePassword}>
            Change Password
          </button>
          <button className="btn btn-danger" onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      </div>

      <h3>Your Ideas</h3>
      {userIdeas.length === 0 ? (
        <p>You have not posted any ideas yet.</p>
      ) : (
        <div className="list-group">
          {userIdeas.map((idea) => (
            <div
              key={idea.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>{idea.title}</div>
              <div className="dropdown">
                <button
                  className="btn btn-light btn-sm dropdown-toggle"
                  type="button"
                  id={`dropdown-${idea.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  &#x22EE;
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby={`dropdown-${idea.id}`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleEditIdea(idea.id)}
                    >
                      Edit Idea
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDeleteIdea(idea.id)}
                    >
                      Delete Idea
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
