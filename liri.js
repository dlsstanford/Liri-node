require("dotenv").config();
var Twitter = require('twitter');
// var Spotify = require('spotify');
var omdb = require('omdb');

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        goHead();
        break;
}

function tweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            for (var i=0;i<tweets.length;i++)
            console.log("Tweet " + [i + 1] + ": " + tweets[i].text);
            console.log("---------------------------");
            console.log("Created on: " + tweets[i].created_at);
        }
    });
}

function movie() {
    omdb.search('saw', function(err, movies) {
        if(err) {
            return console.error(err);
        }
     
        if(movies.length < 1) {
            return console.log('No movies were found!');
        } else {
     

            console.log('%s (%d)', movie.title, movie.year);
        }
    });
     
}

// twitter (my-tweets)
// display last 20 tweets
// tweet time stamp

// spotify (spotify-this-song -->)
// 1. artist
// 2. song name
// 3. preview link
// 4. album

// ombd (movie-this -->)
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.