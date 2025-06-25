const API_KEY = "faf7e5bb"; // Using the same API key as in axios.js

const requests = {
    fetchTrending: {
        url: '/',
        params: {
            s: '2023',
            type: 'movie',
            y: '2023',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchNetflixOriginals: {
        url: '/',
        params: {
            s: 'netflix',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchTopRated: {
        url: '/',
        params: {
            s: 'movie',
            type: 'movie',
            sort: 'rating',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchActionMovies: {
        url: '/',
        params: {
            s: 'action',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchComedyMovies: {
        url: '/',
        params: {
            s: 'comedy',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchHorrorMovies: {
        url: '/',
        params: {
            s: 'horror',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchRomanceMovies: {
        url: '/',
        params: {
            s: 'romance',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
    fetchFantasy: {
        url: '/',
        params: {
            s: 'fantasy',
            type: 'movie',
            page: 1,
            apikey: API_KEY
        }
    },
};

export default requests;
