"use strict";

const numberOfFilms = +prompt("How many movies have you watched?");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

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

if (personalMovieDB.count < 10) {
    alert("You watched a few movies");
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    alert("You are a good watcher");
} else {
    alert("You are a movie man");
}

console.log(personalMovieDB);