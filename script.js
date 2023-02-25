"use strict";

const numberOfFilms = +prompt("How many movies have you watched?");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

for (let index = 0; index < 2; index++) {
    const lastWatched = prompt("What was the last movie you watched?"),
        ratingOfMovie = prompt("How do you rate it?");
    personalMovieDB.movies[lastWatched] = ratingOfMovie;
}
console.log(personalMovieDB);