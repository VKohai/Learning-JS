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
    const lastWatched = prompt("What was the last movie you watched?");
    if (lastWatched === undefined || lastWatched.length > 50) {
        continue;
    }
    const ratingOfMovie = prompt("How do you rate it?");
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