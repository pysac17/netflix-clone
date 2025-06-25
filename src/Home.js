import React from "react";
import Row_s from './Row_s';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';

function Home() {
return (
    <div className="app">
        <Nav />
        <Banner />
        <Row_s
            title="NETFLIX ORIGINALS"
            fetchUrl={ requests.fetchNetflixOriginals }
            isLargeRow
        />
        <Row_s
            title="Trending Now"
            fetchUrl={ requests.fetchTrending }
            isLargeRow
        />
        <Row_s
            title="Top Rated"
            fetchUrl={ requests.fetchTopRated }
            isLargeRow
        />
        <Row_s
            title="Action Movies"
            fetchUrl={ requests.fetchActionMovies }
            isLargeRow
        />
        <Row_s
            title="Comedy Movies"
            fetchUrl={ requests.fetchComedyMovies }
            isLargeRow
        />
        <Row_s
            title="Horror movies"
            fetchUrl={ requests.fetchHorrorMovies }
            isLargeRow
        />
        <Row_s
            title="Romance Movies"
            fetchUrl={ requests.fetchRomanceMovies }
            isLargeRow
        />
        <Row_s
            title="Fantasy"
            fetchUrl={ requests.fetchFantasy }
            isLargeRow
        />

    </div>
);
}

export default Home;