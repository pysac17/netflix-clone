import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_OMDB_BASE_URL || "https://www.omdbapi.com",
    params: {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        type: "movie"
    }
});

export default instance;