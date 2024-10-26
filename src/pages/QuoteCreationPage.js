// src/pages/QuoteCreationPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote, uploadMedia } from "../services/api";
import styles from "../../src/styles.css";

const QuoteCreationPage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadResponse = await uploadMedia(file);
      const mediaUrl = uploadResponse.data.url;
      await createQuote(token, text, mediaUrl);
      navigate("/quotes");
    } catch (error) {
      alert("Failed to create quote");
    }
  };

  return (
    <div>
      <div className="createMainDiv">
      <div className="createMainDivInner"> Create Quote </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="inputeDiv"
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            className="inputeDivImg"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button className="createBtnQ" type="submit">
            Create Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteCreationPage;
