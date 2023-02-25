"use strict";

let numberOfFilms;

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

function start() {
    numberOfFilms = +prompt("How many movies have you watched?");
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt("How many movies have you watched?");
    }
}

function rememberMyFilms() {
    for (let index = 0; index < 2;) {
        const lastWatched = prompt("What was the last movie you watched?"),
            ratingOfMovie = prompt("How do you rate it?");
        if (lastWatched === null ||
            lastWatched.length > 50 ||
            lastWatched == '' ||
            ratingOfMovie == null ||
            ratingOfMovie == '') {
            continue;
        }
        personalMovieDB.movies[lastWatched] = ratingOfMovie;
        index++
    }
}

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        alert("You watched a few movies");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        alert("You are a good watcher");
    } else {
        alert("You are a movie man");
    }
}

function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}

function writeYourGenres() {
    for (let i = 0; i < 3; ++i) {
        personalMovieDB.genres[i] = prompt(`Your favourite genre under the number ${i + 1}`);
    }
}

start();
rememberMyFilms();
detectPersonalLevel();
showMyDB(personalMovieDB.private);
