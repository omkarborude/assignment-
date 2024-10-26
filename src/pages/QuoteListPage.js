// src/pages/QuoteListPage.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuotes } from "../services/api";
import styles from "../../src/styles.css";

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const loader = useRef(null);

  const loadQuotes = useCallback(async () => {
    setLoading(true);
    // Simulate a delay of 1 second (1000 milliseconds) for pagination
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetchQuotes(token, 20, offset);
      if (response.data.data.length === 0) {
        setHasMore(false);
        return;
      }
      setQuotes((prev) => [...prev, ...response.data.data]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  }, [offset, token]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadQuotes();
      }
    },
    [loadQuotes, hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.25,
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // styles adding here
  const styles = {
    container: { padding: "16px" },
    header: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    quoteCard: {
      position: "relative",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
      height: "300px",
      width: " 200px",
      margin: " 15px",
    },
    image: { width: "100%", height: "200px", objectFit: "cover", opacity: 0.8 },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      color: "white",
      fontSize: "18px",
      padding: "8px",
    },
    details: { padding: "8px", backgroundColor: "white" },
    username: { fontSize: "14px", fontWeight: "bold", color: "#333" },
    date: { fontSize: "12px", color: "#666" },
    floatingButton: {
      position: "fixed",
      bottom: "100px",
      right: "40px",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "50%",
      fontSize: "24px",
      padding: "16px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    },
    loader: {
      textAlign: "center",
      color: "#666",
      fontSize: "16px",
      padding: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Quotes App</h1>
      <div className="mainDiv">
        {quotes.map((quote) => (
          <div key={quote.id} style={styles.quoteCard}>
            <img
              src={quote.mediaUrl}
              alt="Quote background"
              style={styles.image}
            />
            <div style={styles.details}>
              <p>text: {quote.text}</p>
              <div style={styles.username}>username:: {quote.username}</div>
            </div>
          </div>
        ))}
      </div>
      <div ref={loader} style={styles.loader}>
        {loading
          ? "Loading more quotes..."
          : hasMore
          ? "Scroll down for more quotes"
          : "No more quotes to display"}
      </div>
      <button
        onClick={() => navigate("/create-quote")}
        style={styles.floatingButton}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
