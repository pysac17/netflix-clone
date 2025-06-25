import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.omdbapi.com",
    params: {
        apikey: "faf7e5bb",  // Free OMDB API key (rate limited)
        type: "movie"
    }
});

export default instance;