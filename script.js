"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false,

    start: () => {
        personalMovieDB.count = +prompt("How many movies have you watched?");
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt("How many movies have you watched?");
        }
    },

    rememberMyFilms: () => {
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
    },

    detectPersonalLevel: () => {
        if (personalMovieDB.count < 10) {
            alert("You watched a few movies");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            alert("You are a good watcher");
        } else {
            alert("You are a movie man");
        }
    },

    toggleVisibleMyDB: () => {
        if (!personalMovieDB.private) {
            personalMovieDB.private = true;
            return;
        }
        personalMovieDB.private = false;
    },

    showMyDB: () => {
        if (!personalMovieDB.private) {
            console.log(personalMovieDB);
        }
    },

    writeYourGenres: () => {
        for (let i = 0; i < 3; ++i) {
            let genre = prompt(`Your favourite genre under the number ${i + 1}`);
            if (genre == '' || genre == null || !isNaN(genre)) {
                --i;
                continue;
            }
            personalMovieDB.genres[i] = genre;
        }
        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Favourite genre #${i + 1} is ${item}`);
        });
    }
};