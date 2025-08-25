import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_IDEAS = "http://localhost:8080/admin/ideas";
const API_USERS = "http://localhost:8080/admin/users";

const clampLines = 3; // lines to show in preview mode

const Idea = () => {
  const [ideas, setIdeas] = useState([]);
  const [usersByEmail, setUsersByEmail] = useState({});
  const [expanded, setExpanded] = useState({});
  const [votes, setVotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ideaVotes") || "{}");
    } catch {
      return {};
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ideasRes, usersRes] = await Promise.all([
          axios.get(API_IDEAS),
          axios.get(API_USERS),
        ]);

        // Map email -> username
        const map = {};
        (usersRes.data || []).forEach((u) => {
          if (u?.email) map[u.email] = u?.username || u?.name || u.email;
        });
        setUsersByEmail(map);

        // Normalize ideas
        const normalized = (ideasRes.data || []).map((i) => ({
          id: i.id,
          useremail: i.useremail,
          title: i.title || "Untitled Idea",
          description: i.description || "",
          image: i.image || null,
          upvote: Number.isFinite(i.upvote) ? i.upvote : 0,
          downvote: Number.isFinite(i.downvote) ? i.downvote : 0,
          shares: Number.isFinite(i.shares) ? i.shares : 0,
        }));
        setIdeas(normalized);
      } catch (e) {
        console.error("Failed to fetch ideas/users:", e);
      }
    };

    fetchAll();
  }, []);

  // Persist votes to localStorage
  useEffect(() => {
    localStorage.setItem("ideaVotes", JSON.stringify(votes));
  }, [votes]);

  const handleToggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleVote = (id, type) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== id) return idea;

        const prevChoice = votes[id] || null;
        let up = idea.upvote;
        let down = idea.downvote;

        if (type === "up") {
          if (prevChoice === "up") {
            up -= 1;
            setVotes((v) => ({ ...v, [id]: null }));
          } else if (prevChoice === "down") {
            down -= 1;
            up += 1;
            setVotes((v) => ({ ...v, [id]: "up" }));
          } else {
            up += 1;
            setVotes((v) => ({ ...v, [id]: "up" }));
          }
        } else if (type === "down") {
          if (prevChoice === "down") {
            down -= 1;
            setVotes((v) => ({ ...v, [id]: null }));
          } else if (prevChoice === "up") {
            up -= 1;
            down += 1;
            setVotes((v) => ({ ...v, [id]: "down" }));
          } else {
            down += 1;
            setVotes((v) => ({ ...v, [id]: "down" }));
          }
        }

        return { ...idea, upvote: up, downvote: down };
      })
    );
  };

  const handleShare = async (idea) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === idea.id ? { ...i, shares: i.shares + 1 } : i))
    );

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
    } catch (e) {
      console.warn("Share failed:", e);
    }
  };

  const styles = useMemo(
    () => ({
      clamp: {
        display: "-webkit-box",
        WebkitLineClamp: clampLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      },
    }),
    []
  );

  const usernameByEmail = (email) => usersByEmail[email] || email;

  return (
    <>
      <style>{`
        .ideas-page {
          max-width: 960px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .ideas-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .ideas-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 0;
        }
        .ideas-sub {
          color: #6c757d;
          font-size: 0.95rem;
        }
        .idea-card {
          background: #0f1115;
          color: #fff;
          border: 1px solid #1f2330;
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1rem;
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: transform .1s ease;
        }
        .idea-card:hover { transform: scale(1.005); }
        .idea-header {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .idea-thumb {
          width: 84px;
          height: 84px;
          border-radius: 10px;
          object-fit: cover;
          background: #171a23;
          border: 1px solid #24293a;
          flex-shrink: 0;
        }
        .idea-meta { flex: 1; }
        .idea-title { margin: 0 0 0.35rem; font-size: 1.25rem; font-weight: 700; }
        .idea-desc { margin: 0.35rem 0 0.5rem; color: #c9cbd3; line-height: 1.6; font-size: 0.98rem; }
        .readmore { border: none; background: transparent; color: #79b8ff; font-weight: 600; padding: 0; cursor: pointer; }
        .idea-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem; }
        .actions { display: flex; gap: 0.5rem; align-items: center; }
        .action-btn { display: inline-flex; align-items: center; gap: 0.4rem; border: 1px solid #2a3144; background: #131722; color: #dfe3ee; border-radius: 999px; padding: 0.45rem 0.75rem; font-size: 0.92rem; cursor: pointer; transition: transform .05s ease, background .2s ease, border-color .2s ease; }
        .action-btn:hover { background: #171c2a; border-color: #39425a; }
        .action-btn:active { transform: translateY(1px); }
        .action-active-up { border-color: #2f6feb; background: #0e1a36; color: #9ec1ff; }
        .action-active-down { border-color: #ff6b6b; background: #2a0f14; color: #ffb3b3; }
        .publisher { color: #aab1c6; font-size: 0.92rem; }
        .publisher strong { color: #e8ecf5; }
        @media (max-width: 600px) { .idea-header { flex-direction: column; } .idea-thumb { width: 100%; height: 180px; } }
      `}</style>

      <div className="ideas-page">
        <div className="ideas-header">
          <h1 className="ideas-title">Ideas</h1>
          <div className="ideas-sub">
            {ideas.length
              ? `${ideas.length} result${ideas.length > 1 ? "s" : ""}`
              : "No ideas yet"}
          </div>
        </div>

        {ideas.map((idea) => {
          const isExpanded = !!expanded[idea.id];
          const voted = votes[idea.id] || null;

          return (
            <article
              key={idea.id}
              className="idea-card"
              onClick={() => navigate(`/community/ideas/${idea.id}`)}
            >
              <div className="idea-header">
                {idea.image ? (
                  <img
                    className="idea-thumb"
                    src={idea.image}
                    alt={idea.title}
                  />
                ) : (
                  <div className="idea-thumb" />
                )}

                <div className="idea-meta">
                  <h2 className="idea-title">{idea.title}</h2>

                  <p
                    className="idea-desc"
                    style={!isExpanded ? styles.clamp : undefined}
                  >
                    {idea.description}
                  </p>

                  {idea.description && idea.description.length > 140 && (
                    <button
                      className="readmore"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent redirect
                        handleToggleExpand(idea.id);
                      }}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>

              <div className="idea-footer">
                <div className="actions">
                  <button
                    className={`action-btn ${
                      voted === "up" ? "action-active-up" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(idea.id, "up");
                    }}
                  >
                    <i className="fa-solid fa-arrow-up" />
                    <span>{idea.upvote}</span>
                  </button>

                  <button
                    className={`action-btn ${
                      voted === "down" ? "action-active-down" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(idea.id, "down");
                    }}
                  >
                    <i className="fa-solid fa-arrow-down" />
                    <span>{idea.downvote}</span>
                  </button>

                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(idea);
                    }}
                  >
                    <i className="fa-solid fa-share" />
                    <span>{idea.shares}</span>
                  </button>
                </div>

                <div className="publisher">
                  Posted by <strong>{usernameByEmail(idea.useremail)}</strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Idea;
