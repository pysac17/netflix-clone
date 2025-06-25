import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(requests.fetchActionMovies.url, {
                params: requests.fetchActionMovies.params
            });
            
            if (response.data.Search && response.data.Search.length > 0) {
                // Get a random movie from the search results
                const randomMovie = response.data.Search[
                    Math.floor(Math.random() * response.data.Search.length)
                ];
                
                // Fetch full details of the movie
                const movieDetails = await axios.get('/', {
                    params: {
                        i: randomMovie.imdbID,
                        plot: 'full'
                    }
                });
                
                setMovie(movieDetails.data);
            }
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: movie?.Poster ? `url(${movie.Poster})` : 'none',
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1 className='banner_title'>
                    {movie?.Title || movie?.name || movie?.original_name}
                </h1>
            
                <h1 className='banner_description'>
                    {movie?.Plot}
                </h1>
            </div>
            <div className='banner--fadeBottom' />
        </header>
    )
}

export default Banner;