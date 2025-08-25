// ./User/community/IdeaDesc.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_IDEAS = "http://localhost:8080/admin/ideas";
const API_USERS = "http://localhost:8080/admin/users";

const IdeaDesc = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [username, setUsername] = useState("");
  const [votes, setVotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ideaVotes") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const [ideaRes, usersRes] = await Promise.all([
          axios.get(`${API_IDEAS}/${id}`),
          axios.get(API_USERS),
        ]);

        setIdea(ideaRes.data || null);

        // Map email -> username
        const user = (usersRes.data || []).find(
          (u) => u.email === ideaRes.data.useremail
        );
        setUsername(user?.username || user?.name || ideaRes.data.useremail);
      } catch (err) {
        console.error("Failed to fetch idea or user:", err);
      }
    };

    fetchIdea();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("ideaVotes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (type) => {
    if (!idea) return;

    const prevChoice = votes[idea.id] || null;
    let up = idea.upvote;
    let down = idea.downvote;

    if (type === "up") {
      if (prevChoice === "up") {
        up -= 1;
        setVotes((v) => ({ ...v, [idea.id]: null }));
      } else if (prevChoice === "down") {
        down -= 1;
        up += 1;
        setVotes((v) => ({ ...v, [idea.id]: "up" }));
      } else {
        up += 1;
        setVotes((v) => ({ ...v, [idea.id]: "up" }));
      }
    } else if (type === "down") {
      if (prevChoice === "down") {
        down -= 1;
        setVotes((v) => ({ ...v, [idea.id]: null }));
      } else if (prevChoice === "up") {
        up -= 1;
        down += 1;
        setVotes((v) => ({ ...v, [idea.id]: "down" }));
      } else {
        down += 1;
        setVotes((v) => ({ ...v, [idea.id]: "down" }));
      }
    }

    setIdea({ ...idea, upvote: up, downvote: down });
  };

  const handleShare = async () => {
    if (!idea) return;

    const url = `${window.location.origin}/community/ideas/${idea.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: idea.title,
          text: "Check out this idea!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
      setIdea((prev) => ({ ...prev, shares: prev.shares + 1 }));
    } catch (e) {
      console.warn("Share failed:", e);
    }
  };

  if (!idea) return <div>Loading...</div>;

  const voted = votes[idea.id] || null;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{idea.title}</h1>
      <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
        Posted by <strong>{username}</strong>
      </p>
      {idea.image && (
        <img
          src={idea.image}
          alt={idea.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        />
      )}
      <p style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
        {idea.description}
      </p>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          onClick={() => handleVote("up")}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "8px",
            background: voted === "up" ? "#0e1a36" : "#131722",
            color: "#fff",
            border: "1px solid #2a3144",
            cursor: "pointer",
          }}
        >
          ▲ {idea.upvote}
        </button>

        <button
          onClick={() => handleVote("down")}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "8px",
            background: voted === "down" ? "#2a0f14" : "#131722",
            color: "#fff",
            border: "1px solid #2a3144",
            cursor: "pointer",
          }}
        >
          ▼ {idea.downvote}
        </button>

        <button
          onClick={handleShare}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "8px",
            background: "#131722",
            color: "#fff",
            border: "1px solid #2a3144",
            cursor: "pointer",
          }}
        >
          Share {idea.shares}
        </button>
      </div>
    </div>
  );
};

export default IdeaDesc;
