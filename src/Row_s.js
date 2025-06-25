import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from './axios';
import './Row_s.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faHeart as solidHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function Row_s({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('netflixFavorites');
        return saved ? JSON.parse(saved) : {};
    });
    const [myList, setMyList] = useState(() => {
        const saved = localStorage.getItem('netflixMyList');
        return saved ? JSON.parse(saved) : {};
    });
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const modalRef = useRef(null);
    const rowRef = useRef(null);

    // Set default props
    const safeFetchUrl = fetchUrl || '';

    // Load movies
    useEffect(() => {
        if (!safeFetchUrl) {
            console.warn('Row_s: fetchUrl is not provided');
            setMovies([]);
            return;
        }

        async function fetchData() {
            try {
                let response;
                
                // Handle both string URL and object with url/params
                if (typeof safeFetchUrl === 'string') {
                    response = await axios.get(safeFetchUrl);
                } else if (safeFetchUrl && typeof safeFetchUrl === 'object') {
                    response = await axios.get(safeFetchUrl.url || '/', {
                        params: safeFetchUrl.params || {}
                    });
                } else {
                    console.error('Row_s: Invalid fetchUrl format:', safeFetchUrl);
                    return;
                }
                
                if (response.data && response.data.Search) {
                    const moviePromises = response.data.Search.slice(0, 10).map(async (movie) => {
                        try {
                            const details = await axios.get('/', {
                                params: { i: movie.imdbID, plot: 'short' }
                            });
                            return details.data;
                        } catch (error) {
                            console.error("Row_s: Error fetching movie details:", error);
                            return null;
                        }
                    });

                    const moviesData = await Promise.all(moviePromises);
                    setMovies(moviesData.filter(movie => movie !== null));
                } else {
                    console.error('Row_s: No search results found in response:', response.data);
                    setMovies([]);
                }
            } catch (error) {
                console.error("Row_s: Error fetching movies:", error);
                setMovies([]);
            }
        }
        
        fetchData();
    }, [safeFetchUrl]);

    // Save favorites and myList to localStorage when they change
    useEffect(() => {
        localStorage.setItem('netflixFavorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('netflixMyList', JSON.stringify(myList));
    }, [myList]);

    // Handle modal open/close
    useEffect(() => {
        if (showModal) {
            document.body.classList.add('modal-open');
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
            // Focus the modal for better accessibility
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = 'unset';
        }

        // Cleanup
        return () => {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    // Close modal on Escape key
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.key === 'Escape' && showModal) {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [showModal]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            loop: 1
        },
    };

    const handleClick = async (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
        
        try {
            // Create a search query with movie title and year
            const searchQuery = `${movie.Title} ${movie.Year} official trailer`;
            console.log('Searching YouTube for:', searchQuery);
            
            // Encode the search query for URL
            const encodedQuery = encodeURIComponent(searchQuery);
            
            // Use YouTube's embed endpoint with search parameters
            const youtubeSearchUrl = `https://www.youtube.com/embed?search=${encodedQuery}&autoplay=1&modestbranding=1&rel=0&enablejsapi=1`;
            
            console.log('YouTube Search URL:', youtubeSearchUrl);
            setTrailerUrl(youtubeSearchUrl);
        } catch (error) {
            console.error("Error setting up trailer:", error);
            setTrailerUrl(null);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setTrailerUrl("");
        setSelectedMovie(null);
    };

    const toggleFavorite = (movie, e) => {
        e.stopPropagation();
        setFavorites(prev => ({
            ...prev,
            [movie.imdbID]: !prev[movie.imdbID]
        }));
    };

    const toggleMyList = (movie, e) => {
        e.stopPropagation();
        setMyList(prev => ({
            ...prev,
            [movie.imdbID]: !prev[movie.imdbID]
        }));
    };

    const handleMouseEnter = (imdbID) => {
        setHoveredMovie(imdbID);
    };

    const handleMouseLeave = () => {
        setHoveredMovie(null);
    };

    return (
        <div className="row" ref={rowRef}>
            <h2 className="row_title">{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <div 
                        key={movie.imdbID}
                        className={`row_poster_container ${isLargeRow ? 'large' : ''}`}
                        onMouseEnter={() => handleMouseEnter(movie.imdbID)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(movie)}
                    >
                        {/* Popup Container */}
                        <div className="popup_container">
                            <div className="popup_title">{movie.Title}</div>
                            <div className="popup_overview">
                                {movie.Plot || 'No description available'}
                            </div>
                        </div>
                        
                        <img
                            className={`row_poster ${isLargeRow ? 'row_poster_large' : ''}`}
                            src={
                                movie.Poster !== 'N/A' 
                                    ? movie.Poster 
                                    : 'https://via.placeholder.com/300x169/2d2d2d/ffffff?text=No+Poster'
                            }
                            alt={movie.Title}
                            loading="lazy"
                        />
                        
                        <div className={`row_poster_overlay ${hoveredMovie === movie.imdbID ? 'visible' : ''}`}>
                            <div className="overlay_content">
                                <div className="overlay_buttons">
                                    <button 
                                        className="play_button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick(movie);
                                        }}
                                        title="Play Trailer"
                                    >
                                        <FontAwesomeIcon icon={faPlay} />
                                    </button>
                                    <button 
                                        className={`favorite_button ${favorites[movie.imdbID] ? 'active' : ''}`}
                                        onClick={(e) => toggleFavorite(movie, e)}
                                        title={favorites[movie.imdbID] ? 'Remove from Favorites' : 'Add to Favorites'}
                                    >
                                        <FontAwesomeIcon icon={favorites[movie.imdbID] ? solidHeart : regularHeart} />
                                    </button>
                                </div>
                                <div className="overlay_info">
                                    <h3 className="overlay_title">{movie.Title}</h3>
                                    <div className="overlay_meta">
                                        <span className="rating">
                                            <FontAwesomeIcon icon={solidHeart} className="rating_icon" />
                                            {movie.imdbRating || 'N/A'}
                                        </span>
                                        <span className="year">{movie.Year}</span>
                                        <span className="runtime">{movie.Runtime}</span>
                                    </div>
                                    <p className="overview">
                                        {movie.Plot && movie.Plot.length > 100 
                                            ? `${movie.Plot.substring(0, 100)}...` 
                                            : movie.Plot || 'No description available'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {showModal && (
                <div 
                    className="modal_overlay" 
                    ref={modalRef}
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="modal_container">
                        <button 
                            className="close_modal" 
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        {selectedMovie && (
                            <div className="modal_content">
                                <div className="modal_header">
                                    <h2 className="modal_title">{selectedMovie.Title} <span className="modal_year">({selectedMovie.Year})</span></h2>
                                    <div className="modal_meta">
                                        {selectedMovie.Rated && <span className="rating">{selectedMovie.Rated}</span>}
                                        {selectedMovie.Year && <span className="year">{selectedMovie.Year}</span>}
                                        {selectedMovie.Runtime && <span className="runtime">{selectedMovie.Runtime}</span>}
                                        {selectedMovie.Genre && <span className="genre">{selectedMovie.Genre}</span>}
                                    </div>
                                </div>

                                <div className="modal_details">
                                    <div className="modal_ratings">
                                        {selectedMovie.imdbRating !== "N/A" && (
                                            <div className="rating_item">
                                                <span className="rating_source">IMDb</span>
                                                <span className="rating_score">{selectedMovie.imdbRating}/10</span>
                                                <span className="rating_votes">{selectedMovie.imdbVotes} votes</span>
                                            </div>
                                        )}
                                        {selectedMovie.Ratings?.map((rating, index) => (
                                            <div key={index} className="rating_item">
                                                <span className="rating_source">{rating.Source}</span>
                                                <span className="rating_score">{rating.Value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="modal_info">
                                        {selectedMovie.Director !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Director:</span>
                                                <span className="info_value">{selectedMovie.Director}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Writer !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Writers:</span>
                                                <span className="info_value">{selectedMovie.Writer}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Actors !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Cast:</span>
                                                <span className="info_value">{selectedMovie.Actors}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Plot !== "N/A" && (
                                            <div className="info_row plot">
                                                <span className="info_label">Plot:</span>
                                                <p className="info_value">{selectedMovie.Plot}</p>
                                            </div>
                                        )}
                                        {selectedMovie.Language !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Language:</span>
                                                <span className="info_value">{selectedMovie.Language}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Country !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Country:</span>
                                                <span className="info_value">{selectedMovie.Country}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Awards !== "N/A" && selectedMovie.Awards !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Awards:</span>
                                                <span className="info_value">{selectedMovie.Awards}</span>
                                            </div>
                                        )}
                                        {selectedMovie.DVD !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Release Date:</span>
                                                <span className="info_value">{selectedMovie.DVD}</span>
                                            </div>
                                        )}
                                        {selectedMovie.BoxOffice && selectedMovie.BoxOffice !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Box Office:</span>
                                                <span className="info_value">{selectedMovie.BoxOffice}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Production !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Production:</span>
                                                <span className="info_value">{selectedMovie.Production}</span>
                                            </div>
                                        )}
                                        {selectedMovie.Website && selectedMovie.Website !== "N/A" && (
                                            <div className="info_row">
                                                <span className="info_label">Website:</span>
                                                <a href={selectedMovie.Website} target="_blank" rel="noopener noreferrer" className="info_link">
                                                    {selectedMovie.Website.length > 30 
                                                        ? selectedMovie.Website.substring(0, 30) + '...' 
                                                        : selectedMovie.Website}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {trailerUrl ? (
                                    <div className="modal_trailer">
                                        <iframe
                                            src={trailerUrl}
                                            title={`${selectedMovie.Title} Trailer`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="no_trailer">
                                        <p>Sorry, no trailer found for this movie.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Add PropTypes validation
Row_s.propTypes = {
    title: PropTypes.string,
    fetchUrl: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            url: PropTypes.string,
            params: PropTypes.object
        })
    ]),
    isLargeRow: PropTypes.bool
};

// Add default props
Row_s.defaultProps = {
    title: '',
    fetchUrl: '',
    isLargeRow: false
};

export default Row_s;
