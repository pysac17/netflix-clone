import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row_s.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useUserAuth } from "./UserAuthContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Like from './heart';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row_s({ title, fetchUrl, isLargeRow }){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const { user } = useUserAuth();
    const heart = "data:image/jpeg;base64,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" 
    const red_heart = "https://media.istockphoto.com/vectors/vector-heart-icon-on-black-backgroundlove-emblemgraphic-design-in-the-vector-id1188260324?k=20&m=1188260324&s=170667a&w=0&h=u4gDkeSfbiyEwFoCAec2qspWKUmKlPBNexB6eKFGsYY=" 

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once the row loads and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request; 
        }
        fetchData();
    }, [fetchUrl]);
    

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || " ").then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error))
        }
    }

    function handleClickHeart() {
        document.getElementById("heart").src = { red_heart }
        // movie.target.setAttribute( 'src', {red_heart});
    }

    return(
        <div className="row">
            <h2>{ title }</h2>
            <div className="row_posters">
                { movies.map(movie => {
                    return (
                        <div>
                        <img style={{padding:"5px"}}
                            key={ movie.id }
                            onClick={ () => handleClick(movie) }
                            className={ `row_poster ${isLargeRow && "row_posterLarge"}` }
                            src={ `${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}` }
                            alt={ movie.name }
                        />
                        <img id="heart"
                            key={ movie.id }
                            onClick={ handleClickHeart }
                            className={ `row_posterHeart ${isLargeRow && "row_posterHeartLarge"}` }
                            src= { heart }
                            />
                        </div>
                    )
                })}
            </div>
            
            { trailerUrl && <Youtube videoId={ trailerUrl } opts={ opts } /> }
            {/* { trailerUrl && <Like /> } */}
            
            
        </div> 
    )
}

export default Row_s;

// src= "data:image/jpeg;base64,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" 
// src= "https://media.istockphoto.com/vectors/vector-heart-icon-on-black-backgroundlove-emblemgraphic-design-in-the-vector-id1188260324?k=20&m=1188260324&s=170667a&w=0&h=u4gDkeSfbiyEwFoCAec2qspWKUmKlPBNexB6eKFGsYY=" 
