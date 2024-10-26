import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment.stage.crafto.app",
  headers: { "Content-Type": "application/json" },
});

export const login = (username, otp) => api.post("/login", { username, otp });

export const fetchQuotes = (token, limit, offset) =>
  api.get(`/getQuotes?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: token },
  });

export const uploadMedia = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const createQuote = (token, text, mediaUrl) =>
  api.post(
    "/postQuote",
    { text, mediaUrl },
    {
      headers: { Authorization: token },
    }
  );
